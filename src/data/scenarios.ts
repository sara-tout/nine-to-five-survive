export interface Outcome {
  narrative: string;
  energy: number;
  sanity: number;
  performance: number;
  raiseProgress: number;
  weight: number; // probability weight (higher = more likely)
}

export interface Scenario {
  id: string;
  time: string;
  icon: string;
  locationLabel: string;
  npcId?: string;
  title: string;
  description: string;
  yesLabel: string;
  noLabel: string;
  yesOutcomes: Outcome[];
  noOutcomes: Outcome[];
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'late-night-task',
    time: '5:15 PM',
    icon: '💻',
    locationLabel: 'Your Desk',
    npcId: 'derek',
    title: 'The After-Hours "Quick Fix"',
    description:
      'Derek Slides into your DMs: "Super quick one — not urgent, but would be great to have done tonight. Just want to close the loop on our north-star deliverable." Your gym bag stares at you from under your desk.',
    yesLabel: 'Stay & do it',
    noLabel: 'Hit the gym',
    yesOutcomes: [
      {
        narrative:
          'You stayed. The "small task" took 3 hours and wasn\'t even reviewed until next Thursday. Your gym membership weeps silently.',
        energy: -25,
        sanity: -10,
        performance: 5,
        raiseProgress: 2,
        weight: 60,
      },
      {
        narrative:
          'Plot twist: the CEO saw your commit at 8 PM and mentioned it in the all-hands. Sometimes being a tryhard pays off. Your back still hurts though.',
        energy: -15,
        sanity: -5,
        performance: 20,
        raiseProgress: 8,
        weight: 40,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You crushed leg day, slept like a baby, and came in the next morning with the energy of a caffeinated golden retriever. The task took 20 minutes with fresh eyes.',
        energy: 15,
        sanity: 10,
        performance: 10,
        raiseProgress: 3,
        weight: 55,
      },
      {
        narrative:
          'You left, but Derek sent a passive-aggressive "no worries!" at 5:17 PM. You spent the whole workout wondering if you\'re getting fired. Gains: zero.',
        energy: 5,
        sanity: -15,
        performance: -5,
        raiseProgress: -2,
        weight: 45,
      },
    ],
  },
  {
    id: 'meeting-marathon',
    time: '9:30 AM',
    icon: '📅',
    locationLabel: 'Meeting Room',
    npcId: 'calendar-warrior',
    title: 'Meeting Marathon Monday',
    description:
      'Patricia booked you into 6 back-to-back meetings. She just added a 7th: "Quick sync to align on alignment." You could decline and actually do your job instead.',
    yesLabel: 'Accept all meetings',
    noLabel: 'Decline & do real work',
    yesOutcomes: [
      {
        narrative:
          'You attended 7 meetings. In 5 of them, someone said "let\'s take this offline." You now have 14 action items and zero time to do them. You are the meeting.',
        energy: -30,
        sanity: -20,
        performance: -5,
        raiseProgress: 1,
        weight: 65,
      },
      {
        narrative:
          'Somehow, meeting #4 turned into a brainstorm where you casually dropped a brilliant idea. Your skip-level manager noticed. The other 6 meetings were still useless.',
        energy: -20,
        sanity: -10,
        performance: 15,
        raiseProgress: 6,
        weight: 35,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You declined the meetings, put on headphones, and shipped more code before lunch than you did all last week. Your Slack status said "Deep Work" and people actually respected it.',
        energy: 5,
        sanity: 15,
        performance: 20,
        raiseProgress: 5,
        weight: 50,
      },
      {
        narrative:
          'You declined the meetings. Turns out one of them was about org restructuring and you\'re now on a team called "Synergy Ops." Nobody told you. You found out from the wiki.',
        energy: 0,
        sanity: -20,
        performance: -10,
        raiseProgress: -3,
        weight: 50,
      },
    ],
  },
  {
    id: 'lunch-steal',
    time: '12:15 PM',
    icon: '🍱',
    locationLabel: 'Kitchen Fridge',
    npcId: 'karen',
    title: 'The Lunch Thief Strikes Again',
    description:
      'Someone ate your clearly-labeled lunch from the fridge. Again. Karen from accounting is suspiciously not hungry. Do you confront her or just order delivery and suffer in silence?',
    yesLabel: 'Confront Karen',
    noLabel: 'Order delivery, seethe quietly',
    yesOutcomes: [
      {
        narrative:
          'You confronted Karen. She denied everything despite having sriracha on her blouse. HR got involved. You now have a "conflict resolution plan." Your lunch is still gone.',
        energy: -10,
        sanity: -15,
        performance: -5,
        raiseProgress: -2,
        weight: 55,
      },
      {
        narrative:
          'You confronted Karen politely and she broke down crying. Turns out she\'s going through stuff. You bonded over leftover pizza. You now have an ally in accounting who "knows things."',
        energy: -5,
        sanity: 10,
        performance: 5,
        raiseProgress: 4,
        weight: 45,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You ordered $22 pad thai and ate it at your desk while refreshing LinkedIn. The pad thai was mid. Your resentment, however, was perfectly seasoned.',
        energy: 5,
        sanity: -10,
        performance: 0,
        raiseProgress: 0,
        weight: 50,
      },
      {
        narrative:
          'You ordered delivery and used the wait time to take a walk. Fresh air, sunshine, perspective. You came back and absolutely crushed your afternoon tasks. Karen who?',
        energy: 10,
        sanity: 15,
        performance: 10,
        raiseProgress: 3,
        weight: 50,
      },
    ],
  },
  {
    id: 'slack-fire',
    time: '3:00 PM',
    icon: '🔥',
    locationLabel: "Coworker's Desk",
    title: 'The Slack Channel Dumpster Fire',
    description:
      'The #general channel has erupted into a heated debate about whether tabs or spaces are superior. It\'s getting personal. Someone just tagged you: "What do YOU think?" The whole company is watching.',
    yesLabel: 'Jump into the debate',
    noLabel: 'Mute channel, touch grass',
    yesOutcomes: [
      {
        narrative:
          'You posted a thoughtful, balanced take. Both sides hated it. Someone called you a "centrist coder." You\'ve been subtweeted in #random for 3 days straight.',
        energy: -15,
        sanity: -25,
        performance: -10,
        raiseProgress: -3,
        weight: 60,
      },
      {
        narrative:
          'You dropped an absolutely legendary meme that unified both factions in laughter. The VP of Engineering reacted with 🏆. You are now the unofficial office diplomat.',
        energy: -5,
        sanity: 10,
        performance: 5,
        raiseProgress: 5,
        weight: 40,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You muted #general, made a cup of tea, and watched a bird outside your window for 4 minutes. You have achieved inner peace. Your PR got approved while you were gone.',
        energy: 10,
        sanity: 20,
        performance: 5,
        raiseProgress: 2,
        weight: 60,
      },
      {
        narrative:
          'You stayed out of it, but your silence was interpreted as "not a team player." Your manager brought it up in your 1:1. You now have "improve team engagement" as a quarterly goal.',
        energy: 0,
        sanity: -10,
        performance: -5,
        raiseProgress: -2,
        weight: 40,
      },
    ],
  },
  {
    id: 'demo-day',
    time: '2:00 PM',
    icon: '🎤',
    locationLabel: 'Presentation Area',
    npcId: 'derek',
    title: 'Surprise Demo Day',
    description:
      'Derek drops into your standup: "Leadership wants a quick demo in 30 minutes — just to socialize the north-star vision." Your feature is 60% done and the other 40% is held together with console.logs.',
    yesLabel: 'Wing the demo',
    noLabel: 'Ask to reschedule',
    yesOutcomes: [
      {
        narrative:
          'You demoed. The app crashed live. You said "that\'s a known issue" with the confidence of a Fortune 500 CEO. Nobody questioned it. They were impressed by your "transparency."',
        energy: -20,
        sanity: -15,
        performance: 10,
        raiseProgress: 5,
        weight: 45,
      },
      {
        narrative:
          'Murphy\'s Law went on vacation. The demo worked PERFECTLY on the happy path you showed. Leadership loved it. You are now the face of Q3 innovation. The console.logs are your little secret.',
        energy: -10,
        sanity: 5,
        performance: 25,
        raiseProgress: 10,
        weight: 55,
      },
    ],
    noOutcomes: [
      {
        narrative:
          'You asked to reschedule. Your manager respected the honesty and gave you two more days. You shipped something polished and got genuine applause. Integrity: 1, Panic: 0.',
        energy: 5,
        sanity: 15,
        performance: 15,
        raiseProgress: 5,
        weight: 55,
      },
      {
        narrative:
          'You asked to reschedule but the slot went to Dave. Dave demoed a button that changes color. Leadership LOVED it. Dave is now "Dave the Innovator." You are Dave\'s cautionary tale.',
        energy: -5,
        sanity: -15,
        performance: -10,
        raiseProgress: -5,
        weight: 45,
      },
    ],
  },
];

export function pickOutcome(outcomes: Outcome[]): Outcome {
  const totalWeight = outcomes.reduce((sum, o) => sum + o.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const outcome of outcomes) {
    roll -= outcome.weight;
    if (roll <= 0) return outcome;
  }
  return outcomes[outcomes.length - 1];
}
