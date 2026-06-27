import { describe, expect, it } from 'vitest';
import {
  adjustOutcomeWeights,
  buildResolvedOutcome,
  PREP_ENERGY_COST,
  ScenarioContext,
} from '../data/scenarioContext';
import { Outcome, SCENARIOS } from '../data/scenarios';
import { gameReducer, initialState, GameState } from '../context/GameContext';
import { getChoiceRisk, getDepletionFactor, getReputationFactors } from '../data/strategy';

const makeOutcome = (over: Partial<Outcome> = {}): Outcome => ({
  narrative: 'x',
  energy: 0,
  sanity: 0,
  performance: 0,
  raiseProgress: 0,
  weight: 50,
  ...over,
});

// Index 0 has the worse career, index 1 the better one.
const lowHigh = () => [
  makeOutcome({ performance: -8, raiseProgress: 0, weight: 50 }),
  makeOutcome({ performance: 12, raiseProgress: 2, weight: 50 }),
];

const ctx = (over: Partial<ScenarioContext> = {}): ScenarioContext => ({
  dayModifier: 'manager-on-edge',
  priorChoices: [],
  flags: [],
  ...over,
});

describe('Phase 3: preparation tilts the odds toward the best outcome', () => {
  it('raises the best-career outcome weight when prepared', () => {
    const base = adjustOutcomeWeights('depth-test', 'yes', lowHigh(), ctx());
    const prepped = adjustOutcomeWeights('depth-test', 'yes', lowHigh(), ctx({ prepared: true }));
    expect(prepped[1].weight).toBeGreaterThan(base[1].weight);
    expect(prepped[0].weight).toBe(base[0].weight);
  });
});

describe('Phase 2: depletion degrades judgment', () => {
  it('raises the worst-career outcome weight when energy is low', () => {
    const fresh = adjustOutcomeWeights('depth-test', 'yes', lowHigh(), ctx({ energy: 80, sanity: 80 }));
    const drained = adjustOutcomeWeights('depth-test', 'yes', lowHigh(), ctx({ energy: 8, sanity: 80 }));
    expect(drained[0].weight).toBeGreaterThan(fresh[0].weight);
  });

  it('shaves positive performance when running on empty', () => {
    const out = makeOutcome({ performance: 10 });
    const fresh = buildResolvedOutcome('depth-test', 'yes', out, 0, 'builder', ctx({ energy: 80, sanity: 80 }));
    const drained = buildResolvedOutcome('depth-test', 'yes', out, 0, 'builder', ctx({ energy: 8, sanity: 80 }));
    expect(drained.performance).toBeLessThan(fresh.performance);
    expect(drained.performance).toBeGreaterThan(0);
  });

  it('is recoverable: no penalty once stats are back up', () => {
    const out = makeOutcome({ performance: 10 });
    const recovered = buildResolvedOutcome('depth-test', 'yes', out, 0, 'builder', ctx({ energy: 60, sanity: 60 }));
    expect(recovered.performance).toBe(10);
  });
});

describe('Phase 4: role perks', () => {
  it('a damage-shield perk softens the matching negative stat', () => {
    const out = makeOutcome({ sanity: -20 });
    const none = buildResolvedOutcome('depth-test', 'no', out, 0, 'mentor', ctx({ energy: 80, sanity: 80 }));
    const grounded = buildResolvedOutcome('depth-test', 'no', out, 0, 'mentor', ctx({ energy: 80, sanity: 80, perk: 'grounded' }));
    expect(grounded.sanity).toBe(Math.round(none.sanity * 0.5));
  });

  it('a performance perk rewards its preferred choice', () => {
    const out = makeOutcome({ performance: 10 });
    const none = buildResolvedOutcome('depth-test', 'yes', out, 0, 'builder', ctx({ energy: 80, sanity: 80 }));
    const ship = buildResolvedOutcome('depth-test', 'yes', out, 0, 'builder', ctx({ energy: 80, sanity: 80, perk: 'ship-fast' }));
    expect(ship.performance).toBe(none.performance + 3);
  });

  it('a depletion-resist perk reduces the empty-tank penalty', () => {
    const out = makeOutcome({ performance: 10 });
    const drained = buildResolvedOutcome('depth-test', 'yes', out, 0, 'reliability-pro', ctx({ energy: 8, sanity: 80 }));
    const steady = buildResolvedOutcome('depth-test', 'yes', out, 0, 'reliability-pro', ctx({ energy: 8, sanity: 80, perk: 'steady-hands' }));
    expect(steady.performance).toBeGreaterThan(drained.performance);
  });

  it('an odds perk only helps its preferred choice', () => {
    const yesBase = adjustOutcomeWeights('depth-test', 'yes', lowHigh(), ctx());
    const yesPerk = adjustOutcomeWeights('depth-test', 'yes', lowHigh(), ctx({ perk: 'ship-fast' }));
    // ship-fast has no odds effect, so weights are unchanged.
    expect(yesPerk[1].weight).toBe(yesBase[1].weight);

    const noBase = adjustOutcomeWeights('depth-test', 'no', lowHigh(), ctx());
    const noPerk = adjustOutcomeWeights('depth-test', 'no', lowHigh(), ctx({ perk: 'deep-work' }));
    // deep-work tilts the odds on "no".
    expect(noPerk[1].weight).toBeGreaterThan(noBase[1].weight);
  });
});

describe('PREPARE reducer action', () => {
  const openState = (over: Partial<GameState> = {}): GameState => ({
    ...initialState,
    gameStatus: 'playing',
    showScenarioModal: true,
    activeScenarioId: SCENARIOS[0].id,
    energy: 80,
    prepared: false,
    ...over,
  });

  it('spends energy and marks the scenario prepared', () => {
    const next = gameReducer(openState(), { type: 'PREPARE' });
    expect(next.prepared).toBe(true);
    expect(next.energy).toBe(80 - PREP_ENERGY_COST);
  });

  it('cannot prepare twice', () => {
    const once = gameReducer(openState(), { type: 'PREPARE' });
    const twice = gameReducer(once, { type: 'PREPARE' });
    expect(twice).toBe(once);
  });

  it('cannot prepare into burnout', () => {
    const next = gameReducer(openState({ energy: PREP_ENERGY_COST }), { type: 'PREPARE' });
    expect(next.prepared).toBe(false);
    expect(next.energy).toBe(PREP_ENERGY_COST);
  });

  it('cannot prepare when no scenario is open', () => {
    const closed = openState({ showScenarioModal: false });
    expect(gameReducer(closed, { type: 'PREPARE' })).toBe(closed);
  });

  it('clears prepared after a choice is made', () => {
    const prepared = gameReducer(openState(), { type: 'PREPARE' });
    const outcome = makeOutcome({ performance: 5 });
    const afterChoice = gameReducer(prepared, {
      type: 'MAKE_CHOICE',
      choice: 'yes',
      outcome,
      outcomeIndex: 0,
    });
    expect(afterChoice.prepared).toBe(false);
  });
});

describe('Phase 1: read-the-room factors and risk tags', () => {
  it('surfaces at most two reputation notes, worst news first', () => {
    const factors = getReputationFactors(['derek-pleased', 'derek-grudge', 'low-visibility']);
    expect(factors).toHaveLength(2);
    expect(factors[0].tone).toBe('bad');
    expect(getReputationFactors([])).toEqual([]);
  });

  it('warns only when a stat is actually low, and names which one', () => {
    expect(getDepletionFactor(100, 100)).toBeNull();
    expect(getDepletionFactor(10, 80)?.text).toContain('empty');
    expect(getDepletionFactor(80, 10)?.text).toContain('frazzled');
  });

  it('flags burnout risk only when stats are low enough to be knocked out', () => {
    const safe = ctx({ energy: 100, sanity: 100 });
    const everySafe = SCENARIOS.every(
      (s) =>
        !getChoiceRisk(s, 'yes', 'builder', safe).canBurnout &&
        !getChoiceRisk(s, 'no', 'builder', safe).canBurnout,
    );
    expect(everySafe).toBe(true);

    const fragile = ctx({ energy: 1, sanity: 1 });
    const someDanger = SCENARIOS.some(
      (s) =>
        getChoiceRisk(s, 'yes', 'builder', fragile).canBurnout ||
        getChoiceRisk(s, 'no', 'builder', fragile).canBurnout,
    );
    expect(someDanger).toBe(true);
  });
});
