import AsyncStorage from '@react-native-async-storage/async-storage';
import { DAY_MODIFIERS, DayModifierId } from '../data/dayModifiers';
import { SCENARIOS } from '../data/scenarios';

const STORAGE_KEY = 'nine-to-five-survive:player-history';

export interface PlayerHistory {
  playedScenarioIds: string[];
  playedMoodIds: DayModifierId[];
}

const EMPTY_HISTORY: PlayerHistory = {
  playedScenarioIds: [],
  playedMoodIds: [],
};

export async function loadPlayerHistory(): Promise<PlayerHistory> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_HISTORY };
    const parsed = JSON.parse(raw) as PlayerHistory;
    return {
      playedScenarioIds: parsed.playedScenarioIds ?? [],
      playedMoodIds: parsed.playedMoodIds ?? [],
    };
  } catch {
    return { ...EMPTY_HISTORY };
  }
}

export interface RecordRunInput {
  scenarioIds: string[];
  moodIds: DayModifierId[];
  scenarioCycleReset: boolean;
  moodCycleReset: boolean;
}

export async function recordPlayedRun(input: RecordRunInput): Promise<PlayerHistory> {
  const history = await loadPlayerHistory();

  const nextScenarioIds = input.scenarioCycleReset
    ? [...new Set(input.scenarioIds)]
    : [...new Set([...history.playedScenarioIds, ...input.scenarioIds])];

  const nextMoodIds = input.moodCycleReset
    ? [...new Set(input.moodIds)]
    : [...new Set([...history.playedMoodIds, ...input.moodIds])];

  const updated: PlayerHistory = {
    playedScenarioIds: nextScenarioIds,
    playedMoodIds: nextMoodIds,
  };

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function countUnplayedScenarios(playedIds: string[]): number {
  return SCENARIOS.filter((s) => !playedIds.includes(s.id)).length;
}

export function countUnplayedMoods(playedIds: DayModifierId[]): number {
  return DAY_MODIFIERS.filter((m) => !playedIds.includes(m.id)).length;
}
