export type CharacterRole =
  | 'builder'
  | 'product-partner'
  | 'fast-learner'
  | 'craftsperson'
  | 'truth-finder'
  | 'reliability-pro'
  | 'mentor'
  | 'professor';

export interface CharacterDef {
  role: CharacterRole;
  emoji: string;
  name: string;
  title: string;
  bio: string;
}

export const CHARACTERS: CharacterDef[] = [
  {
    role: 'builder',
    emoji: '👩‍💻',
    name: 'Carla',
    title: 'The Builder',
    bio: 'Ships clean code, protects deep work, and mentors without ego. The person everyone wants on their project.',
  },
  {
    role: 'product-partner',
    emoji: '👩‍💼',
    name: 'Ming',
    title: 'The Product Partner',
    bio: 'Cuts scope creep, shields the team, and actually understands the work. Makes hard calls so others can focus.',
  },
  {
    role: 'fast-learner',
    emoji: '👨‍💼',
    name: 'Alan',
    title: 'The Fast Learner',
    bio: 'New to the role but asks the right questions, takes notes, and levels up every week. Hungry without being chaotic.',
  },
  {
    role: 'craftsperson',
    emoji: '👩‍🎨',
    name: 'Julia',
    title: 'The Craftsperson',
    bio: 'Fights for users, sweats the details, and makes products feel inevitable. Design with a backbone.',
  },
  {
    role: 'truth-finder',
    emoji: '👩‍🔬',
    name: 'Dr. Ursula',
    title: 'The Truth Finder',
    bio: 'Turns noise into signal. Brings receipts, not vibes. The room gets quieter when she presents the data.',
  },
  {
    role: 'reliability-pro',
    emoji: '👷',
    name: 'Hong',
    title: 'The Reliability Pro',
    bio: 'Keeps systems running so everyone else can sleep. Fixes fires before they become headlines.',
  },
  {
    role: 'mentor',
    emoji: '👨‍🏫',
    name: 'Kevin',
    title: 'The Mentor',
    bio: 'Has seen every reorg and survived them all. The team calls him Cookie. Lifts others up, shares credit, and still ships.',
  },
  {
    role: 'professor',
    emoji: '👴',
    name: 'Jido',
    title: 'The Professor',
    bio: 'A mathematician who should have retired years ago. Still shows up because the problems are interesting, not the paycheck.',
  },
];

export function getCharacterByRole(role: CharacterRole): CharacterDef {
  return CHARACTERS.find((c) => c.role === role) ?? CHARACTERS[0];
}

export function getCharacterByEmoji(emoji: string): CharacterDef | undefined {
  return CHARACTERS.find((c) => c.emoji === emoji);
}
