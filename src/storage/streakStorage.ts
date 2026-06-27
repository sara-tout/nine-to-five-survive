import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmployeeReward, EMPLOYEE_REWARDS, RewardMilestone, getRewardByMilestone } from '../data/employeeRewards';

const STORAGE_KEY = 'nine-to-five-survive:streak';

export interface EarnedRewardRecord {
  milestone: RewardMilestone;
  earnedAt: string;
}

export interface StreakData {
  lastPlayDate: string | null;
  currentStreak: number;
  longestStreak: number;
  earnedRewards: EarnedRewardRecord[];
  pendingCelebrations: RewardMilestone[];
  streakFreezesAvailable: number;
}

const EMPTY_STREAK: StreakData = {
  lastPlayDate: null,
  currentStreak: 0,
  longestStreak: 0,
  earnedRewards: [],
  pendingCelebrations: [],
  streakFreezesAvailable: 0,
};

function getLocalDateString(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
}

function daysBetween(dateA: string, dateB: string): number {
  const a = new Date(`${dateA}T12:00:00`);
  const b = new Date(`${dateB}T12:00:00`);
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export async function loadStreakData(): Promise<StreakData> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_STREAK };
    const parsed = JSON.parse(raw) as StreakData;
    return {
      lastPlayDate: parsed.lastPlayDate ?? null,
      currentStreak: parsed.currentStreak ?? 0,
      longestStreak: parsed.longestStreak ?? 0,
      earnedRewards: parsed.earnedRewards ?? [],
      pendingCelebrations: parsed.pendingCelebrations ?? [],
      streakFreezesAvailable: parsed.streakFreezesAvailable ?? 0,
    };
  } catch {
    return { ...EMPTY_STREAK };
  }
}

async function saveStreakData(data: StreakData): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export interface StreakUpdateResult {
  data: StreakData;
  streakIncreased: boolean;
  newlyEarned: EmployeeReward[];
  usedStreakFreeze: boolean;
}

/** Count one completed shift for today. Safe to call once per finished run. */
export async function recordDailyStreak(): Promise<StreakUpdateResult> {
  const data = await loadStreakData();
  const today = getLocalDateString();
  const newlyEarned: EmployeeReward[] = [];
  let usedStreakFreeze = false;

  if (data.lastPlayDate === today) {
    return { data, streakIncreased: false, newlyEarned, usedStreakFreeze };
  }

  const yesterday = getYesterdayString();

  if (data.lastPlayDate === yesterday) {
    data.currentStreak += 1;
  } else if (!data.lastPlayDate) {
    data.currentStreak = 1;
  } else {
    const gap = daysBetween(data.lastPlayDate, today);
    if (gap === 2 && data.streakFreezesAvailable > 0) {
      data.streakFreezesAvailable -= 1;
      data.currentStreak += 1;
      usedStreakFreeze = true;
    } else {
      data.currentStreak = 1;
    }
  }

  data.lastPlayDate = today;
  data.longestStreak = Math.max(data.longestStreak, data.currentStreak);

  for (const reward of EMPLOYEE_REWARDS) {
    const alreadyEarned = data.earnedRewards.some((r) => r.milestone === reward.days);
    if (!alreadyEarned && data.currentStreak >= reward.days) {
      data.earnedRewards.push({
        milestone: reward.days,
        earnedAt: new Date().toISOString(),
      });
      data.pendingCelebrations.push(reward.days);
      newlyEarned.push(reward);
      if (reward.grantsStreakFreeze) {
        data.streakFreezesAvailable += 1;
      }
    }
  }

  data.pendingCelebrations = [...new Set(data.pendingCelebrations)];

  await saveStreakData(data);
  return { data, streakIncreased: true, newlyEarned, usedStreakFreeze };
}

export async function clearPendingCelebration(milestone: RewardMilestone): Promise<StreakData> {
  const data = await loadStreakData();
  data.pendingCelebrations = data.pendingCelebrations.filter((m) => m !== milestone);
  await saveStreakData(data);
  return data;
}

export function hasEarnedReward(data: StreakData, milestone: RewardMilestone): boolean {
  return data.earnedRewards.some((r) => r.milestone === milestone);
}

export function getEarnedRewardRecords(data: StreakData): { reward: EmployeeReward; earnedAt: string }[] {
  return data.earnedRewards
    .map((record) => ({
      reward: getRewardByMilestone(record.milestone),
      earnedAt: record.earnedAt,
    }))
    .sort((a, b) => a.reward.days - b.reward.days);
}
