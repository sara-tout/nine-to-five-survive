import { CharacterRole } from './characters';
import { Outcome, Scenario } from './scenarios';
import {
  adjustOutcomeWeights,
  buildResolvedOutcome,
  GameFlag,
  LOW_STAT_THRESHOLD,
  ScenarioContext,
} from './scenarioContext';

/**
 * Phase 1: surface the factors a player should weigh before choosing, derived
 * from the same data the engine rolls against. Information turns a coin flip
 * into a decision.
 */

export type FactorTone = 'good' | 'bad' | 'warn';

export interface Factor {
  text: string;
  tone: FactorTone;
}

const careerValue = (o: Outcome) => o.performance + o.raiseProgress;

/** Plain-language standing for the reputation flags that actually move outcomes. */
const FLAG_NOTES: Partial<Record<GameFlag, Factor>> = {
  'derek-grudge': { text: "Derek has it in for you. He'll twist a slip into a story.", tone: 'bad' },
  'derek-pleased': { text: 'Derek is in your corner right now.', tone: 'good' },
  'deep-work-reputation': { text: "You're known for protecting real work. People respect the boundary.", tone: 'good' },
  'low-visibility': { text: "You've gone quiet. Leadership forgets the wins they cannot see.", tone: 'bad' },
  'credit-invisible': { text: 'Your wins keep landing under other people\u2019s names.', tone: 'bad' },
  'self-advocated': { text: "You've been speaking up. Leadership knows your name.", tone: 'good' },
  'exec-visible': { text: 'Execs have you on their radar in a good way.', tone: 'good' },
  'exec-snubbed': { text: 'You got left off a room that mattered. It still stings upstairs.', tone: 'bad' },
  'visibility-harvested': { text: 'Helen is repackaging your wins as hers.', tone: 'bad' },
  'jessica-ally': { text: 'Jessica has your back.', tone: 'good' },
  'jessica-drama': { text: 'Things are tense with Jessica.', tone: 'bad' },
  'peer-tension': { text: 'There\u2019s friction with a peer that could resurface.', tone: 'bad' },
  'victoria-escalated': { text: 'Victoria is watching your responsiveness closely.', tone: 'bad' },
  'responsive-reputation': { text: "You're seen as reliably responsive.", tone: 'good' },
  'office-diplomat': { text: 'You\u2019ve built a reputation for handling things with class.', tone: 'good' },
  'deadline-chain-active': { text: 'A deadline you already touched is still hanging over the week.', tone: 'warn' },
};

/** Up to two of the most decision-relevant standings, worst news first. */
export function getReputationFactors(flags: GameFlag[]): Factor[] {
  const notes = flags.map((f) => FLAG_NOTES[f]).filter((n): n is Factor => Boolean(n));
  const order: Record<FactorTone, number> = { bad: 0, warn: 1, good: 2 };
  notes.sort((a, b) => order[a.tone] - order[b.tone]);
  return notes.slice(0, 2);
}

export function getDepletionFactor(energy: number, sanity: number): Factor | null {
  const lowest = Math.min(energy, sanity);
  if (lowest >= LOW_STAT_THRESHOLD) return null;
  const which = energy <= sanity ? 'running on empty' : 'frayed and frazzled';
  return {
    text: `You're ${which}. Judgment calls are riskier and your wins land smaller until you recover.`,
    tone: 'warn',
  };
}

export type RiskLevel = 'steady' | 'swingy';

export interface ChoiceRisk {
  level: RiskLevel;
  /** A possible result this turn could knock you out (energy or sanity to zero). */
  canBurnout: boolean;
}

/** Coarse read on a choice: how wide the possible results are, and whether it could end the run. */
export function getChoiceRisk(
  scenario: Scenario,
  choice: 'yes' | 'no',
  role: CharacterRole,
  context: ScenarioContext,
): ChoiceRisk {
  const base = choice === 'yes' ? scenario.yesOutcomes : scenario.noOutcomes;
  const weighted = adjustOutcomeWeights(scenario.id, choice, base, context);
  const resolved = weighted.map((o, i) =>
    buildResolvedOutcome(scenario.id, choice, o, i, role, context),
  );
  const careers = resolved.map(careerValue);
  const spread = Math.max(...careers) - Math.min(...careers);

  const energy = context.energy ?? 100;
  const sanity = context.sanity ?? 100;
  const canBurnout = resolved.some((o) => energy + o.energy <= 0 || sanity + o.sanity <= 0);

  return { level: spread >= 16 ? 'swingy' : 'steady', canBurnout };
}
