import { CharacterRole } from './characters';
import { CHOICE_LABELS } from './choiceTextExtras';
import { COHESION_OUTCOME_NARRATIVES } from './outcomeNarrativesCohesion';
import { EXTRA_SCENARIO_DESCRIPTIONS } from './scenarioTextExtras';
import { Outcome, Scenario } from './scenarios';

type RoleText = Record<CharacterRole, string>;

const SCENARIO_DESCRIPTIONS: Record<string, RoleText> = {
  'late-night-task': {
    builder:
      'Derek slides into your DMs: "Super quick one, not urgent, but would be great to have done tonight. Just one more bug fix before standup." Your gym bag stares at you from under your desk.',
    'product-partner':
      'Derek slides into your DMs: "Super quick one, not urgent, but would be great to have done tonight. Just need the roadmap updated before tomorrow\'s sync." Your dinner reservation reminder just popped up.',
    'fast-learner':
      'Derek slides into your DMs: "Super quick one, not urgent, but would be great to have done tonight. Just a small research task to get you up to speed." Your notebook is already full and your brain is full.',
    craftsperson:
      'Derek slides into your DMs: "Super quick one, not urgent, but would be great to have done tonight. Just a few mockup tweaks before the review." Your yoga mat is rolled up by the door, judging you.',
    'truth-finder':
      'Derek slides into your DMs: "Super quick one, not urgent, but would be great to have done tonight. Just need a quick data pull for the deck." You were about to leave on time for once.',
    'reliability-pro':
      'Derek slides into your DMs: "Super quick one, not urgent, but would be great to have done tonight. Just a quick prod health check." Your climbing gym bag is packed and ready.',
    mentor:
      'Derek slides into your DMs: "Super quick one, not urgent, but would be great to have done tonight. Just need your input on the team growth plan." Your family group chat is asking where you are.',
    professor:
      'Derek slides into your DMs: "Super quick one, not urgent, but would be great to have done tonight. Just need your eyes on this forecasting model." You promised your grandson you would review a chess game with him tonight.',
  },
  'meeting-marathon': {
    builder:
      'Patricia booked you into 6 back-to-back meetings. She just added a 7th: "Quick sync to align on alignment." You could decline that one and actually write code in the gap.',
    'product-partner':
      'Patricia booked you into 6 back-to-back meetings. She just added a 7th: "Quick sync to align on alignment." You could decline that one and actually shape the roadmap in the gap.',
    'fast-learner':
      'Patricia booked you into 6 back-to-back meetings. She just added a 7th: "Quick sync to align on alignment." You could decline that one and actually read how this place works.',
    craftsperson:
      'Patricia booked you into 6 back-to-back meetings. She just added a 7th: "Quick sync to align on alignment." You could decline that one and actually finish the design system.',
    'truth-finder':
      'Patricia booked you into 6 back-to-back meetings. She just added a 7th: "Quick sync to align on alignment." You could decline that one and actually finish the analysis.',
    'reliability-pro':
      'Patricia booked you into 6 back-to-back meetings. She just added a 7th: "Quick sync to align on alignment." You could decline that one and actually fix the flaky deploy pipeline.',
    mentor:
      'Patricia booked you into 6 back-to-back meetings. She just added a 7th: "Quick sync to align on alignment." You could decline that one and actually coach your team.',
    professor:
      'Patricia booked you into 6 back-to-back meetings. She just added a 7th: "Quick sync to align on alignment." You could decline that one and actually work on the proof you came in for.',
  },
  'lunch-steal': {
    builder:
      'Someone ate your clearly-labeled lunch from the fridge. Again. Jessica from accounting is suspiciously not hungry. Do you confront her or order delivery and eat at your desk?',
    'product-partner':
      'Someone ate your clearly-labeled lunch from the fridge. Again. Jessica from accounting is suspiciously not hungry. Do you confront her or grab a sad desk salad before the roadmap review?',
    'fast-learner':
      'Someone ate your clearly-labeled lunch from the fridge. Again. Jessica from accounting is suspiciously not hungry. Do you confront her or quietly order something else?',
    craftsperson:
      'Someone ate your clearly-labeled lunch from the fridge. Again. Jessica from accounting is suspiciously not hungry. Do you confront her or sketch through the afternoon on crackers?',
    'truth-finder':
      'Someone ate your clearly-labeled lunch from the fridge. Again. Jessica from accounting is suspiciously not hungry. Do you confront her or run the numbers on how much this job costs you?',
    'reliability-pro':
      'Someone ate your clearly-labeled lunch from the fridge. Again. Jessica from accounting is suspiciously not hungry. Do you confront her or eat protein bars between incident pages?',
    mentor:
      'Someone ate your clearly-labeled lunch from the fridge. Again. Jessica from accounting is suspiciously not hungry. Do you confront her or model grace for the team while starving?',
    professor:
      'Someone ate your clearly-labeled lunch from the fridge. Again. Jessica from accounting is suspiciously not hungry. Do you confront her or accept that academia prepared you for nothing?',
  },
  'slack-fire': {
    builder:
      'Company chat has erupted into a heated debate about tabs vs spaces. Someone just tagged you: "What do YOU think?" The whole company is watching.',
    'product-partner':
      'Company chat has erupted into a heated debate about which feature to cut from the roadmap. Someone just tagged you: "What do YOU think?" The whole company is watching.',
    'fast-learner':
      'Company chat has erupted into a heated debate about the new process doc. Someone just tagged you: "What do YOU think?" The whole company is watching.',
    craftsperson:
      'Company chat has erupted into a heated debate about whether the logo needs more padding. Someone just tagged you: "What do YOU think?" The whole company is watching.',
    'truth-finder':
      'Company chat has erupted into a heated debate about whether the numbers are "directionally correct." Someone just tagged you: "What do YOU think?" The whole company is watching.',
    'reliability-pro':
      'Company chat has erupted into a heated debate about whether Friday deploys are fine actually. Someone just tagged you: "What do YOU think?" The whole company is watching.',
    mentor:
      'Company chat has erupted into a heated debate about hybrid work policy. Someone just tagged you: "What do YOU think?" The whole company is watching.',
    professor:
      'Company chat has erupted into a heated debate about whether p-values are still useful. Someone just tagged you: "What do YOU think?" The whole company is watching.',
  },
  'demo-day': {
    builder:
      'Derek drops into your standup: "Leadership wants a quick demo in 30 minutes, just to socialize the north-star vision." Your feature is 60% done and the rest is held together with console.logs.',
    'product-partner':
      'Derek drops into your standup: "Leadership wants a quick roadmap review in 30 minutes, just to socialize the north-star vision." Your deck has three slides that still say TODO.',
    'fast-learner':
      'Derek drops into your standup: "Leadership wants you to present your onboarding findings in 30 minutes." Your notes are a wall of sticky flags and good intentions.',
    craftsperson:
      'Derek drops into your standup: "Leadership wants a quick walkthrough of the new flows in 30 minutes." Your Figma file is named final_final_v2 for a reason.',
    'truth-finder':
      'Derek drops into your standup: "Leadership wants a quick readout of the experiment results in 30 minutes." Your confidence intervals are still loading.',
    'reliability-pro':
      'Derek drops into your standup: "Leadership wants a quick reliability update in 30 minutes." Your dashboard has exactly one chart that works.',
    mentor:
      'Derek drops into your standup: "Leadership wants a quick update on team health in 30 minutes." Your slide still says "insert wins here."',
    professor:
      'Derek drops into your standup: "Leadership wants a quick overview of your forecasting model in 30 minutes." The proof is elegant. One lemma is still missing.',
  },
  'peer-callout': {
    builder:
      'Blake replied-all to your shared boss: "Just flagging this bug for visibility." The mistake in your PR is real. So is the audience. Respond in the thread or take it offline?',
    'product-partner':
      'Blake replied-all to your shared boss: "Just flagging this scope miss for visibility." The gap in your roadmap is real. So is the audience. Respond in the thread or take it offline?',
    'fast-learner':
      'Blake replied-all to your shared boss: "Just flagging a mistake in the onboarding doc for visibility." You did write that section. So did five hundred eyes just read it. Respond in the thread or take it offline?',
    craftsperson:
      'Blake replied-all to your shared boss: "Just flagging this UI inconsistency for visibility." The pixel issue is real. So is the audience. Respond in the thread or take it offline?',
    'truth-finder':
      'Blake replied-all to your shared boss: "Just flagging this data discrepancy for visibility." The numbers are off. So is the audience. Respond in the thread or take it offline?',
    'reliability-pro':
      'Blake replied-all to your shared boss: "Just flagging this deploy note for visibility." The missed step is real. So is the audience. Respond in the thread or take it offline?',
    mentor:
      'Blake replied-all to your shared boss: "Just flagging a gap in the team update for visibility." The gap is real. So is the audience. Respond in the thread or take it offline?',
    professor:
      'Blake replied-all to your shared boss: "Just flagging a shaky assumption in the model for visibility." The assumption is shaky. So is the audience. Respond in the thread or take it offline?',
  },
  'hourly-checkins': {
    builder:
      'Victoria pings you: "Quick status on the ticket? Just checking in!" It is 10:00 AM. She will be back at 11:00. Answer every ping or batch your updates?',
    'product-partner':
      'Victoria pings you: "Quick status on the roadmap? Just checking in!" It is 10:00 AM. She will be back at 11:00. Answer every ping or batch your updates?',
    'fast-learner':
      'Victoria pings you: "Quick status on your ramp plan? Just checking in!" It is 10:00 AM. She will be back at 11:00. Answer every ping or batch your updates?',
    craftsperson:
      'Victoria pings you: "Quick status on the mockups? Just checking in!" It is 10:00 AM. She will be back at 11:00. Answer every ping or batch your updates?',
    'truth-finder':
      'Victoria pings you: "Quick status on the analysis? Just checking in!" It is 10:00 AM. She will be back at 11:00. Answer every ping or batch your updates?',
    'reliability-pro':
      'Victoria pings you: "Quick status on the pipeline? Just checking in!" It is 10:00 AM. She will be back at 11:00. Answer every ping or batch your updates?',
    mentor:
      'Victoria pings you: "Quick status on the team plan? Just checking in!" It is 10:00 AM. She will be back at 11:00. Answer every ping or batch your updates?',
    professor:
      'Victoria pings you: "Quick status on the proof? Just checking in!" It is 10:00 AM. She will be back at 11:00. Answer every ping or batch your updates?',
  },
  'performance-review': {
    builder:
      'Review season. The draft makes your junior look like he built the system alone. You architected it, fixed the hard parts, and coached him through every milestone. The form has no line for that.',
    'product-partner':
      'Review season. The draft makes your junior look like he drove the roadmap alone. You shaped the strategy, made the calls, and coached him through it. The form has no line for that.',
    'fast-learner':
      'Review season. The draft makes Ryan, who joined when you did, look like the standout. You did the heavy lifting on your shared project; he presented it well. The form has no line for quiet work.',
    craftsperson:
      'Review season. The draft makes your junior look like the creative lead. You solved the hard UX problems and coached him through the rest. The form has no line for that.',
    'truth-finder':
      'Review season. The draft makes your junior look like the analytical brain. You built the approach and coached him through the analysis. The form has no line for that.',
    'reliability-pro':
      'Review season. The draft makes your junior look like the hero who saved the day. You led the fix and coached him through the response. The form has no line for that.',
    mentor:
      'Review season. The draft makes your junior look like the future lead. You turned the team around and coached him through most of it. Calibration calls that "good management," not your impact.',
    professor:
      'Review season. The draft makes your junior look like the clever one. You did the real thinking and coached him through the rest. The form has no line for that.',
  },
  'exec-roundtable': {
    builder:
      'Senior leadership invited your junior to a roundtable on the system you architected. You were not on the invite. Ask to join or coach him before he goes in?',
    'product-partner':
      'Senior leadership invited your junior to a roundtable on the roadmap you shaped. You were not on the invite. Ask to join or coach him before he goes in?',
    'fast-learner':
      'Senior leadership invited Ryan, who joined around the same time as you, to a roundtable about the work you have been doing. You were not on the invite. He is great in those rooms. Ask to join or help him prep?',
    craftsperson:
      'Senior leadership invited your junior to a roundtable on the design you led. You were not on the invite. Ask to join or coach him before he goes in?',
    'truth-finder':
      'Senior leadership invited your junior to a roundtable on the analysis you built. You were not on the invite. Ask to join or coach him before he goes in?',
    'reliability-pro':
      'Senior leadership invited your junior to a roundtable on the launch you saved. You were not on the invite. Ask to join or coach him before he goes in?',
    mentor:
      'Senior leadership invited your junior to a roundtable on the turnaround you led. You were not on the invite. Ask to join or coach him before he goes in?',
    professor:
      'Senior leadership invited your junior to a roundtable on the model you developed. You were not on the invite. Ask to join or coach him before he goes in?',
  },
  'borrowed-vision': {
    builder:
      'In staff meeting, someone who barely touched the work presents your architecture as "leadership vision." Correct it now or follow up after?',
    'product-partner':
      'In staff meeting, someone who barely touched the work presents your roadmap calls as "leadership vision." Correct it now or follow up after?',
    'fast-learner':
      'In staff meeting, someone who barely touched the work presents your findings as "leadership vision." Correct it now or follow up after?',
    craftsperson:
      'In staff meeting, someone who barely touched the work presents your design direction as "leadership vision." Correct it now or follow up after?',
    'truth-finder':
      'In staff meeting, someone who barely touched the work presents your analysis as "leadership vision." Correct it now or follow up after?',
    'reliability-pro':
      'In staff meeting, someone who barely touched the work presents your incident fix as "leadership vision." Correct it now or follow up after?',
    mentor:
      'In staff meeting, someone who barely touched the work presents your team plan as "leadership vision." Correct it now or follow up after?',
    professor:
      'In staff meeting, someone who barely touched the work presents your model as "leadership vision." Correct it now or follow up after?',
  },
  'team-shoutout': {
    builder:
      'Company shoutout praises your junior for the launch you unblocked at midnight. Peers you helped are cheering in the thread. Add context or let it pass?',
    'product-partner':
      'Company shoutout praises your junior for the release you steered through at midnight. Peers you helped are cheering in the thread. Add context or let it pass?',
    'fast-learner':
      'Company shoutout praises Ryan, who joined when you did, for the push you carried at midnight. People you asked for help are cheering in the thread. Add context or let it pass?',
    craftsperson:
      'Company shoutout praises your junior for the launch you rescued at midnight. Peers you helped are cheering in the thread. Add context or let it pass?',
    'truth-finder':
      'Company shoutout praises your junior for the launch you saved with data at midnight. Peers you helped are cheering in the thread. Add context or let it pass?',
    'reliability-pro':
      'Company shoutout praises your junior for the launch you fixed at midnight. Peers you helped are cheering in the thread. Add context or let it pass?',
    mentor:
      'Company shoutout praises your junior for the team win you engineered at midnight. Peers you helped are cheering in the thread. Add context or let it pass?',
    professor:
      'Company shoutout praises your junior for the launch you salvaged at midnight. Peers you helped are cheering in the thread. Add context or let it pass?',
  },
  'precommitted-deadline': {
    builder:
      'Susan hands you a deck with features, stack opinions, and a launch date she already promised upstairs. She wants your sign-off. Push back with a real estimate or accept the risk?',
    'product-partner':
      'Susan hands you a deck with scope, priorities, and a launch date she already promised upstairs. She wants your sign-off. Push back with a real estimate or accept the risk?',
    'fast-learner':
      'Susan hands you a deck with requirements, solution sketches, and a launch date she already promised upstairs. She wants your sign-off. Push back with a real estimate or accept the risk?',
    craftsperson:
      'Susan hands you a deck with flows, UI notes, and a launch date she already promised upstairs. She wants your sign-off. Push back with a real estimate or accept the risk?',
    'truth-finder':
      'Susan hands you a deck with metrics, cuts, and a launch date she already promised upstairs. She wants your sign-off. Push back with a real estimate or accept the risk?',
    'reliability-pro':
      'Susan hands you a deck with infra asks, rollout steps, and a launch date she already promised upstairs. She wants your sign-off. Push back with a real estimate or accept the risk?',
    mentor:
      'Susan hands you a deck with team asks, delivery steps, and a launch date she already promised upstairs. She wants your sign-off. Push back with a real estimate or accept the risk?',
    professor:
      'Susan hands you a deck with model requirements, method notes, and a launch date she already promised upstairs. She wants your sign-off. Push back with a real estimate or accept the risk?',
  },
  'missing-blocker': {
    builder:
      'Donald has been offline for three days. Your release needs his API sign-off before Friday. One polite ping. An hour later: "Can this not wait?" He earns more than you. Escalate or work around him?',
    'product-partner':
      'Donald has been offline for three days. Your launch needs his stakeholder sign-off before Friday. One polite ping. An hour later: "Can this not wait?" He earns more than you. Escalate or work around him?',
    'fast-learner':
      'Donald has been offline for three days. Your project needs his review before Friday. One polite ping. An hour later: "Can this not wait?" He earns more than you. Escalate or work around him?',
    craftsperson:
      'Donald has been offline for three days. Your handoff needs his design approval before Friday. One polite ping. An hour later: "Can this not wait?" He earns more than you. Escalate or work around him?',
    'truth-finder':
      'Donald has been offline for three days. Your readout needs his data access before Friday. One polite ping. An hour later: "Can this not wait?" He earns more than you. Escalate or work around him?',
    'reliability-pro':
      'Donald has been offline for three days. Your deploy needs his infra approval before Friday. One polite ping. An hour later: "Can this not wait?" He earns more than you. Escalate or work around him?',
    mentor:
      'Donald has been offline for three days. Your team deliverable needs his sign-off before Friday. One polite ping. An hour later: "Can this not wait?" He earns more than you. Escalate or work around him?',
    professor:
      'Donald has been offline for three days. Your paper needs his domain review before Friday. One polite ping. An hour later: "Can this not wait?" He earns more than you. Escalate or work around him?',
  },
  'visibility-pack': {
    builder:
      'Helen wants your team on her delivery framework, everything documented her way, and a polished wins pack she can present upstairs without you. She also has notes on your leadership style. Push back and keep shipping or build her templates?',
    'product-partner':
      'Helen wants your roadmap on her planning framework, everything documented her way, and a polished wins pack she can present upstairs without you. She also has notes on your prioritization style. Push back and keep shipping or build her templates?',
    'fast-learner':
      'Helen wants your work on her onboarding framework, everything documented her way, and a polished wins pack she can present upstairs without you. She also has notes on how you ramp. Push back and keep shipping or build her templates?',
    craftsperson:
      'Helen wants your design process on her framework, everything documented her way, and a polished wins pack she can present upstairs without you. She also has notes on your critique style. Push back and keep shipping or build her templates?',
    'truth-finder':
      'Helen wants your analysis on her metrics framework, everything documented her way, and a polished wins pack she can present upstairs without you. She also has notes on your storytelling. Push back and keep shipping or build her templates?',
    'reliability-pro':
      'Helen wants your ops work on her reliability framework, everything documented her way, and a polished wins pack she can present upstairs without you. She also has notes on your incident leadership. Push back and keep shipping or build her templates?',
    mentor:
      'Helen wants your team rituals on her people framework, everything documented her way, and a polished wins pack she can present upstairs without you. She also has notes on your coaching style. Push back and keep shipping or build her templates?',
    professor:
      'Helen wants your research on her methodology framework, everything documented her way, and a polished wins pack she can present upstairs without you. She also has notes on your lab leadership. Push back and keep shipping or build her templates?',
  },
  'ai-wrapper-demo': {
    builder:
      'Derek booked a leadership slot for the new tool your team built. He called it "revolutionary." You know what it actually does. Let him present or take the slot yourself?',
    'product-partner':
      'Derek booked a leadership slot for the flashy initiative on your roadmap. He called it "game-changing." You know what actually ships. Let him present or take the slot yourself?',
    'fast-learner':
      'Derek booked a leadership slot for the pilot you helped test. He called it "transformative." You know the limits. Let him present or take the slot yourself?',
    craftsperson:
      'Derek booked a leadership slot for the flow you designed. He called it "seamless." You know the edge cases. Let him present or take the slot yourself?',
    'truth-finder':
      'Derek booked a leadership slot for the analysis tool. He called it "data-driven magic." You know the gaps. Let him present or take the slot yourself?',
    'reliability-pro':
      'Derek booked a leadership slot for the ops tool. He called it "bulletproof." You know the failure modes. Let him present or take the slot yourself?',
    mentor:
      'Derek booked a leadership slot for the tool your team rolled out. He called it "a team breakthrough." You know who did the work. Let him present or take the slot yourself?',
    professor:
      'Derek booked a leadership slot for the model demo. He called it "groundbreaking research." You know the proof gaps. Let him present or take the slot yourself?',
  },
  'oma-marga-call': {
    builder:
      'Your phone lights up: Oma Marga. She learned email late and you taught her the computer; now she calls to ask if you got it. You are mid-thread on a broken deploy and the office is loud. Pick up or let it ring?',
    'product-partner':
      'Your phone lights up: Oma Marga. She learned email late and you taught her the computer; now she calls to ask if you got it. A scope fight is spiraling in chat and your calendar is a wall of color. Pick up or let it ring?',
    'fast-learner':
      'Your phone lights up: Oma Marga. She learned email late and you taught her the computer; now she calls to ask if you got it. You still feel like the newest person in every room, and now this. Pick up or let it ring?',
    craftsperson:
      'Your phone lights up: Oma Marga. She learned email late and you taught her the computer; now she calls to ask if you got it. Mockups are open, Patricia is booking another review, and your phone will not stop buzzing. Pick up or let it ring?',
    'truth-finder':
      'Your phone lights up: Oma Marga. She learned email late and you taught her the computer; now she calls to ask if you got it. You are between a half-baked deck and numbers nobody wants to hear. Pick up or let it ring?',
    'reliability-pro':
      'Your phone lights up: Oma Marga. She learned email late and you taught her the computer; now she calls to ask if you got it. The pager is quiet for now, but the week is not. Pick up or let it ring?',
    mentor:
      'Your phone lights up: Oma Marga. She learned email late and you taught her the computer; now she calls to ask if you got it. Your family group chat and your team chat both want something from you today. Pick up or let it ring?',
    professor:
      'Your phone lights up: Oma Marga. She learned email late and you taught her the computer; now she calls to ask if you got it. Your grandson\'s chess homework is waiting and the office wants another deck. Pick up or let it ring?',
  },
};

// Single source of truth for role-specific outcome copy. Every entry is a complete,
// authored string in outcomeNarrativesCohesion.ts; there is no runtime substring
// substitution, so personalization cannot introduce grammar artifacts.
const OUTCOME_NARRATIVES: Record<string, Partial<RoleText>> = COHESION_OUTCOME_NARRATIVES;

export function getScenarioDescription(scenario: Scenario, role: CharacterRole): string {
  const byScenario = SCENARIO_DESCRIPTIONS[scenario.id];
  if (byScenario?.[role]) return byScenario[role];
  const extra = EXTRA_SCENARIO_DESCRIPTIONS[scenario.id];
  if (extra?.[role]) return extra[role];
  if (byScenario?.builder) return byScenario.builder;
  return scenario.description;
}

export function getScenarioChoiceLabels(
  scenario: Scenario,
  role: CharacterRole,
): { yes: string; no: string } {
  const labels = CHOICE_LABELS[scenario.id];
  if (labels) {
    return { yes: labels.yes[role], no: labels.no[role] };
  }
  return { yes: scenario.yesLabel, no: scenario.noLabel };
}

export function resolveOutcomeNarrative(
  scenarioId: string,
  choice: 'yes' | 'no',
  outcomeIndex: number,
  role: CharacterRole,
  fallback: string,
): string {
  const key = `${scenarioId}:${choice}:${outcomeIndex}`;
  const explicit = OUTCOME_NARRATIVES[key]?.[role];
  if (explicit) return explicit;
  return fallback;
}

export function resolveOutcome(
  scenarioId: string,
  choice: 'yes' | 'no',
  outcome: Outcome,
  outcomeIndex: number,
  role: CharacterRole,
): Outcome {
  return {
    ...outcome,
    narrative: resolveOutcomeNarrative(scenarioId, choice, outcomeIndex, role, outcome.narrative),
  };
}
