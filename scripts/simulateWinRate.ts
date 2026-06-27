/**
 * Monte Carlo balance check: simulates full 5-day runs through the real
 * game data (scenarios, weights, day modifiers, flags) to measure how
 * winnable the game is under different play styles.
 *
 * Win = end the week with performance >= RAISE_THRESHOLD.
 * Outcome "raise" points fold into performance.
 *
 * Run: npx tsx scripts/simulateWinRate.ts
 */
import { SCENARIOS, pickOutcome, Outcome } from '../src/data/scenarios';
import {
  adjustOutcomeWeights,
  buildResolvedOutcome,
  deriveFlags,
  GameFlag,
  ScenarioContext,
  PREP_ENERGY_COST,
} from '../src/data/scenarioContext';
import { DAY_MODIFIERS, DayModifierId } from '../src/data/dayModifiers';
import { PerkId } from '../src/data/perks';
import { RAISE_THRESHOLD, STARTING_PERFORMANCE, TOTAL_DAYS } from '../src/constants/gameRules';

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function sample<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

type Strategy = 'random' | 'greedy-perf' | 'careful' | 'strategic';

interface RunOpts {
  perk?: PerkId | null;
  /** Whether the player invests energy to prep high-stakes scenarios. */
  usePrep?: boolean;
}

const perfGain = (o: Outcome) => o.performance + o.raiseProgress;
const careerSpread = (outcomes: Outcome[]) => {
  const careers = outcomes.map(perfGain);
  return Math.max(...careers) - Math.min(...careers);
};

function expectedStats(outcomes: Outcome[]) {
  const total = outcomes.reduce((s, o) => s + o.weight, 0);
  let perf = 0;
  let minEnergy = 0;
  let minSanity = 0;
  for (const o of outcomes) {
    perf += (o.weight / total) * perfGain(o);
    minEnergy = Math.min(minEnergy, o.energy);
    minSanity = Math.min(minSanity, o.sanity);
  }
  return { perf, minEnergy, minSanity };
}

function runOnce(strategy: Strategy, opts: RunOpts = {}) {
  let energy = 80;
  let sanity = 80;
  let performance = STARTING_PERFORMANCE;
  let flags: GameFlag[] = [];
  const perk = opts.perk ?? null;

  const scenarios = sample(SCENARIOS, TOTAL_DAYS);
  const moods = sample(
    DAY_MODIFIERS.map((m) => m.id),
    TOTAL_DAYS,
  ) as DayModifierId[];

  for (let day = 0; day < TOTAL_DAYS; day++) {
    const scenario = scenarios[day];
    const baseContext = (prepared: boolean): ScenarioContext => ({
      dayModifier: moods[day],
      priorChoices: [],
      flags,
      energy,
      sanity,
      prepared,
      perk,
    });

    const resolvedFor = (choice: 'yes' | 'no', prepared: boolean) => {
      const base = choice === 'yes' ? scenario.yesOutcomes : scenario.noOutcomes;
      const ctx = baseContext(prepared);
      const weighted = adjustOutcomeWeights(scenario.id, choice, base, ctx);
      return weighted.map((o, i) => buildResolvedOutcome(scenario.id, choice, o, i, 'builder', ctx));
    };

    // Pick a choice using the un-prepped odds first.
    const yesOutcomes = resolvedFor('yes', false);
    const noOutcomes = resolvedFor('no', false);

    let choice: 'yes' | 'no';
    if (strategy === 'random') {
      choice = Math.random() < 0.5 ? 'yes' : 'no';
    } else {
      const ey = expectedStats(yesOutcomes);
      const en = expectedStats(noOutcomes);
      if (strategy === 'careful' || strategy === 'strategic') {
        const yesSafe = energy + ey.minEnergy > 0 && sanity + ey.minSanity > 0;
        const noSafe = energy + en.minEnergy > 0 && sanity + en.minSanity > 0;
        choice = yesSafe !== noSafe ? (yesSafe ? 'yes' : 'no') : ey.perf >= en.perf ? 'yes' : 'no';
      } else {
        choice = ey.perf >= en.perf ? 'yes' : 'no';
      }
    }

    // Phase 3: invest in high-stakes, high-variance scenarios when we can afford it.
    const branch = choice === 'yes' ? yesOutcomes : noOutcomes;
    const prepared =
      Boolean(opts.usePrep) &&
      energy >= 55 &&
      careerSpread(branch) >= 16;
    if (prepared) energy = clamp(energy - PREP_ENERGY_COST, 0, 100);

    const finalOutcomes = prepared ? resolvedFor(choice, true) : branch;
    const { outcome, index } = pickOutcome(finalOutcomes);

    energy = clamp(energy + outcome.energy, 0, 100);
    sanity = clamp(sanity + outcome.sanity, 0, 100);
    performance = clamp(performance + perfGain(outcome), 0, 100);

    if (energy <= 0 || sanity <= 0) {
      return { won: false, burnout: true, performance, day: day + 1 };
    }
    flags = [...new Set([...flags, ...deriveFlags(scenario.id, choice, index)])];
  }

  return { won: performance >= RAISE_THRESHOLD, burnout: false, performance, day: TOTAL_DAYS };
}

const RUNS = 20000;

function report(label: string, strategy: Strategy, opts: RunOpts = {}) {
  let wins = 0;
  let burnouts = 0;
  let perfSum = 0;
  const perfs: number[] = [];
  for (let i = 0; i < RUNS; i++) {
    const r = runOnce(strategy, opts);
    if (r.won) wins++;
    if (r.burnout) burnouts++;
    perfSum += r.performance;
    perfs.push(r.performance);
  }
  perfs.sort((a, b) => a - b);
  console.log(
    `${label.padEnd(22)} win: ${((wins / RUNS) * 100).toFixed(1)}%  burnout: ${((burnouts / RUNS) * 100).toFixed(1)}%  avg perf: ${(perfSum / RUNS).toFixed(1)}  median: ${perfs[Math.floor(RUNS / 2)]}`,
  );
}

report('random', 'random', { perk: 'ship-fast' });
report('greedy-perf', 'greedy-perf', { perk: 'ship-fast' });
report('careful (no perk/prep)', 'careful');
report('strategic +prep', 'strategic', { usePrep: true });
report('strategic +prep+deep', 'strategic', { usePrep: true, perk: 'deep-work' });
report('strategic +prep+ship', 'strategic', { usePrep: true, perk: 'ship-fast' });

// Threshold sensitivity: what win rate would each threshold give a decent player?
{
  const perfs: number[] = [];
  let burnouts = 0;
  for (let i = 0; i < RUNS; i++) {
    const r = runOnce('careful');
    if (r.burnout) burnouts++;
    else perfs.push(r.performance);
  }
  console.log(
    '\nthreshold -> win rate (careful play, excl. burnouts which were ' +
      ((burnouts / RUNS) * 100).toFixed(1) +
      '%):',
  );
  for (const t of [75, 80, 85, 90, 95]) {
    const wins = perfs.filter((p) => p >= t).length;
    console.log(`  performance >= ${String(t).padStart(2)}: ${((wins / RUNS) * 100).toFixed(1)}%`);
  }
}
