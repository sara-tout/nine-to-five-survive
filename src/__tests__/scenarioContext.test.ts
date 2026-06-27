import { describe, expect, it } from 'vitest';
import {
  adjustOutcomeWeights,
  buildResolvedOutcome,
  deriveFlags,
  ScenarioContext,
} from '../data/scenarioContext';
import { Outcome } from '../data/scenarios';

function makeOutcome(overrides: Partial<Outcome> = {}): Outcome {
  return {
    narrative: 'base outcome',
    energy: -10,
    sanity: -5,
    performance: 5,
    raiseProgress: 0,
    weight: 50,
    ...overrides,
  };
}

function ctx(overrides: Partial<ScenarioContext> = {}): ScenarioContext {
  return {
    dayModifier: 'reorg-rumors', // narrow effect: ignores most scenarios
    priorChoices: [],
    flags: [],
    ...overrides,
  };
}

describe('deriveFlags', () => {
  it('records Derek grudge vs pleased based on the late-night choice', () => {
    expect(deriveFlags('late-night-task', 'no', 0)).toContain('derek-grudge');
    expect(deriveFlags('late-night-task', 'yes', 0)).toContain('derek-pleased');
  });

  it('skipping the meeting marathon earns deep-work reputation', () => {
    const flags = deriveFlags('meeting-marathon', 'no', 0);
    expect(flags).toEqual(expect.arrayContaining(['deep-work-reputation', 'missed-room-gossip']));
  });

  it('borrowed-vision splits into corrected vs lost', () => {
    expect(deriveFlags('borrowed-vision', 'yes', 0)).toContain('vision-corrected');
    expect(deriveFlags('borrowed-vision', 'no', 0)).toContain('vision-lost');
  });

  it('returns no flags for scenarios without consequences', () => {
    expect(deriveFlags('weather-small-talk', 'yes', 0)).toEqual([]);
  });
});

describe('adjustOutcomeWeights', () => {
  const outcomes = [makeOutcome({ weight: 50 }), makeOutcome({ weight: 50 })];

  it('does not mutate the input outcomes', () => {
    const before = outcomes.map((o) => o.weight);
    adjustOutcomeWeights('demo-day', 'yes', outcomes, ctx({ dayModifier: 'manager-on-edge' }));
    expect(outcomes.map((o) => o.weight)).toEqual(before);
  });

  it('manager-on-edge nudges the safer (first) outcome up', () => {
    const adjusted = adjustOutcomeWeights(
      'demo-day',
      'yes',
      outcomes,
      ctx({ dayModifier: 'manager-on-edge' }),
    );
    expect(adjusted[0].weight).toBe(62);
    expect(adjusted[1].weight).toBe(50);
  });

  it('a Derek grudge worsens the odds on late-night follow-ups', () => {
    const adjusted = adjustOutcomeWeights(
      'demo-day',
      'no',
      outcomes,
      ctx({ flags: ['derek-grudge'] }),
    );
    expect(adjusted[0].weight).toBe(65);
  });

  it('never lets a weight drop below the floor', () => {
    const tiny = [makeOutcome({ weight: 5 }), makeOutcome({ weight: 5 })];
    const adjusted = adjustOutcomeWeights('weather-small-talk', 'yes', tiny, ctx());
    adjusted.forEach((o) => expect(o.weight).toBeGreaterThanOrEqual(5));
  });
});

describe('buildResolvedOutcome', () => {
  it('applies day-modifier stat tweaks (bad sleep drains energy and sanity)', () => {
    const resolved = buildResolvedOutcome(
      'demo-day',
      'yes',
      makeOutcome({ energy: -10, sanity: -6 }),
      0,
      'builder',
      ctx({ dayModifier: 'bad-sleep' }),
    );
    expect(resolved.energy).toBe(-13);
    expect(resolved.sanity).toBe(-9);
  });

  it('attaches a carryover note when a prior flag is relevant', () => {
    const resolved = buildResolvedOutcome(
      'demo-day',
      'yes',
      makeOutcome(),
      0,
      'builder',
      ctx({ flags: ['derek-grudge'] }),
    );
    expect(resolved.contextNote).toBeTruthy();
    expect(resolved.contextNote).toContain('Derek');
  });

  it('leaves stats untouched under a neutral context', () => {
    // manager-on-edge only nudges positive raiseProgress, so with raiseProgress 0 it is a no-op on stats.
    const raw = makeOutcome({ energy: -8, sanity: -4, performance: 6, raiseProgress: 0 });
    const resolved = buildResolvedOutcome(
      'weather-small-talk',
      'yes',
      raw,
      0,
      'builder',
      ctx({ dayModifier: 'manager-on-edge' }),
    );
    expect(resolved.energy).toBe(-8);
    expect(resolved.sanity).toBe(-4);
    expect(resolved.performance).toBe(6);
  });
});
