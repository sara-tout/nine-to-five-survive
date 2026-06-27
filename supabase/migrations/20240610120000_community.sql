-- Community tables: leaderboard + scenario ideas board
-- Safe to re-run pieces via IF NOT EXISTS / OR REPLACE

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  username text unique not null check (char_length(username) between 3 and 20),
  total_score integer not null default 0 check (total_score >= 0),
  runs_completed integer not null default 0 check (runs_completed >= 0),
  wins integer not null default 0 check (wins >= 0),
  best_streak integer not null default 0 check (best_streak >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.scenario_ideas (
  id uuid primary key default gen_random_uuid(),
  username text not null check (char_length(username) between 3 and 20),
  body text not null check (char_length(body) between 8 and 500),
  created_at timestamptz not null default now()
);

create index if not exists players_total_score_idx on public.players (total_score desc);
create index if not exists players_updated_at_idx on public.players (updated_at desc);
create index if not exists scenario_ideas_created_at_idx on public.scenario_ideas (created_at desc);

-- Atomic score update (avoids race conditions when many users finish runs)
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
begin
  if p_run_score < 0 or p_best_streak < 0 then
    raise exception 'invalid score inputs';
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
    p_username,
    p_run_score,
    1,
    case when p_won then 1 else 0 end,
    p_best_streak,
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

-- Required when "Automatically expose new tables" is disabled in project settings
grant select on public.players to anon, authenticated;
grant select, insert on public.scenario_ideas to anon, authenticated;

alter table public.players enable row level security;
alter table public.scenario_ideas enable row level security;

drop policy if exists "Anyone can read leaderboard" on public.players;
drop policy if exists "Anyone can upsert their player row" on public.players;
drop policy if exists "Anyone can update player scores" on public.players;
drop policy if exists "Anyone can read scenario ideas" on public.scenario_ideas;
drop policy if exists "Anyone can post scenario ideas" on public.scenario_ideas;

create policy "Anyone can read leaderboard"
  on public.players for select
  to anon, authenticated
  using (true);

-- Writes go through record_player_run() only; block direct client writes for safer scaling
create policy "Block direct player inserts"
  on public.players for insert
  to anon, authenticated
  with check (false);

create policy "Block direct player updates"
  on public.players for update
  to anon, authenticated
  using (false);

create policy "Anyone can read scenario ideas"
  on public.scenario_ideas for select
  to anon, authenticated
  using (true);

create policy "Anyone can post scenario ideas"
  on public.scenario_ideas for insert
  to anon, authenticated
  with check (true);
