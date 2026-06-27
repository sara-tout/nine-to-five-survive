import { describe, expect, it } from 'vitest';
import { pickScenarioOrder, SCENARIOS, pickOutcome } from '../data/scenarios';
import { pickDayModifierOrder } from '../data/dayModifiers';
import { validateUsername } from '../storage/playerProfile';
import { calculateRunScore } from '../utils/runScore';
import { calculateRunGrade } from '../utils/runGrade';
import { getOutcomeTone } from '../utils/outcomeTone';

describe('pickScenarioOrder', () => {
  it('returns unique scenarios within a run', () => {
    const { items } = pickScenarioOrder(5, []);
    const ids = items.map((i) => i);
    expect(new Set(ids).size).toBe(5);
  });

  it('resets cycle when unplayed pool is too small', () => {
    const played = SCENARIOS.slice(0, SCENARIOS.length - 4).map((s) => s.id);
    const { cycleReset } = pickScenarioOrder(5, played);
    expect(cycleReset).toBe(true);
  });
});

describe('pickDayModifierOrder', () => {
  it('returns unique moods within a run', () => {
    const { items } = pickDayModifierOrder(5, []);
    expect(new Set(items).size).toBe(5);
  });
});

describe('pickOutcome', () => {
  it('returns a valid outcome index', () => {
    const outcomes = [
      { narrative: 'a', energy: 0, sanity: 0, performance: 0, raiseProgress: 0, weight: 50 },
      { narrative: 'b', energy: 0, sanity: 0, performance: 0, raiseProgress: 0, weight: 50 },
    ];
    const { index, outcome } = pickOutcome(outcomes);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(2);
    expect(outcome.narrative).toMatch(/a|b/);
  });
});

describe('validateUsername', () => {
  it('rejects short names', () => {
    expect(validateUsername('ab')).not.toBeNull();
  });

  it('accepts valid names', () => {
    expect(validateUsername('survivor_1')).toBeNull();
  });
});

describe('calculateRunScore', () => {
  it('awards more points for wins', () => {
    const grade = calculateRunGrade({
      energy: 60,
      sanity: 60,
      performance: 60,
      currentStreak: 3,
      perksEarned: 1,
      won: true,
    });
    const win = calculateRunScore({ grade, daysCompleted: 5, currentStreak: 3, won: true });
    const loss = calculateRunScore({ grade, daysCompleted: 5, currentStreak: 3, won: false });
    expect(win).toBeGreaterThan(loss);
  });
});

describe('getOutcomeTone', () => {
  it('labels steep personal cost wins as stressful win', () => {
    const tone = getOutcomeTone({
      narrative: 'test',
      energy: -10,
      sanity: -10,
      performance: 15,
      raiseProgress: 6,
      weight: 50,
    });
    expect(tone.tone).toBe('mixed');
    expect(tone.badge).toBe('Stressful win');
  });

  it('labels performance-review pyrrhic win as stressful win', () => {
    const tone = getOutcomeTone({
      narrative: 'test',
      energy: -5,
      sanity: -10,
      performance: 15,
      raiseProgress: 6,
      weight: 50,
    });
    expect(tone.tone).toBe('mixed');
  });
});
