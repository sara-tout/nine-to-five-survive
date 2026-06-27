-- One-time cleanup of automated security probe test rows.
delete from public.scenario_idea_likes
where idea_id in (
  select id from public.scenario_ideas where username like 'sec_probe_%'
);

delete from public.scenario_ideas
where username like 'sec_probe_%';

delete from public.players
where username like 'sec_probe_%';
