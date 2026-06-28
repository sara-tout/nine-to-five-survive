-- User-generated content moderation: reporting + auto-hide for the ideas board.
-- Required for App Store Guideline 1.2 (UGC): report mechanism, content filtering,
-- and the ability to act on objectionable content.

alter table public.scenario_ideas
  add column if not exists hidden boolean not null default false;

alter table public.scenario_ideas
  add column if not exists report_count integer not null default 0;

create table if not exists public.scenario_idea_reports (
  idea_id uuid not null references public.scenario_ideas (id) on delete cascade,
  reporter_username text not null check (char_length(reporter_username) between 3 and 20),
  reason text,
  created_at timestamptz not null default now(),
  primary key (idea_id, reporter_username)
);

create index if not exists scenario_idea_reports_idea_id_idx
  on public.scenario_idea_reports (idea_id);

alter table public.scenario_idea_reports enable row level security;
-- No permissive policies: all access is through the security-definer RPC below.

-- Number of distinct reports that auto-hides an idea pending manual review.
create or replace function public.report_scenario_idea(
  p_idea_id uuid,
  p_username text,
  p_reason text default null
)
returns table (hidden boolean, report_count integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_username text := trim(p_username);
  v_count integer;
  v_hidden boolean;
begin
  if not public.is_valid_username(v_username) then
    raise exception 'invalid username';
  end if;

  if not exists (select 1 from public.scenario_ideas where id = p_idea_id) then
    raise exception 'idea not found';
  end if;

  insert into public.scenario_idea_reports (idea_id, reporter_username, reason)
  values (p_idea_id, v_username, nullif(left(trim(coalesce(p_reason, '')), 200), ''))
  on conflict (idea_id, reporter_username) do nothing;

  select count(*)::integer
  into v_count
  from public.scenario_idea_reports
  where idea_id = p_idea_id;

  v_hidden := v_count >= 3;

  update public.scenario_ideas
  set report_count = v_count,
      hidden = (hidden or v_hidden)
  where id = p_idea_id;

  return query
  select s.hidden, s.report_count
  from public.scenario_ideas s
  where s.id = p_idea_id;
end;
$$;

grant execute on function public.report_scenario_idea(uuid, text, text) to anon, authenticated;

-- Recreate the feed function so hidden ideas never reach clients.
create or replace function public.fetch_scenario_ideas(
  p_limit integer default 50,
  p_sort text default 'recent',
  p_viewer_username text default null
)
returns table (
  id uuid,
  username text,
  body text,
  created_at timestamptz,
  like_count bigint,
  liked_by_viewer boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select
    i.id,
    i.username,
    i.body,
    i.created_at,
    count(l.idea_id)::bigint as like_count,
    coalesce(
      bool_or(l.username = nullif(trim(p_viewer_username), '')),
      false
    ) as liked_by_viewer
  from public.scenario_ideas i
  left join public.scenario_idea_likes l on l.idea_id = i.id
  where i.hidden = false
  group by i.id
  order by
    case when p_sort = 'top' then count(l.idea_id) end desc nulls last,
    i.created_at desc
  limit greatest(1, least(coalesce(p_limit, 50), 100));
$$;

grant execute on function public.fetch_scenario_ideas(integer, text, text) to anon, authenticated;
