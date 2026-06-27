import { COLORS } from '../constants/theme';
import { RAISE_THRESHOLD } from '../constants/gameRules';

export interface RunGradeInput {
  energy: number;
  sanity: number;
  performance: number;
  currentStreak: number;
  perksEarned: number;
  won: boolean;
}

export interface RunGrade {
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  color: string;
  label: string;
  score: number;
  bonusNote: string | null;
}

export function calculateRunGrade(input: RunGradeInput): RunGrade {
  const statTotal = input.energy + input.sanity + input.performance;
  const raiseBonus = input.won ? 15 : 0;
  const streakBonus = Math.min(input.currentStreak * 2, 20);
  const perkBonus = input.perksEarned * 8;
  const score = statTotal + raiseBonus + streakBonus + perkBonus;

  const bonusNotes: string[] = [];
  if (input.currentStreak >= 7) bonusNotes.push('Streak bonus applied');
  if (input.perksEarned > 0) bonusNotes.push('Vault perks boosted your grade');

  if (input.won && score >= 210 && input.performance >= RAISE_THRESHOLD + 5) {
    return {
      grade: 'S',
      color: '#FFD700',
      label: 'Legendary Office Survivor',
      score,
      bonusNote: bonusNotes.join(' · ') || null,
    };
  }
  if (input.won && score >= 170) {
    return {
      grade: 'A',
      color: COLORS.success,
      label: 'Senior Survivor',
      score,
      bonusNote: bonusNotes.join(' · ') || null,
    };
  }
  if (input.won || score >= 130) {
    return {
      grade: 'B',
      color: COLORS.accent,
      label: 'Mid-Level Survivor',
      score,
      bonusNote: bonusNotes.join(' · ') || null,
    };
  }
  if (score >= 90) {
    return {
      grade: 'C',
      color: COLORS.energy,
      label: 'Junior Survivor',
      score,
      bonusNote: null,
    };
  }
  return {
    grade: 'D',
    color: COLORS.danger,
    label: 'Still Employed (Barely)',
    score,
    bonusNote: null,
  };
}
