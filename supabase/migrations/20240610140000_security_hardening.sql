-- Security hardening: validate inputs, cap scores, rate-limit writes, lock down likes.

create or replace function public.is_valid_username(p_username text)
returns boolean
language sql
immutable
as $$
  select p_username ~ '^[a-zA-Z0-9_]{3,20}$';
$$;

-- Tighten score sync: caps + cooldown so anon RPC cannot flood fake leaderboard rows.
create or replace function public.record_player_run(
  p_username text,
  p_run_score integer,
  p_won boolean,
  p_best_streak integer
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_username text := trim(p_username);
  v_run_score integer := least(greatest(coalesce(p_run_score, 0), 0), 125);
  v_best_streak integer := least(greatest(coalesce(p_best_streak, 0), 0), 365);
  v_last_updated timestamptz;
begin
  if not public.is_valid_username(v_username) then
    raise exception 'invalid username';
  end if;

  select updated_at
  into v_last_updated
  from public.players
  where username = v_username;

  if v_last_updated is not null and v_last_updated > now() - interval '30 seconds' then
    raise exception 'too many sync attempts';
  end if;

  insert into public.players (
    username,
    total_score,
    runs_completed,
    wins,
    best_streak,
    updated_at
  )
  values (
    v_username,
    v_run_score,
    1,
    case when p_won then 1 else 0 end,
    v_best_streak,
    now()
  )
  on conflict (username) do update set
    total_score = players.total_score + excluded.total_score,
    runs_completed = players.runs_completed + 1,
    wins = players.wins + case when p_won then 1 else 0 end,
    best_streak = greatest(players.best_streak, excluded.best_streak),
    updated_at = now();
end;
$$;

grant execute on function public.record_player_run(text, integer, boolean, integer) to anon, authenticated;

-- Ideas board: route writes through RPC with validation + light rate limit.
create or replace function public.post_scenario_idea(
  p_username text,
  p_body text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_username text := trim(p_username);
  v_body text := trim(p_body);
  v_recent_count integer;
  v_id uuid;
begin
  if not public.is_valid_username(v_username) then
    raise exception 'invalid username';
  end if;

  if char_length(v_body) < 8 or char_length(v_body) > 500 then
    raise exception 'invalid idea length';
  end if;

  select count(*)::integer
  into v_recent_count
  from public.scenario_ideas
  where username = v_username
    and created_at > now() - interval '1 hour';

  if v_recent_count >= 10 then
    raise exception 'rate limit exceeded';
  end if;

  insert into public.scenario_ideas (username, body)
  values (v_username, v_body)
  returning id into v_id;

  return v_id;
end;
$$;

grant execute on function public.post_scenario_idea(text, text) to anon, authenticated;

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
  if not public.is_valid_username(v_username) then
    raise exception 'invalid username';
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

-- Likes must go through toggle RPC only (prevents deleting others' likes).
revoke insert, delete on public.scenario_idea_likes from anon, authenticated;
grant select on public.scenario_idea_likes to anon, authenticated;

drop policy if exists "Anyone can like ideas" on public.scenario_idea_likes;
drop policy if exists "Anyone can unlike their badge likes" on public.scenario_idea_likes;

-- Ideas must go through post_scenario_idea RPC only.
drop policy if exists "Anyone can post scenario ideas" on public.scenario_ideas;

create policy "Block direct scenario idea inserts"
  on public.scenario_ideas for insert
  to anon, authenticated
  with check (false);
