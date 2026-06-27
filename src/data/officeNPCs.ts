export interface OfficeNPC {
  id: string;
  name: string;
  title: string;
  emoji: string;
  bio: string;
}

/** Office forces to overcome. Not playable. */
export const OFFICE_NPCS: OfficeNPC[] = [
  {
    id: 'derek',
    name: 'Derek',
    title: 'The Jargon Operator',
    emoji: '🗣️',
    bio: 'Contributes little, speaks perfectly. Closes loops, opens new ones. Somehow still fine.',
  },
  {
    id: 'jessica',
    name: 'Jessica',
    title: 'The Fridge Phantom',
    emoji: '🍱',
    bio: 'Labels mean nothing. HR knows her by name. Accounting knows your secrets.',
  },
  {
    id: 'chad',
    name: 'Chad',
    title: 'The Showboat',
    emoji: '🎪',
    bio: 'Demos a button that changes color. Leadership calls it innovation. You call it Tuesday.',
  },
  {
    id: 'calendar-warrior',
    name: 'Patricia',
    title: 'The Calendar Warrior',
    emoji: '📅',
    bio: 'If it\'s not on the calendar, it didn\'t happen. Back-to-backs are her love language.',
  },
  {
    id: 'peer-reporter',
    name: 'Blake',
    title: 'The Peer Reporter',
    emoji: '🙋',
    bio: 'Same boss as you. Different priorities. Very helpful in public threads.',
  },
  {
    id: 'control-freak',
    name: 'Victoria',
    title: 'The Control Freak',
    emoji: '⏰',
    bio: 'Needs a status update every hour. Deep work is something that happens to other teams.',
  },
  {
    id: 'junior-climber',
    name: 'Ryan',
    title: 'The Upward-Facing Junior',
    emoji: '🧗',
    bio: 'The junior you have been growing. Charming in leadership meetings. Quieter with the team. Leadership sees a rising star. You see months of coaching.',
  },
  {
    id: 'micromanager',
    name: 'Susan',
    title: 'The Timeline Setter',
    emoji: '📊',
    bio: 'Non-technical. Announces deadlines before asking engineering. Tells you what to build and nearly how. Guilt is her project plan.',
  },
  {
    id: 'ghost-contributor',
    name: 'Donald',
    title: 'The Optional Senior',
    emoji: '📴',
    bio: 'Treats work as optional. Online status is a mood. Hates the tiniest ask. Still clears more than you at comp review.',
  },
  {
    id: 'framework-evangelist',
    name: 'Helen',
    title: 'The Framework Evangelist',
    emoji: '📋',
    bio: 'Mandates standards you do not need. Wants docs she cannot read. Harvests your wins for her calls. Nitpicks your leadership while the ship runs on you.',
  },
  {
    id: 'spreadsheet-holdout',
    name: 'Maureen',
    title: 'The Spreadsheet Holdout',
    emoji: '📊',
    bio: 'Refuses every new tool. If it is not Excel, it does not exist. Makes the whole team maintain her workbook because "everyone already knows this format."',
  },
  {
    id: 'oma-marga',
    name: 'Oma Marga',
    title: 'The Straight Shooter',
    emoji: '📚',
    bio: 'Learned email late in life and called to make sure you got it. Direct, sharp, and always proud. Speaks multiple languages, remembers everything, and still reads before breakfast.',
  },
];

export function getNPC(id: string): OfficeNPC | undefined {
  return OFFICE_NPCS.find((npc) => npc.id === id);
}
