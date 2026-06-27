import { Outcome } from '../data/scenarios';

export type OutcomeTone = 'great' | 'good' | 'mixed' | 'bad';

export interface OutcomeToneDisplay {
  tone: OutcomeTone;
  badge: string;
  emoji: string;
}

/** Classify how the outcome *felt* from stat changes. */
export function getOutcomeTone(outcome: Outcome): OutcomeToneDisplay {
  const { energy, sanity, performance, raiseProgress } = outcome;
  const total = energy + sanity + performance + raiseProgress;
  const personal = energy + sanity;
  const career = performance + raiseProgress;

  // Career progress at a steep personal cost (pyrrhic / stressful wins).
  if (career > 0 && personal <= -15) {
    return { tone: 'mixed', badge: 'Stressful win', emoji: '😅' };
  }
  if (total >= 10) {
    return { tone: 'great', badge: 'Nailed it!', emoji: '🎉' };
  }
  if (total > 0) {
    return { tone: 'good', badge: 'Not bad!', emoji: '😎' };
  }
  if (career > 0 && personal < 0) {
    return { tone: 'mixed', badge: 'Stressful win', emoji: '😅' };
  }
  if (total === 0 && raiseProgress >= 0) {
    return { tone: 'mixed', badge: 'Even trade', emoji: '😐' };
  }
  return { tone: 'bad', badge: 'Oof.', emoji: '😬' };
}
