export interface OfficeNPC {
  id: string;
  name: string;
  title: string;
  emoji: string;
  bio: string;
}

/** Office forces to overcome — not playable. */
export const OFFICE_NPCS: OfficeNPC[] = [
  {
    id: 'derek',
    name: 'Derek',
    title: 'The Jargon Operator',
    emoji: '🗣️',
    bio: 'Contributes little, speaks perfectly. Closes loops, opens new ones. Somehow still fine.',
  },
  {
    id: 'karen',
    name: 'Karen',
    title: 'The Fridge Phantom',
    emoji: '🍱',
    bio: 'Labels mean nothing. HR knows her by name. Accounting knows your secrets.',
  },
  {
    id: 'dave',
    name: 'Dave',
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
];

export function getNPC(id: string): OfficeNPC | undefined {
  return OFFICE_NPCS.find((npc) => npc.id === id);
}
