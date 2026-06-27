import { describe, expect, it } from 'vitest';
import { calculateRunGrade, RunGradeInput } from '../utils/runGrade';

function input(overrides: Partial<RunGradeInput> = {}): RunGradeInput {
  return {
    energy: 0,
    sanity: 0,
    performance: 0,
    currentStreak: 0,
    perksEarned: 0,
    won: false,
    ...overrides,
  };
}

describe('calculateRunGrade', () => {
  it('grades a wiped-out run as D', () => {
    expect(calculateRunGrade(input({ energy: 10, sanity: 10, performance: 10 })).grade).toBe('D');
  });

  it('grades a survivable-but-lost run as C', () => {
    expect(calculateRunGrade(input({ energy: 30, sanity: 30, performance: 30 })).grade).toBe('C');
  });

  it('any win is at least a B', () => {
    const grade = calculateRunGrade(input({ energy: 20, sanity: 20, performance: 85, won: true }));
    expect(grade.grade).toBe('B');
  });

  it('grades a strong win as A', () => {
    const grade = calculateRunGrade(input({ energy: 60, sanity: 60, performance: 80, won: true }));
    expect(grade.grade).toBe('A');
  });

  it('grades a near-perfect, high-performance win as S', () => {
    const grade = calculateRunGrade(input({ energy: 60, sanity: 60, performance: 90, won: true }));
    expect(grade.grade).toBe('S');
  });

  it('notes streak and perk bonuses', () => {
    const grade = calculateRunGrade(
      input({ energy: 60, sanity: 60, performance: 90, won: true, currentStreak: 7, perksEarned: 2 }),
    );
    expect(grade.bonusNote).toContain('Streak bonus');
    expect(grade.bonusNote).toContain('perks');
  });

  it('is monotonic: higher performance never lowers the score', () => {
    const low = calculateRunGrade(input({ performance: 40 })).score;
    const high = calculateRunGrade(input({ performance: 80 })).score;
    expect(high).toBeGreaterThan(low);
  });
});
