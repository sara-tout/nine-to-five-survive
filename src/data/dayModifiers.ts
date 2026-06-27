export type DayModifierId =
  | 'manager-on-edge'
  | 'derek-chipper'
  | 'reorg-rumors'
  | 'bad-sleep'
  | 'great-coffee'
  | 'exec-walkthrough'
  | 'budget-cut'
  | 'budget-boost'
  | 'ai-replacement-chatter'
  | 'ai-roadmap-push'
  | 'layoff-rumors'
  | 'quarter-end-crunch'
  | 'team-offsite'
  | 'perf-review-season'
  | 'all-hands-overload'
  | 'printer-meltdown'
  | 'new-ceo-energy'
  | 'rto-push'
  | 'under-the-weather'
  | 'unexplained-absence'
  | 'storm-outage'
  | 'office-cold'
  | 'quiet-week-lie'
  | 'post-outage'
  | 'catered-lunch-trap'
  | 'freezing-office'
  | 'sweltering-office'
  | 'mystery-smell'
  | 'vpn-expired'
  | 'new-tool-rollout'
  | 'interview-loop'
  | 'birthday-cake'
  | 'hot-desk-roulette'
  | 'leadership-offsite';

export interface DayModifier {
  id: DayModifierId;
  emoji: string;
  label: string;
  description: string;
}

export const DAY_MODIFIERS: DayModifier[] = [
  {
    id: 'manager-on-edge',
    emoji: '😤',
    label: 'Manager on edge',
    description: 'Your manager slept badly and is taking it out on the calendar.',
  },
  {
    id: 'derek-chipper',
    emoji: '😁',
    label: 'Derek is chipper',
    description: 'Derek got praise in leadership chat and is unusually generous today.',
  },
  {
    id: 'reorg-rumors',
    emoji: '🌪️',
    label: 'Reorg rumors',
    description: 'Nobody knows what is happening, but everyone is acting like they do.',
  },
  {
    id: 'bad-sleep',
    emoji: '😴',
    label: 'You slept badly',
    description: 'Not your fault. Everything just feels 15% harder today.',
  },
  {
    id: 'great-coffee',
    emoji: '☕',
    label: 'Great coffee day',
    description: 'The office machine pulled an all-nighter and it shows.',
  },
  {
    id: 'exec-walkthrough',
    emoji: '👔',
    label: 'Big boss visiting',
    description: 'A senior leader is walking the floor today. Visibility is suddenly currency.',
  },
  {
    id: 'budget-cut',
    emoji: '✂️',
    label: 'Budget freeze',
    description: 'Finance sent the memo. Every ask needs justification. Headcount is a rumor.',
  },
  {
    id: 'budget-boost',
    emoji: '💸',
    label: 'Budget unlocked',
    description: 'New money appeared. Everyone has a "quick win" that needs funding yesterday.',
  },
  {
    id: 'ai-replacement-chatter',
    emoji: '🤖',
    label: 'AI replacement talk',
    description: 'The office chat is full of "will AI take our jobs?" Hot takes. Morale is wobbly.',
  },
  {
    id: 'ai-roadmap-push',
    emoji: '✨',
    label: 'AI mandate',
    description: 'Leadership wants AI mentioned in every deck. Bonus points for saying "next-gen."',
  },
  {
    id: 'layoff-rumors',
    emoji: '📉',
    label: 'Layoff rumors',
    description: 'Someone knows someone who saw a spreadsheet. Productivity theater is peaking.',
  },
  {
    id: 'quarter-end-crunch',
    emoji: '⏳',
    label: 'Quarter-end crunch',
    description: 'Three business days left in the quarter. "Small favors" are suddenly urgent.',
  },
  {
    id: 'team-offsite',
    emoji: '🌴',
    label: 'Half the team is offsite',
    description: 'Key people are "bonding" in another timezone. Chat response times are measured in geological eras.',
  },
  {
    id: 'perf-review-season',
    emoji: '📝',
    label: 'Review season',
    description: 'Calibration is coming. Everyone is suddenly documenting things they did in March.',
  },
  {
    id: 'all-hands-overload',
    emoji: '📢',
    label: 'Another all-hands',
    description: 'Company meeting number four this month. Strategy has strategy now.',
  },
  {
    id: 'printer-meltdown',
    emoji: '🖨️',
    label: 'Printer meltdown',
    description: 'The printer is jammed, the driver is haunted, and somehow this is your problem now.',
  },
  {
    id: 'new-ceo-energy',
    emoji: '👑',
    label: 'New CEO energy',
    description: 'Fresh leadership wants "transformation." Every sentence needs a north star.',
  },
  {
    id: 'rto-push',
    emoji: '🏢',
    label: 'Return-to-office push',
    description: 'Leadership miss seeing butts in seats. Hybrid flexibility is being redefined downward.',
  },
  {
    id: 'under-the-weather',
    emoji: '🤧',
    label: 'You are under the weather',
    description: 'You should probably be in bed. The calendar disagrees. Every meeting feels louder than it should.',
  },
  {
    id: 'unexplained-absence',
    emoji: '🛸',
    label: 'Unexplained absence',
    description: 'A difficult colleague is mysteriously out. The office chat is peaceful. HR sent a vague wellness note. Nobody is asking questions.',
  },
  {
    id: 'storm-outage',
    emoji: '🌧️',
    label: 'Storm knocked out the internet',
    description: 'Bad weather took the connection with it. VPN drops, video freezes, and somehow this is still your problem.',
  },
  {
    id: 'office-cold',
    emoji: '🦠',
    label: 'Office cold going around',
    description: 'Half the team is coughing on mute. Meetings are still mandatory. Hand sanitizer is a personality trait today.',
  },
  {
    id: 'quiet-week-lie',
    emoji: '🤫',
    label: '"Quiet week"',
    description: 'Leadership declared a focus week with no meetings. Your calendar received the memo and ignored it.',
  },
  {
    id: 'post-outage',
    emoji: '🔥',
    label: 'Post-incident morning',
    description: 'Something broke last night. Today is war-room energy, blame archaeology, and "quick syncs" that are neither.',
  },
  {
    id: 'catered-lunch-trap',
    emoji: '🥪',
    label: 'Catered lunch during crunch',
    description: 'Free sandwiches arrived during deadline week. Eating looks lazy. Skipping looks ungrateful. HR smiles anyway.',
  },
  {
    id: 'freezing-office',
    emoji: '🥶',
    label: 'Freezing office',
    description: 'The HVAC is set to "arctic focus mode." You are typing in fingerless gloves and pure resentment.',
  },
  {
    id: 'sweltering-office',
    emoji: '🥵',
    label: 'Boiling office',
    description: 'The AC died or leadership thinks sweat builds character. Every meeting room is a sauna with slides.',
  },
  {
    id: 'mystery-smell',
    emoji: '👃',
    label: 'Mystery smell on your floor',
    description: 'Something is wrong near the kitchen. Facilities opened a ticket. You are somehow the floor contact now.',
  },
  {
    id: 'vpn-expired',
    emoji: '🔐',
    label: 'VPN password expired',
    description: 'Your credentials reset overnight. IT\'s queue is legendary. Productivity is theoretical until you get back in.',
  },
  {
    id: 'new-tool-rollout',
    emoji: '🆕',
    label: 'New tool rollout day',
    description: 'Everyone must be "aligned" on software nobody tested. The old tool still works. That is not the point.',
  },
  {
    id: 'interview-loop',
    emoji: '🎤',
    label: 'Interview loop dropped on you',
    description: 'Recruiting needs your help today. "It is only an hour total." The calendar entry says four.',
  },
  {
    id: 'birthday-cake',
    emoji: '🎂',
    label: 'Birthday cake in the kitchen',
    description: 'Mandatory joy arrived during deadline week. Singing is optional. Guilt is not.',
  },
  {
    id: 'hot-desk-roulette',
    emoji: '🪑',
    label: 'Hot desk roulette',
    description: 'You lost your usual spot. Today\'s desk has a broken monitor, someone\'s jacket, and bad karma.',
  },
  {
    id: 'leadership-offsite',
    emoji: '✈️',
    label: 'Leadership is offsite',
    description: 'Nobody upstairs is reachable. Decisions are frozen. Middle managers are improvising with confidence.',
  },
];

export interface MoodScenarioEffect {
  scenarios: string[] | 'all';
  hint: string;
  outcomeNote: string;
}

export const MOOD_SCENARIO_EFFECTS: Record<DayModifierId, MoodScenarioEffect> = {
  'manager-on-edge': {
    scenarios: 'all',
    hint: 'Rougher outcomes are more likely today. Raises are harder to land.',
    outcomeNote: 'Your manager\'s mood made the safer choice look smarter than it felt.',
  },
  'derek-chipper': {
    scenarios: ['late-night-task', 'demo-day', 'pto-guilt', 'all-hands-question', 'borrowed-vision'],
    hint: 'Derek-related scenarios may swing friendlier today.',
    outcomeNote: 'Derek\'s good mood changed how this landed upstairs.',
  },
  'reorg-rumors': {
    scenarios: ['reorg-rumor', 'meeting-marathon', 'peer-callout', 'performance-review'],
    hint: 'Org drama hits harder today. Gossip and politics weigh more.',
    outcomeNote: 'Reorg rumors made everyone read politics into this.',
  },
  'bad-sleep': {
    scenarios: 'all',
    hint: 'You start the day depleted. Bad outcomes sting a little more.',
    outcomeNote: 'Bad sleep made everything land heavier than it should have.',
  },
  'great-coffee': {
    scenarios: 'all',
    hint: 'You have a small edge today. Better outcomes are slightly more likely.',
    outcomeNote: 'Good coffee gave you just enough patience to survive this.',
  },
  'exec-walkthrough': {
    scenarios: [
      'demo-day',
      'all-hands-question',
      'exec-roundtable',
      'team-shoutout',
      'borrowed-vision',
      'visibility-pack',
      'townhall-question',
      'unmuted-chaos',
    ],
    hint: 'Visibility choices matter more. Speaking up can pay off.',
    outcomeNote: 'With a big boss on the floor, visibility changed the stakes.',
  },
  'budget-cut': {
    scenarios: [
      'precommitted-deadline',
      'visibility-pack',
      'pto-guilt',
      'performance-review',
      'meeting-marathon',
    ],
    hint: 'Budget pressure makes pushback riskier and optics tighter.',
    outcomeNote: 'The budget freeze made every tradeoff feel like a firing offense.',
  },
  'budget-boost': {
    scenarios: ['demo-day', 'exec-roundtable', 'team-shoutout', 'all-hands-question', 'reorg-rumor'],
    hint: 'New budget energy rewards visible wins and bold pitches.',
    outcomeNote: 'Fresh budget made leadership unusually open to good news.',
  },
  'ai-replacement-chatter': {
    scenarios: ['slack-fire', 'borrowed-vision', 'performance-review', 'all-hands-question', 'team-shoutout', 'ai-wrapper-demo'],
    hint: 'AI anxiety is in the air. Morale and credit fights hit harder.',
    outcomeNote: 'AI replacement talk made everyone extra defensive about credit.',
  },
  'ai-roadmap-push': {
    scenarios: ['demo-day', 'borrowed-vision', 'visibility-pack', 'precommitted-deadline', 'exec-roundtable', 'ai-wrapper-demo'],
    hint: 'Mentioning AI strategy can help or haunt you today.',
    outcomeNote: 'The AI mandate meant leadership heard this through a hype filter.',
  },
  'layoff-rumors': {
    scenarios: ['reorg-rumor', 'pto-guilt', 'performance-review', 'peer-callout', 'late-night-task'],
    hint: 'Job anxiety is high. Playing it safe looks different today.',
    outcomeNote: 'Layoff rumors made everyone grade this like a keep-or-cut moment.',
  },
  'quarter-end-crunch': {
    scenarios: ['late-night-task', 'precommitted-deadline', 'demo-day', 'hourly-checkins', 'missing-blocker'],
    hint: 'Quarter pressure makes urgency traps more likely.',
    outcomeNote: 'Quarter-end crunch turned a normal ask into an emergency.',
  },
  'team-offsite': {
    scenarios: ['missing-blocker', 'meeting-marathon', 'hourly-checkins', 'peer-callout', 'slack-fire'],
    hint: 'Half the team is unreachable. Blockers and escalations hit harder.',
    outcomeNote: 'With half the team offsite, you paid the coordination tax alone.',
  },
  'perf-review-season': {
    scenarios: ['performance-review', 'peer-callout', 'team-shoutout', 'pto-guilt', 'visibility-pack'],
    hint: 'Review season makes credit and optics unusually expensive.',
    outcomeNote: 'Review season meant everyone scored this like calibration material.',
  },
  'all-hands-overload': {
    scenarios: [
      'all-hands-question',
      'meeting-marathon',
      'demo-day',
      'borrowed-vision',
      'ai-wrapper-demo',
      'weather-small-talk',
      'take-it-offline',
      'long-quick-call',
      'unmuted-chaos',
      'townhall-question',
    ],
    hint: 'Meeting fatigue is high. Visibility stunts cost more energy.',
    outcomeNote: 'Another all-hands week made every public moment feel overexposed.',
  },
  'printer-meltdown': {
    scenarios: ['late-night-task', 'slack-fire', 'hourly-checkins', 'lunch-steal', 'missing-blocker'],
    hint: 'Petty office chaos is draining patience faster than usual.',
    outcomeNote: 'Printer meltdown energy infected the whole day more than it should have.',
  },
  'new-ceo-energy': {
    scenarios: ['exec-roundtable', 'demo-day', 'visibility-pack', 'borrowed-vision', 'ai-wrapper-demo'],
    hint: 'Transformation theater is in. Bold visibility plays land differently.',
    outcomeNote: 'New CEO energy made leadership hear everything as a strategy audition.',
  },
  'rto-push': {
    scenarios: ['pto-guilt', 'meeting-marathon', 'hourly-checkins', 'visibility-pack', 'peer-callout'],
    hint: 'Return-to-office politics make flexibility and presence a tradeoff.',
    outcomeNote: 'The RTO push made every choice sound like a loyalty statement.',
  },
  'under-the-weather': {
    scenarios: [
      'pto-guilt',
      'meeting-marathon',
      'hourly-checkins',
      'ten-minute-favor',
      'long-quick-call',
      'instant-briefing',
      'weather-small-talk',
    ],
    hint: 'You are sick. Pushing through costs extra energy. Rest would be reasonable.',
    outcomeNote: 'Being under the weather made everything land heavier than it should have.',
  },
  'unexplained-absence': {
    scenarios: ['hourly-checkins', 'precommitted-deadline', 'visibility-pack', 'instant-briefing', 'quick-and-dirty'],
    hint: 'A difficult colleague is absent today. Calm now, chaos when they return.',
    outcomeNote: 'The unexplained absence bought peace today and borrowed trouble for tomorrow.',
  },
  'storm-outage': {
    scenarios: [
      'demo-day',
      'ai-wrapper-demo',
      'fire-drill-demo',
      'slack-fire',
      'long-quick-call',
      'direct-leader-dm',
      'screen-share-moment',
      'take-it-offline',
      'unmuted-chaos',
    ],
    hint: 'Spotty internet makes demos, calls, and DMs more painful than usual.',
    outcomeNote: 'The storm outage turned every connection problem into your personal incident.',
  },
  'office-cold': {
    scenarios: [
      'pto-guilt',
      'meeting-marathon',
      'unmuted-chaos',
      'townhall-question',
      'weather-small-talk',
      'long-quick-call',
    ],
    hint: 'Everyone is sick or pretending not to be. Calls and town halls are extra painful.',
    outcomeNote: 'The office cold made every meeting feel like a petri dish with slides.',
  },
  'quiet-week-lie': {
    scenarios: [
      'meeting-marathon',
      'long-quick-call',
      'take-it-offline',
      'hourly-checkins',
      'ten-minute-favor',
      'instant-briefing',
    ],
    hint: 'Focus week is fictional. Your calendar is still lying to you.',
    outcomeNote: 'The quiet week memo did not survive first contact with Patricia\'s calendar.',
  },
  'post-outage': {
    scenarios: [
      'late-night-task',
      'demo-day',
      'fire-drill-demo',
      'missing-blocker',
      'peer-callout',
      'urgent-overnight',
      'quick-and-dirty',
    ],
    hint: 'Post-incident energy makes urgency and blame land harder than usual.',
    outcomeNote: 'After last night\'s outage, every ask sounded like a sev review waiting to happen.',
  },
  'catered-lunch-trap': {
    scenarios: [
      'lunch-steal',
      'pto-guilt',
      'precommitted-deadline',
      'late-night-task',
      'team-shoutout',
      'visibility-pack',
    ],
    hint: 'Free lunch during crunch is a trap. Visibility and guilt are both on the menu.',
    outcomeNote: 'Catered lunch made every break look like a performance review of your appetite.',
  },
  'freezing-office': {
    scenarios: [
      'meeting-marathon',
      'long-quick-call',
      'weather-small-talk',
      'hourly-checkins',
      'pto-guilt',
      'ten-minute-favor',
    ],
    hint: 'You cannot feel your fingers. Patience and comfort are both low.',
    outcomeNote: 'The freezing office made every hour feel longer than the last.',
  },
  'sweltering-office': {
    scenarios: [
      'meeting-marathon',
      'demo-day',
      'fire-drill-demo',
      'all-hands-question',
      'townhall-question',
      'unmuted-chaos',
    ],
    hint: 'The heat makes demos, town halls, and patience all harder.',
    outcomeNote: 'The boiling office turned every room into a slow cooker with agendas.',
  },
  'mystery-smell': {
    scenarios: [
      'lunch-steal',
      'unmuted-chaos',
      'slack-fire',
      'weather-small-talk',
      'missing-blocker',
    ],
    hint: 'The smell is haunting the floor. Kitchen and petty chaos hit harder.',
    outcomeNote: 'The mystery smell made the whole floor feel slightly haunted.',
  },
  'vpn-expired': {
    scenarios: [
      'demo-day',
      'late-night-task',
      'screen-share-moment',
      'direct-leader-dm',
      'missing-blocker',
      'spreadsheet-mandate',
    ],
    hint: 'Locked out of tools until IT answers. Everything takes longer.',
    outcomeNote: 'The expired VPN turned every task into a login quest first.',
  },
  'new-tool-rollout': {
    scenarios: [
      'spreadsheet-mandate',
      'visibility-pack',
      'ai-wrapper-demo',
      'borrowed-vision',
      'precommitted-deadline',
    ],
    hint: 'New software theater is in. Process and demos land differently.',
    outcomeNote: 'Tool rollout day made everyone pretend the migration was painless.',
  },
  'interview-loop': {
    scenarios: [
      'meeting-marathon',
      'long-quick-call',
      'pto-guilt',
      'performance-review',
      'ten-minute-favor',
    ],
    hint: 'Recruiting ate your calendar. "One hour" was a lie.',
    outcomeNote: 'The interview loop stole the day recruiting swore would be quick.',
  },
  'birthday-cake': {
    scenarios: [
      'lunch-steal',
      'team-shoutout',
      'meeting-marathon',
      'pto-guilt',
      'precommitted-deadline',
    ],
    hint: 'Celebration energy during crunch is awkward. Visibility is mandatory.',
    outcomeNote: 'Birthday cake made every break look like a loyalty test.',
  },
  'hot-desk-roulette': {
    scenarios: [
      'screen-share-moment',
      'hourly-checkins',
      'demo-day',
      'slack-fire',
      'missing-blocker',
    ],
    hint: 'Wrong desk, wrong setup. Everything takes an extra step today.',
    outcomeNote: 'Hot desk roulette added friction to every simple task.',
  },
  'leadership-offsite': {
    scenarios: [
      'precommitted-deadline',
      'urgent-overnight',
      'reorg-rumor',
      'direct-leader-dm',
      'exec-roundtable',
      'missing-blocker',
    ],
    hint: 'Nobody upstairs is reachable. Escalations and decisions go into a void.',
    outcomeNote: 'With leadership offsite, every blocker floated in limbo longer.',
  },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick moods for one run. Skips already-seen moods until the pool runs low, then starts a fresh cycle. */
export function pickDayModifierOrder(
  dayCount: number,
  playedIds: DayModifierId[] = [],
): { items: DayModifierId[]; cycleReset: boolean } {
  const unplayed = DAY_MODIFIERS.filter((m) => !playedIds.includes(m.id));

  let pool = unplayed;
  let cycleReset = false;

  if (pool.length < dayCount) {
    pool = [...DAY_MODIFIERS];
    cycleReset = true;
  }

  const shuffled = shuffle(pool);
  return {
    items: shuffled.slice(0, Math.min(dayCount, shuffled.length)).map((m) => m.id),
    cycleReset,
  };
}

export function getDayModifier(id: DayModifierId): DayModifier {
  return DAY_MODIFIERS.find((m) => m.id === id) ?? DAY_MODIFIERS[0];
}

export function moodAffectsScenario(modifierId: DayModifierId, scenarioId: string): boolean {
  const effect = MOOD_SCENARIO_EFFECTS[modifierId];
  if (!effect) return false;
  return effect.scenarios === 'all' || effect.scenarios.includes(scenarioId);
}

export function getMoodScenarioHint(modifierId: DayModifierId, scenarioId: string): string | null {
  if (!moodAffectsScenario(modifierId, scenarioId)) return null;
  return MOOD_SCENARIO_EFFECTS[modifierId]?.hint ?? null;
}

export function getMoodOutcomeNote(modifierId: DayModifierId, scenarioId: string): string | null {
  if (!moodAffectsScenario(modifierId, scenarioId)) return null;
  return MOOD_SCENARIO_EFFECTS[modifierId]?.outcomeNote ?? null;
}
