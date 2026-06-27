export type RewardMilestone = 7 | 14 | 30 | 90;

export interface EmployeeReward {
  id: RewardMilestone;
  days: RewardMilestone;
  emoji: string;
  title: string;
  perk: string;
  description: string;
  hrFinePrint: string;
  grantsStreakFreeze?: boolean;
  /** mechanical = affects gameplay; collectible = flavor / grade flex only */
  kind: 'mechanical' | 'collectible';
}

export const EMPLOYEE_REWARDS: EmployeeReward[] = [
  {
    id: 7,
    days: 7,
    emoji: '🏖️',
    title: 'Bonus PTO Token',
    perk: 'One guilt-free Friday',
    description: 'Redeem for a Friday where Derek\'s "quick sync" is legally someone else\'s problem.',
    hrFinePrint: 'Subject to team coverage, release calendar, and Derek\'s feelings.',
    kind: 'collectible',
  },
  {
    id: 14,
    days: 14,
    emoji: '🧊',
    title: 'Streak Freeze Token',
    perk: 'One HR-approved miss',
    description: 'Skip a day without breaking your attendance streak. HR calls it "grace." You call it survival.',
    hrFinePrint: 'Auto-applies on your next missed day. Cannot freeze a second miss in a row.',
    grantsStreakFreeze: true,
    kind: 'mechanical',
  },
  {
    id: 30,
    days: 30,
    emoji: '🅿️',
    title: 'Premium Parking Pass',
    perk: 'The spot near the door',
    description: 'A laminated pass for a parking spot that may or may not exist on Tuesdays.',
    hrFinePrint: 'Not valid on reorg days, all-hands days, or days when leadership visits.',
    kind: 'collectible',
  },
  {
    id: 90,
    days: 90,
    emoji: '🚽',
    title: 'Executive Bathroom Key',
    perk: 'Tier-one facilities access',
    description: 'A key to the bathroom everyone swears is real. The tile alone is worth the streak.',
    hrFinePrint: 'Key may open a supply closet. Complaints go to Facilities, not you.',
    kind: 'collectible',
  },
];

export function getRewardByMilestone(days: RewardMilestone): EmployeeReward {
  return EMPLOYEE_REWARDS.find((r) => r.days === days) ?? EMPLOYEE_REWARDS[0];
}

export function getNextMilestone(currentStreak: number): EmployeeReward | null {
  return EMPLOYEE_REWARDS.find((r) => currentStreak < r.days) ?? null;
}
