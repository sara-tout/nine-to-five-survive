import { beforeEach, describe, expect, it, vi } from 'vitest';

// Stateful in-memory AsyncStorage so we can assert real round-trips.
const store = new Map<string, string>();
vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn(async (key: string) => (store.has(key) ? store.get(key)! : null)),
    setItem: vi.fn(async (key: string, value: string) => {
      store.set(key, value);
    }),
    removeItem: vi.fn(async (key: string) => {
      store.delete(key);
    }),
  },
}));

import {
  loadPlayerProfile,
  savePlayerProfile,
  setUsername,
} from '../storage/playerProfile';
import {
  loadPlayerHistory,
  recordPlayedRun,
  countUnplayedScenarios,
} from '../storage/playerHistory';
import { SCENARIOS } from '../data/scenarios';

beforeEach(() => {
  store.clear();
});

describe('playerProfile storage', () => {
  it('returns an empty profile when nothing is stored', async () => {
    const profile = await loadPlayerProfile();
    expect(profile).toEqual({
      username: '',
      localTotalScore: 0,
      localRunsCompleted: 0,
      localWins: 0,
    });
  });

  it('round-trips a saved profile', async () => {
    await savePlayerProfile({
      username: 'survivor_1',
      localTotalScore: 120,
      localRunsCompleted: 3,
      localWins: 1,
    });
    const loaded = await loadPlayerProfile();
    expect(loaded.username).toBe('survivor_1');
    expect(loaded.localTotalScore).toBe(120);
  });

  it('setUsername trims and persists', async () => {
    const updated = await setUsername('  badge_name  ');
    expect(updated.username).toBe('badge_name');
    expect((await loadPlayerProfile()).username).toBe('badge_name');
  });

  it('tolerates corrupted JSON by returning an empty profile', async () => {
    store.set('nine-to-five-survive:player-profile', '{not valid json');
    expect((await loadPlayerProfile()).username).toBe('');
  });
});

describe('playerHistory storage', () => {
  it('accumulates played scenarios across runs', async () => {
    await recordPlayedRun({
      scenarioIds: ['demo-day', 'late-night-task'],
      moodIds: ['manager-on-edge'],
      scenarioCycleReset: false,
      moodCycleReset: false,
    });
    await recordPlayedRun({
      scenarioIds: ['demo-day', 'lunch-steal'],
      moodIds: ['bad-sleep'],
      scenarioCycleReset: false,
      moodCycleReset: false,
    });

    const history = await loadPlayerHistory();
    expect(new Set(history.playedScenarioIds)).toEqual(
      new Set(['demo-day', 'late-night-task', 'lunch-steal']),
    );
  });

  it('resets the played pool when the cycle resets', async () => {
    await recordPlayedRun({
      scenarioIds: ['demo-day', 'late-night-task'],
      moodIds: ['manager-on-edge'],
      scenarioCycleReset: false,
      moodCycleReset: false,
    });
    const reset = await recordPlayedRun({
      scenarioIds: ['lunch-steal'],
      moodIds: ['bad-sleep'],
      scenarioCycleReset: true,
      moodCycleReset: true,
    });
    expect(reset.playedScenarioIds).toEqual(['lunch-steal']);
  });

  it('counts unplayed scenarios against the full catalog', async () => {
    expect(countUnplayedScenarios([])).toBe(SCENARIOS.length);
    expect(countUnplayedScenarios([SCENARIOS[0].id])).toBe(SCENARIOS.length - 1);
  });
});
