-- Telemetry: anonymous, no-PII event + crash capture.
-- Opt-in: apply with `npm run db:push`. The client no-ops until the RPC exists.

create table if not exists public.telemetry_events (
  id uuid primary key default gen_random_uuid(),
  anon_id text not null,
  app_version text,
  platform text,
  name text not null,
  level text not null default 'info',
  props jsonb not null default '{}'::jsonb,
  client_ts timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists telemetry_events_created_at_idx
  on public.telemetry_events (created_at desc);
create index if not exists telemetry_events_name_idx
  on public.telemetry_events (name);
create index if not exists telemetry_events_level_idx
  on public.telemetry_events (level);

-- Lock the table down: no direct table access for client roles.
alter table public.telemetry_events enable row level security;
revoke all on public.telemetry_events from anon, authenticated;

-- Batched ingest via security-definer RPC with light rate limiting.
create or replace function public.log_telemetry_batch(
  p_anon_id text,
  p_app_version text,
  p_platform text,
  p_events jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_anon_id text := substr(coalesce(trim(p_anon_id), ''), 1, 64);
  v_app_version text := substr(coalesce(trim(p_app_version), ''), 1, 32);
  v_platform text := substr(coalesce(trim(p_platform), ''), 1, 32);
  v_recent_count integer;
begin
  if char_length(v_anon_id) < 8 then
    raise exception 'invalid anon id';
  end if;

  if p_events is null or jsonb_typeof(p_events) <> 'array' then
    raise exception 'invalid events payload';
  end if;

  if jsonb_array_length(p_events) = 0 or jsonb_array_length(p_events) > 50 then
    raise exception 'invalid batch size';
  end if;

  -- Cap how many events a single anon id can submit per hour.
  select count(*)::integer
  into v_recent_count
  from public.telemetry_events
  where anon_id = v_anon_id
    and created_at > now() - interval '1 hour';

  if v_recent_count >= 500 then
    raise exception 'rate limit exceeded';
  end if;

  insert into public.telemetry_events (anon_id, app_version, platform, name, level, props, client_ts)
  select
    v_anon_id,
    v_app_version,
    v_platform,
    substr(coalesce(e->>'name', 'unknown'), 1, 80),
    case when coalesce(e->>'level', 'info') in ('info', 'warning', 'error')
      then e->>'level' else 'info' end,
    coalesce(e->'props', '{}'::jsonb),
    (e->>'ts')::timestamptz
  from jsonb_array_elements(p_events) as e;
end;
$$;

grant execute on function public.log_telemetry_batch(text, text, text, jsonb) to anon, authenticated;
