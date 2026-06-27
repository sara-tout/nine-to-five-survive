-- Scenario idea likes + fetch/toggle helpers

create table if not exists public.scenario_idea_likes (
  idea_id uuid not null references public.scenario_ideas (id) on delete cascade,
  username text not null check (char_length(username) between 3 and 20),
  created_at timestamptz not null default now(),
  primary key (idea_id, username)
);

create index if not exists scenario_idea_likes_idea_id_idx
  on public.scenario_idea_likes (idea_id);

grant select, insert, delete on public.scenario_idea_likes to anon, authenticated;

alter table public.scenario_idea_likes enable row level security;

drop policy if exists "Anyone can read idea likes" on public.scenario_idea_likes;
drop policy if exists "Anyone can like ideas" on public.scenario_idea_likes;
drop policy if exists "Anyone can unlike their badge likes" on public.scenario_idea_likes;

create policy "Anyone can read idea likes"
  on public.scenario_idea_likes for select
  to anon, authenticated
  using (true);

create policy "Anyone can like ideas"
  on public.scenario_idea_likes for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can unlike their badge likes"
  on public.scenario_idea_likes for delete
  to anon, authenticated
  using (true);

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
  group by i.id
  order by
    case when p_sort = 'top' then count(l.idea_id) end desc nulls last,
    i.created_at desc
  limit greatest(1, least(coalesce(p_limit, 50), 100));
$$;

grant execute on function public.fetch_scenario_ideas(integer, text, text) to anon, authenticated;

create or replace function public.toggle_scenario_idea_like(
  p_idea_id uuid,
  p_username text
)
returns table (liked boolean, like_count bigint)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_username text := trim(p_username);
  v_deleted integer;
begin
  if v_username is null or char_length(v_username) < 3 then
    raise exception 'badge name required';
  end if;

  if not exists (select 1 from public.scenario_ideas where id = p_idea_id) then
    raise exception 'idea not found';
  end if;

  delete from public.scenario_idea_likes
  where idea_id = p_idea_id and username = v_username;

  get diagnostics v_deleted = row_count;

  if v_deleted > 0 then
    return query
    select
      false,
      (select count(*)::bigint from public.scenario_idea_likes where idea_id = p_idea_id);
    return;
  end if;

  insert into public.scenario_idea_likes (idea_id, username)
  values (p_idea_id, v_username);

  return query
  select
    true,
    (select count(*)::bigint from public.scenario_idea_likes where idea_id = p_idea_id);
end;
$$;

grant execute on function public.toggle_scenario_idea_like(uuid, text) to anon, authenticated;
