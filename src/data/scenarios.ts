import {
  OMA_MARGA_EMAIL_QUOTES as MARGA,
  OMA_MARGA_EMAIL_TRANSLATIONS as MARGA_EN,
} from '../constants/tributes';

export interface Outcome {
  narrative: string;
  /** Prior choices / mood context shown separately in the UI */
  contextNote?: string;
  energy: number;
  sanity: number;
  performance: number;
  raiseProgress: number;
  weight: number; // probability weight (higher = more likely)
}

export type ScenarioLocation = 'desk' | 'meeting-room' | 'kitchen' | 'coworker-desk' | 'presentation';

export interface Scenario {
  id: string;
  time: string;
  icon: string;
  location: ScenarioLocation;
  locationLabel: string;
  npcId?: string;
  title: string;
  description: string;
  yesLabel: string;
  noLabel: string;
  yesOutcomes: Outcome[];
  noOutcomes: Outcome[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface PickOrderResult<T> {
  items: T[];
  cycleReset: boolean;
}

/** Pick scenarios for one run. Skips already-played ids until the pool runs low, then starts a fresh cycle. */
export function pickScenarioOrder(dayCount: number, playedIds: string[] = []): PickOrderResult<number> {
  const allIndices = SCENARIOS.map((_, i) => i);
  const unplayed = allIndices.filter((i) => !playedIds.includes(SCENARIOS[i].id));

  let pool = unplayed;
  let cycleReset = false;

  if (pool.length < dayCount) {
    pool = allIndices;
    cycleReset = true;
  }

  const shuffled = shuffle(pool);
  return {
    items: shuffled.slice(0, Math.min(dayCount, shuffled.length)),
    cycleReset,
  };
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'late-night-task',
    time: '5:15 PM',
    icon: '💻',
    location: 'desk',
    locationLabel: 'Your Desk',
    npcId: 'derek',
    title: 'The After-Hours "Quick Fix"',
    description:
      'Derek slides into your DMs: "Super quick one, not urgent, but would be great to have done tonight. Just one more bug fix before standup." Your gym bag stares at you from under your desk.',
    yesLabel: 'Stay and knock it out',
    noLabel: 'Leave on time',
    yesOutcomes: [
      {
        narrative:
          'You stayed. The "small task" took 3 hours. It shipped before standup, but quietly: no thanks, no fanfare, just a merged PR and your evening plans cancelled in silence.',
        energy: -25,
        sanity: -10,
        performance: 5,
        raiseProgress: 3,
        weight: 60,
      },
      {
        narrative:
          'Plot twist: the CEO saw you working at 8 PM and mentioned it in the all-hands. Sometimes being a tryhard pays off. Derek even reacted with a thumbs-up in the channel.',
        energy: -15,
        sanity: -5,
        performance: 18,
        raiseProgress: 8,
        weight: 45,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You left on time, slept well, and finished the task in 20 minutes with fresh eyes the next morning.',
        energy: 15,
        sanity: 10,
        performance: 2,
        raiseProgress: 4,
        weight: 45,
      },
      {
        narrative:
          'You left, but Derek sent a passive-aggressive "no worries!" at 5:17 PM. You spent the evening wondering if you\'re getting fired instead of actually relaxing.',
        energy: 5,
        sanity: -15,
        performance: -10,
        raiseProgress: -1,
        weight: 55,
      },
    ],
  },
  {
    id: 'meeting-marathon',
    time: '9:30 AM',
    icon: '📅',
    location: 'meeting-room',
    locationLabel: 'Meeting Room',
    npcId: 'calendar-warrior',
    title: 'Meeting Marathon Monday',
    description:
      'Patricia booked you into 6 back-to-back meetings. She just added a 7th: "Quick sync to align on alignment." You could decline that one and keep the block it would have eaten.',
    yesLabel: 'Accept the 7th meeting',
    noLabel: 'Decline the 7th meeting',
    yesOutcomes: [
      {
        narrative:
          'You accepted the 7th sync. Seven meetings deep, five ended with "let\'s take this offline" and another calendar invite. You walked out with 14 action items and zero time to touch any of them.',
        energy: -30,
        sanity: -20,
        performance: -12,
        raiseProgress: -1,
        weight: 65,
      },
      {
        narrative:
          'You accepted the 7th sync. Meeting #4 turned into a brainstorm where you dropped a sharp idea. A senior director noticed. Exhausting day, but that one moment landed.',
        energy: -20,
        sanity: -10,
        performance: 6,
        raiseProgress: 6,
        weight: 45,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You declined the 7th sync. Six meetings still happened, but you kept the open block and finished real work before anyone booked an 8th. Your status said "Deep Work" and people actually respected it.',
        energy: 5,
        sanity: 15,
        performance: 16,
        raiseProgress: 5,
        weight: 45,
      },
      {
        narrative:
          'You declined the 7th sync. Six brutal meetings still happened. Then you learned the 7th was the org restructure readout. You are now on a team called "Synergy Ops." Nobody told you. You found out from the wiki.',
        energy: 0,
        sanity: -20,
        performance: -10,
        raiseProgress: -2,
        weight: 55,
      },
    ],
  },
  {
    id: 'lunch-steal',
    time: '12:15 PM',
    icon: '🍱',
    location: 'kitchen',
    locationLabel: 'Kitchen Fridge',
    npcId: 'jessica',
    title: 'The Lunch Thief Strikes Again',
    description:
      'Someone ate your clearly-labeled lunch from the fridge. Again. Jessica from accounting is suspiciously not hungry. Do you confront her or just order delivery and suffer in silence?',
    yesLabel: 'Confront Jessica',
    noLabel: 'Order delivery, seethe quietly',
    yesOutcomes: [
      {
        narrative:
          'You confronted Jessica. She denied everything despite having sriracha on her blouse. HR got involved. You now have a "conflict resolution plan." Your lunch is still gone.',
        energy: -10,
        sanity: -15,
        performance: -8,
        raiseProgress: -2,
        weight: 55,
      },
      {
        narrative:
          'You confronted Jessica politely and she broke down crying. Turns out she\'s going through stuff. You bonded over leftover pizza. You now have an ally in accounting who "knows things." Your 2 PM went better because of it.',
        energy: -5,
        sanity: 10,
        performance: 14,
        raiseProgress: 6,
        weight: 45,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You ordered delivery and ate at your desk while refreshing job boards. The food was mid. The afternoon was worse. You answered emails but shipped nothing worth mentioning.',
        energy: 5,
        sanity: -10,
        performance: -8,
        raiseProgress: -1,
        weight: 55,
      },
      {
        narrative:
          'You ordered delivery and walked while you waited. Fresh air helped. You came back calmer, cleared your inbox, and made it through the afternoon without snapping at anyone. Jessica who?',
        energy: 10,
        sanity: 15,
        performance: 5,
        raiseProgress: 2,
        weight: 45,
      },
    ],
  },
  {
    id: 'slack-fire',
    time: '3:00 PM',
    icon: '🔥',
    location: 'coworker-desk',
    locationLabel: "Coworker's Desk",
    title: 'The Team Chat Dumpster Fire',
    description:
      'Company chat has erupted into a heated debate about whether the office should go back to hot-desking. It\'s getting personal. Someone just tagged you: "What do YOU think?" The whole company is watching.',
    yesLabel: 'Share your take',
    noLabel: 'Stay out of it',
    yesOutcomes: [
      {
        narrative:
          'You posted a thoughtful, balanced take. Both sides hated it. Someone called you an "office centrist." You\'ve been roasted in off-topic chat for 3 days straight.',
        energy: -15,
        sanity: -25,
        performance: -12,
        raiseProgress: -2,
        weight: 60,
      },
      {
        narrative:
          'You dropped an absolutely legendary meme that unified both factions in laughter. A senior director reacted with 🏆. You are now the unofficial office diplomat.',
        energy: -5,
        sanity: 10,
        performance: 8,
        raiseProgress: 5,
        weight: 45,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You muted company chat, made a cup of tea, and watched a bird outside your window for 4 minutes. You have achieved inner peace. Your update got approved while you were gone.',
        energy: 10,
        sanity: 20,
        performance: 10,
        raiseProgress: 3,
        weight: 45,
      },
      {
        narrative:
          'You stayed out of it, but your silence was interpreted as "not a team player." Your manager brought it up in your 1:1. You now have "improve team engagement" as a quarterly goal.',
        energy: 0,
        sanity: -10,
        performance: -8,
        raiseProgress: -1,
        weight: 55,
      },
    ],
  },
  {
    id: 'demo-day',
    time: '2:00 PM',
    icon: '🎤',
    location: 'presentation',
    locationLabel: 'Presentation Area',
    npcId: 'derek',
    title: 'Surprise Demo Day',
    description:
      'Derek drops into your team check-in: "Leadership wants a quick presentation in 30 minutes, just to socialize the north-star vision." Your project is 60% done and the other 40% is held together with wishful thinking.',
    yesLabel: 'Wing the demo',
    noLabel: 'Ask to reschedule',
    yesOutcomes: [
      {
        narrative:
          'You winged it. The slides froze live, then a VP asked the one question your 40% could not answer. "That\'s a known issue" only stretches so far. Leadership left unconvinced, and the gaps were now on record as yours.',
        energy: -20,
        sanity: -15,
        performance: -10,
        raiseProgress: -2,
        weight: 45,
      },
      {
        narrative:
          'Murphy\'s Law went on vacation. The presentation worked PERFECTLY on the happy path you showed. Leadership loved it. You are now the face of Q3 innovation. The shortcuts are your little secret.',
        energy: -10,
        sanity: 5,
        performance: 22,
        raiseProgress: 10,
        weight: 55,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You asked to reschedule. Your manager respected the honesty and gave you two more days. You delivered something polished and got genuine applause. Integrity: 1, Panic: 0.',
        energy: 5,
        sanity: 15,
        performance: 6,
        raiseProgress: 5,
        weight: 55,
      },
      {
        narrative:
          'You asked to reschedule but the slot went to Chad. He demoed a button that turns blue when you click it. That was the whole pitch. Leadership LOVED it. Chad is now "Chad the Innovator." Your project never got the room.',
        energy: -5,
        sanity: -15,
        performance: -14,
        raiseProgress: -2,
        weight: 45,
      },
    ],
  },
  {
    id: 'pto-guilt',
    time: '4:45 PM',
    icon: '🏖️',
    location: 'desk',
    locationLabel: 'Your Desk',
    npcId: 'derek',
    title: 'The PTO Guilt Trip',
    description:
      'You want to take Friday off. Derek replies: "No pressure, but it would be great if someone could cover the sync. Totally your call." Your out-of-office draft is open. Your guilt is also open.',
    yesLabel: 'Work Friday instead',
    noLabel: 'Take Friday off',
    yesOutcomes: [
      {
        narrative:
          'You cancelled PTO. Derek said "thanks, you\'re a rock." You worked Friday while everyone else posted beach photos. You are also a rock. An inanimate one.',
        energy: -20,
        sanity: -15,
        performance: 5,
        raiseProgress: 3,
        weight: 60,
      },
      {
        narrative:
          'You cancelled PTO and used Friday to finish a project early. Your manager called it "proactive." Your soul called it "a cry for help."',
        energy: -10,
        sanity: -5,
        performance: 15,
        raiseProgress: 5,
        weight: 45,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You took Friday off. The sync was cancelled anyway. You spent the day reading a book and remembering what sunlight feels like.',
        energy: 20,
        sanity: 20,
        performance: 0,
        raiseProgress: 3,
        weight: 40,
      },
      {
        narrative:
          'You took PTO. Derek cc\'d you on 14 emails with "for when you\'re back." You checked three of them from the couch. The boundary was decorative.',
        energy: 10,
        sanity: -10,
        performance: -5,
        raiseProgress: 0,
        weight: 60,
      },
    ],
  },
  {
    id: 'reorg-rumor',
    time: '11:00 AM',
    icon: '👀',
    location: 'coworker-desk',
    locationLabel: "Coworker's Desk",
    title: 'The Reorg Rumor Mill',
    description:
      'Team chat is blowing up with reorg rumors. Your manager wants a quick alignment before you hear it from the group chat first. Do you ask directly or play it cool?',
    yesLabel: 'Ask directly',
    noLabel: 'Play it cool, grab water',
    yesOutcomes: [
      {
        narrative:
          'You asked. They gave you the corporate smile and said "nothing to worry about." You now worry about it professionally, socially, and spiritually.',
        energy: -5,
        sanity: -20,
        performance: -8,
        raiseProgress: -1,
        weight: 55,
      },
      {
        narrative:
          'You asked calmly. One director appreciated the directness and gave you a real answer: your team is safe. You are now the person who "knows things."',
        energy: 0,
        sanity: 10,
        performance: 12,
        raiseProgress: 5,
        weight: 45,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You played it cool in the thread and kept working. The reorg happened anyway. You found out from a calendar invite titled "New Chapter."',
        energy: 5,
        sanity: -15,
        performance: -8,
        raiseProgress: -1,
        weight: 50,
      },
      {
        narrative:
          'You played it cool. Later, your mentor pulled you aside with the real scoop. Ignorance avoided, intel acquired, panic delayed.',
        energy: 5,
        sanity: 5,
        performance: 6,
        raiseProgress: 3,
        weight: 50,
      },
    ],
  },
  {
    id: 'all-hands-question',
    time: '10:00 AM',
    icon: '🙋',
    location: 'presentation',
    locationLabel: 'All-Hands Room',
    npcId: 'derek',
    title: 'The All-Hands Question',
    description:
      'Live all-hands. The CEO opens the floor for questions. Your work is on the slide behind them. Five hundred people are watching. Do you speak up or stay camera-off?',
    yesLabel: 'Speak up',
    noLabel: 'Stay camera-off',
    yesOutcomes: [
      {
        narrative:
          'You unmuted and answered. Somehow it was coherent. Leadership nodded. You have no memory of what you said and will not be watching the recording.',
        energy: -5,
        sanity: -3,
        performance: 10,
        raiseProgress: 5,
        weight: 50,
      },
      {
        narrative:
          'You spoke up with a sharper take than anyone expected. The CEO said "love the ownership." Your manager DM\'d a thumbs-up. Worth the adrenaline.',
        energy: -10,
        sanity: -5,
        performance: 18,
        raiseProgress: 8,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You stayed camera-off. Someone else answered for your work. Leadership nodded along. Your contribution stayed invisible.',
        energy: -5,
        sanity: 5,
        performance: -5,
        raiseProgress: -1,
        weight: 55,
      },
      {
        narrative:
          'You stayed camera-off. The CEO moved on. A teammate pinged you after: "Why didn\'t you say anything?" Fair question. Calibration will not remember you were on the slide.',
        energy: 0,
        sanity: -10,
        performance: -10,
        raiseProgress: -2,
        weight: 45,
      },
    ],
  },
  {
    id: 'peer-callout',
    time: '1:30 PM',
    icon: '🙋',
    location: 'coworker-desk',
    locationLabel: "Coworker's Desk",
    npcId: 'peer-reporter',
    title: 'The Helpful Peer CC',
    description:
      'Blake replied-all to your shared boss: "Just flagging this small issue for visibility." The mistake is real. So is the audience. Do you respond in the thread or take it offline?',
    yesLabel: 'Reply in the thread',
    noLabel: 'Take it offline with Blake',
    yesOutcomes: [
      {
        narrative:
          'You replied with context and fixes. It read defensive. Blake added a thumbs-up. Your boss added "let\'s discuss." The thread is now literature.',
        energy: -10,
        sanity: -20,
        performance: -12,
        raiseProgress: -1,
        weight: 55,
      },
      {
        narrative:
          'You owned the mistake cleanly, outlined the fix, and kept it brief. Your boss said "appreciate the accountability." Blake had nothing left to add.',
        energy: -5,
        sanity: 5,
        performance: 12,
        raiseProgress: 5,
        weight: 45,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You DM\'d Blake and fixed it quietly. Mature, professional, done. Your boss never knew. Blake CC\'d them anyway an hour later.',
        energy: -5,
        sanity: -10,
        performance: -5,
        raiseProgress: -2,
        weight: 55,
      },
      {
        narrative:
          'You took it offline. Blake apologized for the public flag. You fixed it together before the morning meeting. Your boss only saw the solution.',
        energy: 0,
        sanity: 10,
        performance: 10,
        raiseProgress: 4,
        weight: 45,
      },
    ],
  },
  {
    id: 'hourly-checkins',
    time: '10:00 AM',
    icon: '⏰',
    location: 'desk',
    locationLabel: 'Your Desk',
    npcId: 'control-freak',
    title: 'The Hourly Status Check',
    description:
      'Victoria pings you: "Quick status? Where are we at? Just checking in!" It is 10:00 AM. She will be back at 11:00. Do you answer every ping or batch your updates?',
    yesLabel: 'Answer every ping',
    noLabel: 'Batch updates twice a day',
    yesOutcomes: [
      {
        narrative:
          'You answered every hour with cheerful precision. Victoria called you "easy to manage." You managed zero deep work. Your output is a timeline of being available.',
        energy: -20,
        sanity: -15,
        performance: -10,
        raiseProgress: 3,
        weight: 50,
      },
      {
        narrative:
          'Your hourly updates were crisp. Victoria forwarded one to leadership as "great communication." You got visibility and still shipped the one thing that mattered today.',
        energy: -15,
        sanity: -10,
        performance: 8,
        raiseProgress: 6,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You batched updates at lunch and 4 PM. You finished real work. Victoria told your manager you were "hard to reach." Your manager said "results looked good though."',
        energy: 5,
        sanity: 10,
        performance: 15,
        raiseProgress: 5,
        weight: 45,
      },
      {
        narrative:
          'You batched updates at lunch and 4 PM. Victoria said your 4 PM note was "too sparse" and escalated. Your manager asked for a sync. You spent the sync explaining why batching beats hourly pings.',
        energy: -10,
        sanity: -15,
        performance: -5,
        raiseProgress: -2,
        weight: 55,
      },
    ],
  },
  {
    id: 'performance-review',
    time: '3:30 PM',
    icon: '📋',
    location: 'meeting-room',
    locationLabel: 'Review Meeting',
    npcId: 'junior-climber',
    title: 'The Mentorship Blind Spot',
    description:
      'Review season. Your manager shows you the draft before calibration. The big project reads like your junior built it alone. The person who talks well in exec meetings got "vision." Someone who pings you all day somehow made you "hard to reach." Nobody wrote down that you led it or grew him into it. There is no line for that on the form.',
    yesLabel: 'Spell out what you actually led',
    noLabel: 'Let the work speak for itself',
    yesOutcomes: [
      {
        narrative:
          'You walked your manager through the joint effort: your direction, your problem-solving, your months coaching your junior through it. They agreed. Calibration still crowned the person leadership already liked and called you "a strong support." Mentoring does not fit in the rating grid.',
        energy: -10,
        sanity: -20,
        performance: -5,
        raiseProgress: -2,
        weight: 50,
      },
      {
        narrative:
          'You made the invisible visible with receipts. Your manager added a paragraph about your leadership and the months you spent coaching your junior through the project. Calibration cannot ignore what is on paper now.',
        energy: -5,
        sanity: -10,
        performance: 15,
        raiseProgress: 6,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You let the work speak. It did not have a microphone. Calibration called your junior "the brains behind the project." The smooth talker got "strategic." You got "reliable." You were in the front seat. The review put you in the back.',
        energy: 0,
        sanity: -15,
        performance: -10,
        raiseProgress: -3,
        weight: 55,
      },
      {
        narrative:
          'You stayed humble. Your manager corrected the draft after calibration and got your leadership paragraph added. Plenty of people owe you for unblocking them this quarter. This time it made the document.',
        energy: 5,
        sanity: 5,
        performance: 8,
        raiseProgress: 4,
        weight: 45,
      },
    ],
  },
  {
    id: 'exec-roundtable',
    time: '11:00 AM',
    icon: '☕',
    location: 'presentation',
    locationLabel: 'Exec Roundtable',
    npcId: 'junior-climber',
    title: 'The Leadership Roundtable',
    description:
      'Senior leadership invited your junior to a roundtable about the project you have been leading. You were not on the invite. He is great in those rooms. You are the reason the project is worth discussing. Ask to join or coach him before he goes in?',
    yesLabel: 'Ask to join the meeting',
    noLabel: 'Coach him and let him go',
    yesOutcomes: [
      {
        narrative:
          'You asked to join. Awkward pause. You got added as optional. In the room, leadership kept addressing him. You answered the hard questions anyway. Afterwards someone said you "seemed intense."',
        energy: -15,
        sanity: -15,
        performance: 12,
        raiseProgress: 3,
        weight: 50,
      },
      {
        narrative:
          'You asked to join as the project lead. They made space. You walked through the joint effort without throwing anyone under the bus. Leadership finally looked at you instead of past you.',
        energy: -10,
        sanity: 5,
        performance: 18,
        raiseProgress: 7,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You prepped him generously. He shone upstairs. The recap email credited "the team" and named him twice. You were not named. The work was yours. The room was his.',
        energy: -5,
        sanity: -20,
        performance: -8,
        raiseProgress: -1,
        weight: 55,
      },
      {
        narrative:
          'You coached him hard on the real story. He repeated your talking points upstairs. Leadership replied "great energy." Your manager made sure your name was on the recap email too.',
        energy: -5,
        sanity: -5,
        performance: 4,
        raiseProgress: 6,
        weight: 45,
      },
    ],
  },
  {
    id: 'borrowed-vision',
    time: '2:30 PM',
    icon: '🗣️',
    location: 'meeting-room',
    locationLabel: 'Staff Meeting',
    npcId: 'derek',
    title: 'The Borrowed Vision',
    description:
      'In staff meeting, someone who barely touched the work presents your solution as "leadership vision." You did the thinking. They did the slide deck. Correct it in the room or follow up after?',
    yesLabel: 'Clarify your contribution now',
    noLabel: 'Follow up privately after',
    yesOutcomes: [
      {
        narrative:
          'You clarified, calmly, with specifics. The room went quiet. Your manager backed you up. The presenter smiled like you had insulted decorum. You kept the credit. You may have made an enemy.',
        energy: -10,
        sanity: -5,
        performance: 15,
        raiseProgress: 5,
        weight: 45,
      },
      {
        narrative:
          'You spoke up and it came out sharper than you meant. Now you are "passionate." The idea is still attributed to the smooth talker. You won the argument and lost the narrative.',
        energy: -15,
        sanity: -20,
        performance: -5,
        raiseProgress: -1,
        weight: 55,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You followed up privately with receipts. Your manager corrected the record with leadership and got your name on the follow-up note. The presenter still smiled too much. The credit stuck.',
        energy: -5,
        sanity: -5,
        performance: 12,
        raiseProgress: 5,
        weight: 50,
      },
      {
        narrative:
          'You let it slide to keep the peace. The story stuck. In the next planning cycle, they asked the smooth talker to "scale the vision." You scale the actual work.',
        energy: 0,
        sanity: -15,
        performance: -14,
        raiseProgress: -2,
        weight: 50,
      },
    ],
  },
  {
    id: 'team-shoutout',
    time: '4:00 PM',
    icon: '📣',
    location: 'coworker-desk',
    locationLabel: 'Team Channel',
    npcId: 'junior-climber',
    title: 'The Public Shoutout',
    description:
      'Company shoutout praises your junior for "heroic collaboration" on the launch you unblocked at midnight. Three peers you helped this week are in the thread adding fire emojis. Add context or let the moment pass?',
    yesLabel: 'Add context in the thread',
    noLabel: 'Let the moment pass',
    yesOutcomes: [
      {
        narrative:
          'You added context, lightly, about the joint effort. It read petty to some. Your junior DM\'d "wow." Leadership saw a team drama, not a team win. The shoutout still has his name on it.',
        energy: -10,
        sanity: -15,
        performance: -5,
        raiseProgress: -1,
        weight: 55,
      },
      {
        narrative:
          'You reframed it as a team win and named the late-night blocker you solved. A director replied "good to know." Your manager hearted it. The shoutout finally reflected reality.',
        energy: -5,
        sanity: 5,
        performance: 10,
        raiseProgress: 5,
        weight: 45,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You let it pass. Classy. Invisible. The emojis piled up. Your manager said nothing. Calibration will remember who was in the screenshot, not who fixed the crisis.',
        energy: 0,
        sanity: -15,
        performance: -5,
        raiseProgress: -2,
        weight: 55,
      },
      {
        narrative:
          'You let it pass publicly and pinged the peers you helped. One admitted upstairs in a side channel that you saved them. Your manager DM\'d you: "I know who fixed that launch." Quiet win.',
        energy: 5,
        sanity: 5,
        performance: 6,
        raiseProgress: 4,
        weight: 45,
      },
    ],
  },
  {
    id: 'precommitted-deadline',
    time: '10:30 AM',
    icon: '📊',
    location: 'meeting-room',
    locationLabel: 'Planning Room',
    npcId: 'micromanager',
    title: 'The Pre-Committed Deadline',
    description:
      'Susan slides over a deck with features, budget hints, and a launch date already circled. She set it upstairs without consulting anyone on the ground. Now she needs you to confirm you can deliver. If you push back, "the whole timeline slips and that is on us."',
    yesLabel: 'Push back with a real estimate',
    noLabel: 'Accept and absorb the risk',
    yesOutcomes: [
      {
        narrative:
          'You pushed back with a real estimate. Susan sighed like you had personally disappointed the company values. Your manager backed you up and leadership moved the date. Susan grumbled that you "blocked momentum," but nobody bought it. The realistic plan made you look like the steadiest person in the room.',
        energy: -10,
        sanity: 5,
        performance: 14,
        raiseProgress: 5,
        weight: 45,
      },
      {
        narrative:
          'You pushed back and it turned into a 45-minute debate about tools you do not use and timelines she will not explain. You left with a worse date, less clarity, and the same guilt trip wearing a different shirt.',
        energy: -20,
        sanity: -20,
        performance: -8,
        raiseProgress: -1,
        weight: 55,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You accepted. Susan forwarded your confirmation upstairs immediately. You now own a deadline born in a vacuum. The team learned about it from the planning deck.',
        energy: -15,
        sanity: -15,
        performance: -12,
        raiseProgress: -1,
        weight: 50,
      },
      {
        narrative:
          'You accepted to keep the peace. Somehow a scoped-down version landed on time with your team rowing together. Susan took a bow, but your manager made sure leadership knew whose team actually delivered. You took the win.',
        energy: -20,
        sanity: -5,
        performance: 10,
        raiseProgress: 6,
        weight: 50,
      },
    ],
  },
  {
    id: 'missing-blocker',
    time: '2:45 PM',
    icon: '📴',
    location: 'coworker-desk',
    locationLabel: "Donald's Desk",
    npcId: 'ghost-contributor',
    title: 'The Two-Minute Ask',
    description:
      'Donald has been offline for three days. Your project needs his sign-off before Friday. You send one polite ping with a two-minute ask. An hour later: "Can this not wait? I am heads-down." He makes more than you. The blocker is still his.',
    yesLabel: 'Escalate and ask again',
    noLabel: 'Work around him for now',
    yesOutcomes: [
      {
        narrative:
          'You cc\'d your manager with a tight summary. Donald surfaced within the hour, annoyed but useful. He delivered in ten minutes. Your manager noted you unblocked it cleanly without making it a thing.',
        energy: -10,
        sanity: -10,
        performance: 14,
        raiseProgress: 3,
        weight: 45,
      },
      {
        narrative:
          'You escalated. Donald replied-all that he was "being harassed over a tiny favor." Your manager asked you to "be more collaborative." Friday is still Friday. Donald is still offline.',
        energy: -15,
        sanity: -25,
        performance: -12,
        raiseProgress: -2,
        weight: 55,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You routed around him, documented the gap, and kept moving. It worked. Friday stayed alive. Donald appeared on Monday to ask why he was not consulted.',
        energy: -20,
        sanity: 5,
        performance: 16,
        raiseProgress: 5,
        weight: 45,
      },
      {
        narrative:
          'You worked around him and delivered the workaround. Leadership loved the demo. Donald\'s missing piece caused a mess at 6 PM. Somehow the retro focused on your bypass, not his absence.',
        energy: -25,
        sanity: -20,
        performance: -10,
        raiseProgress: -3,
        weight: 55,
      },
    ],
  },
  {
    id: 'visibility-pack',
    time: '11:00 AM',
    icon: '📋',
    location: 'meeting-room',
    locationLabel: 'Process Review',
    npcId: 'framework-evangelist',
    title: 'The Visibility Pack',
    description:
      'Helen booked a process review. She wants you on her framework, everything documented her way, and a polished pack of your team\'s wins "for visibility." She will present it upstairs. You are not invited. She also has notes on your project management and leadership style. The ship is held together with duct tape and you.',
    yesLabel: 'Push back and keep shipping',
    noLabel: 'Build her pack and templates',
    yesOutcomes: [
      {
        narrative:
          'You said no politely and named what would break if you stopped to prettify Excel. Your manager backed you. The launch stayed alive, and you looked like someone who protects the work when it counts.',
        energy: -5,
        sanity: 10,
        performance: 16,
        raiseProgress: 5,
        weight: 45,
      },
      {
        narrative:
          'You pushed back. Helen escalated that you were "not operating with rigor." Leadership heard structure, not survival. Your invisible firefighting stayed invisible. Her framework deck looked great in the recap.',
        energy: -10,
        sanity: -20,
        performance: -8,
        raiseProgress: -2,
        weight: 55,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You built the pack. Color-coded tabs, executive summary, framework alignment. Helen loved it. She presented your wins on a leadership call you were not on. Someone asked who led that work. She said "the team."',
        energy: -25,
        sanity: -15,
        performance: -10,
        raiseProgress: -1,
        weight: 55,
      },
      {
        narrative:
          'You complied. The pack was so clear even Helen almost understood it. Your manager pulled you into the next leadership sync as "the person behind the numbers." Helen called it a win for "cross-functional alignment."',
        energy: -20,
        sanity: -5,
        performance: 4,
        raiseProgress: 6,
        weight: 45,
      },
    ],
  },
  {
    id: 'ai-wrapper-demo',
    time: '3:00 PM',
    icon: '✨',
    location: 'presentation',
    locationLabel: 'Presentation Area',
    npcId: 'derek',
    title: 'The Hype Tool Demo',
    description:
      'Derek booked you into a leadership demo slot. He will present the flashy new tool your team helped roll out. He called it "revolutionary." Leadership is excited. You are the one who knows what it actually does.',
    yesLabel: 'Let Derek present it',
    noLabel: 'Present the real work yourself',
    yesOutcomes: [
      {
        narrative:
          'You let Derek run the demo. He oversold what the tool could do. Leadership asked to see it work for real. It did not. Derek deflected smoothly: "the team is still ironing out the bugs." Suddenly the failure was your team\'s, not his pitch. He stayed clean. Your team wore it.',
        energy: -10,
        sanity: -20,
        performance: -10,
        raiseProgress: -1,
        weight: 55,
      },
      {
        narrative:
          'You let Derek run it and it somehow worked. He called it a "team win." You corrected one fatal mistake live without embarrassing him. Leadership DM\'d you afterward: "Thanks for having his back on the hard questions."',
        energy: -15,
        sanity: -10,
        performance: 10,
        raiseProgress: 6,
        weight: 45,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You took the slot and presented the real scope, limits, and risks. It landed well in the room. But Derek got to leadership first afterward and framed you as territorial for "going around" him. The story that stuck was not your competence. It was that you sidelined a teammate to grab the mic. You were right and somehow still the problem.',
        energy: -20,
        sanity: -15,
        performance: -8,
        raiseProgress: -1,
        weight: 45,
      },
      {
        narrative:
          'You took the slot. Derek was annoyed. You explained the tool clearly and named what was real vs hype. A director asked you to join the initiative workstream. Derek posted a LinkedIn thought leadership piece anyway.',
        energy: -15,
        sanity: 0,
        performance: 18,
        raiseProgress: 8,
        weight: 55,
      },
    ],
  },
  {
    id: 'instant-briefing',
    time: '10:15 AM',
    icon: '📎',
    location: 'meeting-room',
    locationLabel: 'Hallway Ambush',
    npcId: 'control-freak',
    title: 'The Instant Briefing',
    description:
      'Victoria corners you ten minutes after someone mentioned a new initiative in the morning meeting. She wants status, timeline, design direction, and risks in a deck before lunch. You heard about the project once, sideways, while microwaving oatmeal.',
    yesLabel: 'Ask for time to assess properly',
    noLabel: 'Give a confident placeholder plan',
    yesOutcomes: [
      {
        narrative:
          'You asked for a real assessment window. Victoria sighed like you invented bureaucracy. Your manager backed you. Lunch stayed lunch. The deck went out the next day and was actually accurate.',
        energy: -5,
        sanity: 10,
        performance: 10,
        raiseProgress: 5,
        weight: 50,
      },
      {
        narrative:
          'You asked for time. Victoria escalated to your manager that you were "not responsive." You still did not have enough context to fake it. The placeholder deck someone else wrote had your name on it anyway.',
        energy: -15,
        sanity: -15,
        performance: -5,
        raiseProgress: -1,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You improvised with confident vagueness. Victoria loved the energy. Leadership hated the details at 3 PM. You spent the afternoon unwinding fiction you invented before noon.',
        energy: -20,
        sanity: -20,
        performance: -10,
        raiseProgress: -2,
        weight: 55,
      },
      {
        narrative:
          'You faked a plan with just enough jargon to buy time. Victoria forwarded it immediately. Scope shrank before anyone read page two. Your real assessment landed the next day and matched what leadership actually needed.',
        energy: -10,
        sanity: -5,
        performance: 8,
        raiseProgress: 4,
        weight: 45,
      },
    ],
  },
  {
    id: 'ten-minute-favor',
    time: '4:20 PM',
    icon: '⏱️',
    location: 'coworker-desk',
    locationLabel: "Derek's Desk",
    npcId: 'derek',
    title: 'The Ten-Minute Favor',
    description:
      'Derek appears with a smile: "This is a ten-minute favor, max. Just need you to untangle one tiny thing before you log off." Two hours later you are still in it. He has left for drinks. The tiny thing has dependencies in three systems.',
    yesLabel: 'Keep going until it is done',
    noLabel: 'Stop and document what is left',
    yesOutcomes: [
      {
        narrative:
          'You finished at 8 PM. Derek thanked you in a voice note from a bar. The fix held, and your manager quietly noted who actually saved it. You missed dinner, but the competence landed.',
        energy: -25,
        sanity: -15,
        performance: 8,
        raiseProgress: 4,
        weight: 45,
      },
      {
        narrative:
          'You pushed through. At 9 PM you discovered the real issue was a setting Derek could have changed himself. He called it a "learning moment." You called it theft.',
        energy: -30,
        sanity: -25,
        performance: -8,
        raiseProgress: -2,
        weight: 55,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You stopped, wrote a clear handoff, and logged off. Derek was annoyed. Your manager said the boundary was fair. The favor took him twenty minutes the next morning. Funny how that works.',
        energy: -5,
        sanity: 10,
        performance: 12,
        raiseProgress: 4,
        weight: 50,
      },
      {
        narrative:
          'You documented and left. Derek told leadership you "dropped the ball on a small ask." The doc proved otherwise. You still spent Friday cleaning up narrative, not your actual work.',
        energy: -10,
        sanity: -10,
        performance: -10,
        raiseProgress: -1,
        weight: 50,
      },
    ],
  },
  {
    id: 'quick-and-dirty',
    time: '1:30 PM',
    icon: '🔧',
    location: 'meeting-room',
    locationLabel: 'War Room',
    npcId: 'micromanager',
    title: 'The Quick Fix Request',
    description:
      'Susan says not to overthink it. "Just do something quick and dirty for the demo. We can clean it up later." What she is describing touches payments, permissions, and a report the auditors asked about last quarter. She thinks it is a button.',
    yesLabel: 'Explain why it is not simple',
    noLabel: 'Build the quick version anyway',
    yesOutcomes: [
      {
        narrative:
          'You walked her through the real scope with a whiteboard and calm voice. She still wanted it today, but smaller. You delivered an honest slice instead of a landmine.',
        energy: -10,
        sanity: 5,
        performance: 14,
        raiseProgress: 5,
        weight: 50,
      },
      {
        narrative:
          'You explained the complexity. Susan heard "no." She told leadership you were "not solution-oriented." The quick version got assigned to you anyway, with less time.',
        energy: -15,
        sanity: -15,
        performance: -8,
        raiseProgress: -1,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You hacked together the demo path. It looked fine on stage. Reality reminded everyone what "dirty" means. The cleanup ticket is now yours and "was always going to be."',
        energy: -20,
        sanity: -20,
        performance: -12,
        raiseProgress: -2,
        weight: 55,
      },
      {
        narrative:
          'You built the quick version and somehow nothing broke. Susan took credit for "bias to action." Your manager told leadership you built it solo under a brutal deadline. The demo landed.',
        energy: -20,
        sanity: -5,
        performance: 10,
        raiseProgress: 6,
        weight: 45,
      },
    ],
  },
  {
    id: 'urgent-overnight',
    time: '8:45 AM',
    icon: '🚨',
    location: 'desk',
    locationLabel: 'Your Desk',
    npcId: 'peer-reporter',
    title: 'The Overnight Urgent',
    description:
      'Yesterday Blake said there was no rush. "When we get to it," he told everyone. This morning leadership needs it today. Blake forwards the thread with "as discussed" energy. You were not in that discussion. Due by 4 PM.',
    yesLabel: 'Push back on the turnaround',
    noLabel: 'Drop everything and deliver',
    yesOutcomes: [
      {
        narrative:
          'You replied with timestamps and a sane plan. Your manager moved the date. Blake acted wounded. Leadership cared about the date, not his feelings. You kept your afternoon.',
        energy: -5,
        sanity: 10,
        performance: 14,
        raiseProgress: 5,
        weight: 50,
      },
      {
        narrative:
          'You pushed back and Blake reply-alled that you were "blocking cross-team work." The deadline stayed. Now you are doing the work and looking difficult. Classic.',
        energy: -15,
        sanity: -20,
        performance: -5,
        raiseProgress: -1,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You dropped everything and delivered by 4 PM, tight but clean. A director thanked you by name for the save. Blake tried to call it "our deliverable"; nobody bought it. Your actual priorities slipped to next week, but the credit landed on you.',
        energy: -25,
        sanity: -10,
        performance: 8,
        raiseProgress: 3,
        weight: 40,
      },
      {
        narrative:
          'You dropped everything and delivered by 4 PM. Then a mistake surfaced: Blake had left out a key detail because he "assumed you had context." You stayed until 7 PM redoing your own rush job. The slip got pinned on you. Urgent is a lifestyle.',
        energy: -30,
        sanity: -25,
        performance: -12,
        raiseProgress: -2,
        weight: 60,
      },
    ],
  },
  {
    id: 'fire-drill-demo',
    time: '2:00 PM',
    icon: '🚨',
    location: 'presentation',
    locationLabel: 'Presentation Area',
    npcId: 'derek',
    title: 'The Fire Drill',
    description:
      'You are mid-demo when the alarm goes off. Everyone stands up. Derek whispers you can "just finish this slide" because leadership is watching and the building probably does another lap. The slides after this one have the real numbers.',
    yesLabel: 'Leave immediately and regroup',
    noLabel: 'Try to finish one more slide',
    yesOutcomes: [
      {
        narrative:
          'You evacuated like a professional. The demo resumed tomorrow. Leadership respected the calm. Derek said you "lost momentum." The building was indeed doing another lap.',
        energy: -10,
        sanity: 5,
        performance: 14,
        raiseProgress: 5,
        weight: 50,
      },
      {
        narrative:
          'You left immediately. Derek presented your unfinished deck without you. He misread the one chart you had not reached. You fixed it in the stairwell. HR sent a gentle reminder about alarms.',
        energy: -15,
        sanity: -10,
        performance: 8,
        raiseProgress: 2,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You squeezed in one more slide. Security appeared in the doorway. Leadership remembered the drama, not the content. Derek called it "commitment." Facilities called it something else.',
        energy: -20,
        sanity: -20,
        performance: -12,
        raiseProgress: -2,
        weight: 55,
      },
      {
        narrative:
          'You finished the slide as everyone shuffled out. Somehow the important chart landed. A director laughed and called you dedicated. Do not try this twice.',
        energy: -15,
        sanity: -5,
        performance: 4,
        raiseProgress: 5,
        weight: 45,
      },
    ],
  },
  {
    id: 'spreadsheet-mandate',
    time: '11:30 AM',
    icon: '📊',
    location: 'meeting-room',
    locationLabel: 'Planning Sync',
    npcId: 'spreadsheet-holdout',
    title: 'The Spreadsheet Mandate',
    description:
      'Maureen refuses to use the team tracker. She wants everything in her Excel workbook because "everyone already knows this format." The workbook has forty tabs, broken macros, and a column labeled FINAL that is not final. She needs you to maintain it weekly.',
    yesLabel: 'Push back on the workflow',
    noLabel: 'Maintain the workbook for now',
    yesOutcomes: [
      {
        narrative:
          'You proposed a single source of truth with a weekly export for Maureen. She fought it. Your manager backed the team tool. Maureen still prints the Excel version for meetings. Progress, not peace.',
        energy: -10,
        sanity: 5,
        performance: 14,
        raiseProgress: 5,
        weight: 50,
      },
      {
        narrative:
          'You pushed back. Maureen emailed leadership that you were "not collaborative." Now you maintain two trackers and attend a monthly meeting about which one is official. Neither is.',
        energy: -15,
        sanity: -20,
        performance: -8,
        raiseProgress: -1,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You inherited the workbook. It took ninety minutes to understand tab naming. Maureen called you a lifesaver. You have become the spreadsheet whisperer against your will.',
        energy: -20,
        sanity: -15,
        performance: -12,
        raiseProgress: 2,
        weight: 50,
      },
      {
        narrative:
          'You fixed the macros and color-coded tabs like a hero. Leadership loved the visibility. Maureen adopted your improvements as the official format. You turned a chore into a win.',
        energy: -20,
        sanity: -5,
        performance: 10,
        raiseProgress: 6,
        weight: 50,
      },
    ],
  },
  {
    id: 'long-quick-call',
    time: '3:15 PM',
    icon: '📞',
    location: 'meeting-room',
    locationLabel: 'Zoom Room',
    npcId: 'calendar-warrior',
    title: 'The Quick Call',
    description:
      'Patricia booked a "quick call" with twelve people. Your part is a two-minute update at the end. Forty-seven minutes in, someone is still debating calendar hygiene. You have not spoken yet. The next meeting starts in three minutes.',
    yesLabel: 'Stay on for your turn',
    noLabel: 'Ask to share your update async',
    yesOutcomes: [
      {
        narrative:
          'You stayed. You spoke for ninety seconds at minute fifty-one. Everyone said "great, we are aligned" and left. You missed the next meeting and gained nothing except attendance credit.',
        energy: -20,
        sanity: -15,
        performance: -12,
        raiseProgress: -1,
        weight: 55,
      },
      {
        narrative:
          'You waited it out and gave a crisp update. One director actually asked a good question and wanted a follow-up with you directly. Ninety seconds. Clear impact. Worth the wait.',
        energy: -15,
        sanity: -5,
        performance: 12,
        raiseProgress: 5,
        weight: 45,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You dropped a tight update in the chat and left with a polite excuse. Patricia called it "disengaged." Your manager said the async note was clearer than the call. You got ten minutes back.',
        energy: -5,
        sanity: 10,
        performance: 12,
        raiseProgress: 3,
        weight: 50,
      },
      {
        narrative:
          'You tried to leave async. Patricia read your note aloud anyway and mispronounced half of it. You rejoined to correct three facts. The call ended at the hour mark.',
        energy: -15,
        sanity: -15,
        performance: -8,
        raiseProgress: 0,
        weight: 50,
      },
    ],
  },
  {
    id: 'direct-leader-dm',
    time: '9:05 AM',
    icon: '💬',
    location: 'desk',
    locationLabel: 'Your Desk',
    title: 'The Direct Message',
    description:
      'A senior director DMs you: "Quick question before tomorrow\'s review. Do not loop in your manager yet. I want your unfiltered take." You have a take. You also have a manager. And a performance review cycle.',
    yesLabel: 'Answer directly in the DM',
    noLabel: 'Loop in your manager first',
    yesOutcomes: [
      {
        narrative:
          'You answered in the DM. The director got the unfiltered take they wanted. Then your manager found the thread. They felt bypassed. Neither of them said anything useful before the review. You got what they asked for and still lost trust on both sides.',
        energy: -15,
        sanity: -15,
        performance: -5,
        raiseProgress: -2,
        weight: 50,
      },
      {
        narrative:
          'You answered directly with receipts and diplomacy. The director replied "this is exactly what I needed for tomorrow." Your take is on their short list now. Your manager never saw the thread. Clever move. Slightly guilty move.',
        energy: -5,
        sanity: -5,
        performance: 18,
        raiseProgress: 6,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You told your manager first. They joined, helped you sharpen the answer, and backed you up. The director replied that it was exactly what they needed for tomorrow. Your manager said you did the right thing. Proper channels. No drama.',
        energy: -5,
        sanity: 12,
        performance: 12,
        raiseProgress: 5,
        weight: 50,
      },
      {
        narrative:
          'You looped in your manager. The director replied "never mind" and dropped the thread. By afternoon you learned they asked a peer the same question and used that answer in tomorrow\'s review prep. Your manager said you did the right thing. Your name was not on the slide.',
        energy: -10,
        sanity: -10,
        performance: -16,
        raiseProgress: -4,
        weight: 50,
      },
    ],
  },
  {
    id: 'screen-share-moment',
    time: '2:10 PM',
    icon: '🖥️',
    location: 'meeting-room',
    locationLabel: 'Video Call',
    npcId: 'chad',
    title: 'Do You See My Screen?',
    description:
      'Chad is presenting to leadership. He asks "Can everyone see my screen?" twelve times. What you see is his inbox, a vacation tab, and a half-written message complaining about the roadmap. The actual deck is somewhere behind it. Leadership is waiting.',
    yesLabel: 'Tell him what you actually see',
    noLabel: 'Stay quiet and hope he figures it out',
    yesOutcomes: [
      {
        narrative:
          'You told him gently in chat. He panicked, fixed the share, and laughed it off. Leadership pretended not to read the complaint tab. Chad thanked you afterwards. The demo still ran long.',
        energy: -10,
        sanity: 5,
        performance: 12,
        raiseProgress: 4,
        weight: 50,
      },
      {
        narrative:
          'You spoke up in the room. Chad blamed "Zoom lag," but a director had already seen the complaint draft. Afterward that director DMed you a quiet "thanks for flagging it." Chad acts like nothing happened. You came out as the one paying attention.',
        energy: -15,
        sanity: -10,
        performance: 8,
        raiseProgress: 2,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You stayed quiet. Chad presented to his own email for six minutes. Someone finally said they could not see the deck. He called it a "permissions issue." You have screenshots in your soul.',
        energy: -15,
        sanity: -20,
        performance: -8,
        raiseProgress: -1,
        weight: 55,
      },
      {
        narrative:
          'You waited. He found the right window at minute seven. Leadership missed the awkward part. The demo finished cleanly. Nobody blamed you for staying out of it.',
        energy: -10,
        sanity: -5,
        performance: 4,
        raiseProgress: 2,
        weight: 45,
      },
    ],
  },
  {
    id: 'weather-small-talk',
    time: '9:02 AM',
    icon: '🌤️',
    location: 'meeting-room',
    locationLabel: 'Morning Sync',
    npcId: 'calendar-warrior',
    title: 'The Weather Small Talk',
    description:
      'Patricia opens the call with eight minutes on the weather. Rain back home. Snow somewhere. Someone\'s patio furniture. The agenda says "hard stop in twenty-five minutes." You have not discussed work yet. Everyone is smiling like this is bonding.',
    yesLabel: 'Join in and play along',
    noLabel: 'Gently steer to the agenda',
    yesOutcomes: [
      {
        narrative:
          'You added a comment about your commute. Patricia smiled, but the meeting ran over anyway. You lost twenty minutes you needed for real work and still have no decision.',
        energy: -15,
        sanity: -10,
        performance: -10,
        raiseProgress: 0,
        weight: 50,
      },
      {
        narrative:
          'You played along with charm. Patricia called you "great culture fit" in the chat. When work finally started, leadership remembered your point and moved the decision forward. Charm and substance.',
        energy: -10,
        sanity: -5,
        performance: 8,
        raiseProgress: 4,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You nudged the agenda. Patricia said "just warming up." Two people looked relieved. You became the person who hates fun. The actual topic started at minute eleven.',
        energy: -10,
        sanity: 5,
        performance: 10,
        raiseProgress: 3,
        weight: 50,
      },
      {
        narrative:
          'You tried to redirect. Patricia said weather talk "builds psychological safety." The hard stop still happened. You left with action items and frostbite.',
        energy: -15,
        sanity: -10,
        performance: -5,
        raiseProgress: 0,
        weight: 50,
      },
    ],
  },
  {
    id: 'take-it-offline',
    time: '11:45 AM',
    icon: '🔁',
    location: 'meeting-room',
    locationLabel: 'Team Sync',
    npcId: 'derek',
    title: 'Take It Offline',
    description:
      'A tense topic surfaces on the call. Derek says "let\'s take this offline" with relief in his voice. Ten minutes later Patricia books a follow-up. It is another video call. With more people. The topic is the same. The phrase "offline" was decorative.',
    yesLabel: 'Accept the follow-up call',
    noLabel: 'Push for a written thread instead',
    yesOutcomes: [
      {
        narrative:
          'You joined the follow-up call. Same argument, higher headcount. Someone said "let\'s circle back." You have now attended two meetings and resolved nothing.',
        energy: -20,
        sanity: -20,
        performance: -8,
        raiseProgress: -1,
        weight: 55,
      },
      {
        narrative:
          'You took the follow-up and finally landed a decision. It took ninety minutes. Derek called it "great alignment." You call it three hours on one question.',
        energy: -25,
        sanity: -10,
        performance: 4,
        raiseProgress: 4,
        weight: 45,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You asked for a shared doc and async comments. Derek said that was "less collaborative." Patricia removed the extra call. The thread solved it by Thursday. Miracles happen.',
        energy: -5,
        sanity: 10,
        performance: 14,
        raiseProgress: 5,
        weight: 50,
      },
      {
        narrative:
          'You pushed for async. Derek scheduled the call anyway and tagged you as required. You lost the format fight and still had to attend. "Offline" remains a lie.',
        energy: -15,
        sanity: -15,
        performance: -10,
        raiseProgress: -1,
        weight: 50,
      },
    ],
  },
  {
    id: 'unmuted-chaos',
    time: '10:00 AM',
    icon: '🔇',
    location: 'presentation',
    locationLabel: 'Company Town Hall',
    title: 'Someone Is Not on Mute',
    description:
      'The CEO is talking about quarterly priorities. Then: chewing. A door slam. Someone\'s entire coffee shop conversation. Maybe two people arguing about parking. The host says "I think someone forgot to mute." They do not mute. You have missed three sentences that might have been about your team.',
    yesLabel: 'Say something in chat or speak up',
    noLabel: 'Stay quiet and try to listen through it',
    yesOutcomes: [
      {
        narrative:
          'You typed "please check mute" in the chat. Three other people typed the same thing. The noise stopped. The CEO repeated nothing. You still have no idea what "strategic pivot" means this quarter.',
        energy: -10,
        sanity: 5,
        performance: 8,
        raiseProgress: 0,
        weight: 50,
      },
      {
        narrative:
          'You unmuted and asked politely. The noise was someone\'s kitchen: full family debate about whose turn it is to walk the dog. Half the company heard it. HR will have feelings. The mic finally went dead.',
        energy: -15,
        sanity: -5,
        performance: 12,
        raiseProgress: 2,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You white-knuckled through it. The background conversation was somehow more compelling than the town hall. You learned Chad\'s cousin has strong opinions about laminate flooring. You learned nothing about budget.',
        energy: -15,
        sanity: -20,
        performance: -8,
        raiseProgress: -1,
        weight: 55,
      },
      {
        narrative:
          'You stayed quiet and tried to power through the noise. By the time the host muted them, the CEO had already moved past the part about your team. A teammate messages you: "what did they say about headcount?" You have no idea. Nobody flagged it in time, and the one update that mattered is gone.',
        energy: -10,
        sanity: -15,
        performance: -12,
        raiseProgress: 0,
        weight: 45,
      },
    ],
  },
  {
    id: 'townhall-question',
    time: '10:35 AM',
    icon: '🙋',
    location: 'presentation',
    locationLabel: 'Company Town Hall',
    npcId: 'derek',
    title: 'The Town Hall Question',
    description:
      'The CEO opens the floor for questions. Derek unmuted himself with confidence. He asks something that was answered on slide two, then restates it as a "strategic concern." Half the company is typing in the chat. Leadership answers politely anyway. The meeting has twelve minutes left. Your actual question is now never happening.',
    yesLabel: 'Ask your real question anyway',
    noLabel: 'Let it go and leave on time',
    yesOutcomes: [
      {
        narrative:
          'You asked a sharp, relevant question after Derek\'s tour. Leadership appreciated it. Derek told someone you were "trying to show off." The chat called your question "the only good one." Worth the secondhand embarrassment.',
        energy: -10,
        sanity: 5,
        performance: 15,
        raiseProgress: 5,
        weight: 50,
      },
      {
        narrative:
          'You tried to jump in, but Derek had already burned the clock. The CEO was mid-sentence on "we\'re out of time" before you finished asking. Closing remarks rolled over you. No answer, and the thing you actually needed is still buried in an FAQ that does not exist.',
        energy: -15,
        sanity: -10,
        performance: 0,
        raiseProgress: -1,
        weight: 50,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You let it go. The town hall ended on time. You never got your question answered. Someone will tell you eventually. Probably in a meeting.',
        energy: -5,
        sanity: -10,
        performance: -5,
        raiseProgress: 0,
        weight: 50,
      },
      {
        narrative:
          'You stayed quiet. Derek asked a follow-up that made even less sense. Leadership promised to "take it offline." You saved your dignity. The company lost another twenty minutes.',
        energy: -10,
        sanity: -15,
        performance: -5,
        raiseProgress: -1,
        weight: 50,
      },
    ],
  },
  {
    id: 'oma-marga-call',
    time: '4:45 PM',
    icon: '📞',
    location: 'desk',
    locationLabel: 'Your Desk',
    npcId: 'oma-marga',
    title: 'The Call from Oma Marga',
    description:
      'Your phone lights up: Oma Marga. She learned email late in life; you taught her the computer. Now she sends one and calls to ask if you got it. A hard week, a buzzing chat, and now this. Pick up or let it ring?',
    yesLabel: 'Pick up the call',
    noLabel: 'Silence it, stay focused',
    yesOutcomes: [
      {
        narrative:
          `You picked up. Her first words: "Did you get my email?" Not hello. Not small talk. You said you had, and that one line in it had stuck with you: "${MARGA.lifeChanges}" (${MARGA_EN.lifeChanges}) You told her you loved it. She said she was proud of you. You hung up happier and more sure of yourself than the whole week of meetings had managed.`,
        energy: 5,
        sanity: 20,
        performance: 5,
        raiseProgress: 2,
        weight: 55,
      },
      {
        narrative:
          `You picked up. "Did you get my email?" You opened it right there while she waited. Near the end, word for word: "${MARGA.germanPride}" (${MARGA_EN.germanPride}) Something in you went instantly warmer, a little prouder of yourself. The rest of your afternoon went faster than it had any right to, and the first thing you did after was reply to her email.`,
        energy: 0,
        sanity: 15,
        performance: 8,
        raiseProgress: 3,
        weight: 45,
      },
    ],
    noOutcomes: [
      {
        narrative:
          `You sent it to voicemail and finished the deck. At 7 PM your inbox had a follow-up and a two-minute message. "Did you get my email?" No scolding. You opened the email on the walk home. It ended: "${MARGA.emailCelebration}" (${MARGA_EN.emailCelebration}) Of course there were four exclamation marks.`,
        energy: 0,
        sanity: 10,
        performance: 0,
        raiseProgress: 2,
        weight: 55,
      },
      {
        narrative:
          `You silenced the call and pushed through. The work got done. Later: a missed call and an unread email. The preview on your lock screen ended with: "Das kann ich nur bewundern." (${MARGA_EN.admire}) It read like encouragement, the kind you could have used today. You stared at it longer than any chat thread, and knew the call would have been a better use of the hour than whatever you traded it for.`,
        energy: 5,
        sanity: -5,
        performance: -3,
        raiseProgress: 0,
        weight: 45,
      },
    ],
  },
];

export function pickOutcome(outcomes: Outcome[]): { outcome: Outcome; index: number } {
  const totalWeight = outcomes.reduce((sum, o) => sum + o.weight, 0);
  let roll = Math.random() * totalWeight;
  for (let i = 0; i < outcomes.length; i++) {
    roll -= outcomes[i].weight;
    if (roll <= 0) return { outcome: outcomes[i], index: i };
  }
  const last = outcomes.length - 1;
  return { outcome: outcomes[last], index: last };
}
