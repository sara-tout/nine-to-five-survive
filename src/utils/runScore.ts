import { RunGrade } from './runGrade';

export function calculateRunScore(params: {
  won: boolean;
  grade: RunGrade;
  daysCompleted: number;
  currentStreak: number;
}): number {
  let score = 10;
  score += params.daysCompleted * 2;
  if (params.won) score += 25;

  const gradeBonus: Record<RunGrade['grade'], number> = {
    S: 50,
    A: 30,
    B: 15,
    C: 5,
    D: 0,
  };
  score += gradeBonus[params.grade.grade];
  score += Math.min(params.currentStreak, 30);

  return score;
}
