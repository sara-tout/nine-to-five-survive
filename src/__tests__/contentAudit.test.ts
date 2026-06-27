import { describe, expect, it } from 'vitest';
import { SCENARIOS, Outcome } from '../data/scenarios';
import { DAY_MODIFIERS, MOOD_SCENARIO_EFFECTS } from '../data/dayModifiers';
import { CHARACTERS } from '../data/characters';
import { getScenarioDescription, resolveOutcomeNarrative, getScenarioChoiceLabels } from '../data/scenarioText';
import { getOutcomeTone } from '../utils/outcomeTone';
import { findGrammarIssues } from '../utils/grammarLint';
import { RAISE_THRESHOLD, STARTING_PERFORMANCE, TOTAL_DAYS } from '../context/GameContext';

const ROLES = CHARACTERS.map((c) => c.role);

function allPlayerFacingText(): string[] {
  const texts: string[] = [];
  for (const scenario of SCENARIOS) {
    texts.push(
      scenario.title,
      scenario.description,
      scenario.yesLabel,
      scenario.noLabel,
      scenario.locationLabel,
      scenario.time,
    );
    for (const outcome of [...scenario.yesOutcomes, ...scenario.noOutcomes]) {
      texts.push(outcome.narrative);
    }
    for (const role of ROLES) {
      texts.push(getScenarioDescription(scenario, role));
      texts.push(getScenarioChoiceLabels(scenario, role).yes);
      texts.push(getScenarioChoiceLabels(scenario, role).no);
      scenario.yesOutcomes.forEach((outcome, index) => {
        texts.push(resolveOutcomeNarrative(scenario.id, 'yes', index, role, outcome.narrative));
      });
      scenario.noOutcomes.forEach((outcome, index) => {
        texts.push(resolveOutcomeNarrative(scenario.id, 'no', index, role, outcome.narrative));
      });
    }
  }
  for (const modifier of DAY_MODIFIERS) {
    texts.push(modifier.label, modifier.description);
  }
  return texts.filter((text) => text.trim().length > 0);
}

const SCENARIO_IDS = new Set(SCENARIOS.map((s) => s.id));

function allOutcomes(): { scenarioId: string; choice: 'yes' | 'no'; index: number; outcome: Outcome }[] {
  const rows: { scenarioId: string; choice: 'yes' | 'no'; index: number; outcome: Outcome }[] = [];
  for (const scenario of SCENARIOS) {
    scenario.yesOutcomes.forEach((outcome, index) => {
      rows.push({ scenarioId: scenario.id, choice: 'yes', index, outcome });
    });
    scenario.noOutcomes.forEach((outcome, index) => {
      rows.push({ scenarioId: scenario.id, choice: 'no', index, outcome });
    });
  }
  return rows;
}

function applyOutcome(
  stats: { energy: number; sanity: number; performance: number; raise: number },
  outcome: Outcome,
) {
  return {
    energy: Math.max(0, Math.min(100, stats.energy + outcome.energy)),
    sanity: Math.max(0, Math.min(100, stats.sanity + outcome.sanity)),
    performance: Math.max(0, Math.min(100, stats.performance + outcome.performance)),
    raise: stats.raise + outcome.raiseProgress,
  };
}

/** Performance gain per outcome; raise points fold into performance in-game. */
function perfGain(o: Outcome): number {
  return o.performance + o.raiseProgress;
}

function bestRaiseOutcome(scenarioId: string): Outcome {
  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const pool = [...scenario.yesOutcomes, ...scenario.noOutcomes];
  return pool.reduce((best, o) => (perfGain(o) > perfGain(best) ? o : best));
}

function worstPersonalOutcome(scenarioId: string): Outcome {
  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const pool = [...scenario.yesOutcomes, ...scenario.noOutcomes];
  return pool.reduce((worst, o) => {
    const cost = o.energy + o.sanity;
    const worstCost = worst.energy + worst.sanity;
    return cost < worstCost ? o : worst;
  });
}

describe('content integrity', () => {
  it('has unique scenario ids', () => {
    expect(SCENARIO_IDS.size).toBe(SCENARIOS.length);
  });

  it('has unique day modifier ids aligned with effects map', () => {
    const ids = DAY_MODIFIERS.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(MOOD_SCENARIO_EFFECTS[id]).toBeDefined();
      expect(DAY_MODIFIERS.find((m) => m.id === id)?.label).toBeTruthy();
    }
  });

  it('only references real scenarios in mood effects', () => {
    for (const effect of Object.values(MOOD_SCENARIO_EFFECTS)) {
      if (effect.scenarios === 'all') continue;
      for (const scenarioId of effect.scenarios) {
        expect(SCENARIO_IDS.has(scenarioId), `invalid scenario ref: ${scenarioId}`).toBe(true);
      }
    }
  });

  it('provides role-specific scenario text for every scenario and role', () => {
    for (const scenario of SCENARIOS) {
      for (const role of ROLES) {
        const text = getScenarioDescription(scenario, role);
        expect(text.length).toBeGreaterThan(20);
        expect(text).not.toBe('');
      }
    }
  });

  it('differentiates at least builder and professor copy for each scenario', () => {
    for (const scenario of SCENARIOS) {
      const builder = getScenarioDescription(scenario, 'builder');
      const professor = getScenarioDescription(scenario, 'professor');
      expect(builder).not.toBe(professor);
    }
  });

  it('provides role-specific choice labels for every scenario and role', () => {
    for (const scenario of SCENARIOS) {
      for (const role of ROLES) {
        const labels = getScenarioChoiceLabels(scenario, role);
        expect(labels.yes.length).toBeGreaterThan(2);
        expect(labels.no.length).toBeGreaterThan(2);
        expect(labels.yes.length).toBeLessThanOrEqual(35);
        expect(labels.no.length).toBeLessThanOrEqual(35);
      }
    }
  });

  it('differentiates builder and professor choice labels for each scenario', () => {
    for (const scenario of SCENARIOS) {
      const builder = getScenarioChoiceLabels(scenario, 'builder');
      const professor = getScenarioChoiceLabels(scenario, 'professor');
      const distinct =
        builder.yes !== professor.yes || builder.no !== professor.no;
      expect(distinct, `scenario ${scenario.id}`).toBe(true);
    }
  });

  it('differentiates builder and professor outcome narratives per scenario', () => {
    for (const scenario of SCENARIOS) {
      const rows = allOutcomes().filter((row) => row.scenarioId === scenario.id);
      const hasDistinctPair = rows.some(({ scenarioId, choice, index, outcome }) => {
        const builder = resolveOutcomeNarrative(scenarioId, choice, index, 'builder', outcome.narrative);
        const professor = resolveOutcomeNarrative(scenarioId, choice, index, 'professor', outcome.narrative);
        return builder !== professor;
      });
      expect(hasDistinctPair, `scenario ${scenario.id} lacks role-specific outcomes`).toBe(true);
    }
  });

  it('aligns late-night outcomes with role setup hooks', () => {
    const scenario = SCENARIOS.find((s) => s.id === 'late-night-task')!;
    for (const role of ROLES) {
      const setup = getScenarioDescription(scenario, role);
      expect(setup.toLowerCase()).not.toMatch(/north-star deliverable/);
    }

    const mentorAnxious = resolveOutcomeNarrative(
      'late-night-task',
      'no',
      1,
      'mentor',
      scenario.noOutcomes[1].narrative,
    );
    expect(mentorAnxious.toLowerCase()).toMatch(/family/);
    expect(mentorAnxious.toLowerCase()).not.toMatch(/gym|workout|gains/);

    const mentorStay = resolveOutcomeNarrative(
      'late-night-task',
      'yes',
      0,
      'mentor',
      scenario.yesOutcomes[0].narrative,
    );
    expect(mentorStay.toLowerCase()).toMatch(/family/);

    const productDinner = resolveOutcomeNarrative(
      'late-night-task',
      'yes',
      0,
      'product-partner',
      scenario.yesOutcomes[0].narrative,
    );
    expect(productDinner.toLowerCase()).toMatch(/dinner|reservation/);
    expect(productDinner.toLowerCase()).not.toMatch(/gym membership/);

    const professorBadStay = resolveOutcomeNarrative(
      'late-night-task',
      'yes',
      0,
      'professor',
      scenario.yesOutcomes[0].narrative,
    );
    const professorGoodStay = resolveOutcomeNarrative(
      'late-night-task',
      'yes',
      1,
      'professor',
      scenario.yesOutcomes[1].narrative,
    );
    expect(professorBadStay.toLowerCase()).toMatch(/chess game|never happened/);
    expect(professorGoodStay.toLowerCase()).toMatch(/forecast lady|all-hands/);
    expect(professorGoodStay.toLowerCase()).not.toMatch(/never happened/);

    const professorGoodLeave = resolveOutcomeNarrative(
      'late-night-task',
      'no',
      0,
      'professor',
      scenario.noOutcomes[0].narrative,
    );
    const professorBadLeave = resolveOutcomeNarrative(
      'late-night-task',
      'no',
      1,
      'professor',
      scenario.noOutcomes[1].narrative,
    );
    expect(professorGoodLeave.toLowerCase()).toMatch(/reviewed the chess game|lemma/);
    expect(professorBadLeave.toLowerCase()).toMatch(/mind stayed at the office|focus: zero/);
  });

  it('aligns meeting-marathon decline with the 7th-meeting choice', () => {
    const scenario = SCENARIOS.find((s) => s.id === 'meeting-marathon')!;
    for (const role of ROLES) {
      const setup = getScenarioDescription(scenario, role);
      expect(setup.toLowerCase()).toMatch(/align on alignment/);
      expect(setup.toLowerCase()).toMatch(/7th/);

      const goodDecline = resolveOutcomeNarrative(
        'meeting-marathon',
        'no',
        0,
        role,
        scenario.noOutcomes[0].narrative,
      );
      const badDecline = resolveOutcomeNarrative(
        'meeting-marathon',
        'no',
        1,
        role,
        scenario.noOutcomes[1].narrative,
      );
      expect(goodDecline.toLowerCase()).toMatch(/declined the 7th sync/);
      expect(goodDecline.toLowerCase()).toMatch(/six meetings still happened/);
      expect(badDecline.toLowerCase()).toMatch(/declined the 7th sync/);
      expect(badDecline.toLowerCase()).toMatch(/synergy ops/);
    }

    const builderGoodStay = resolveOutcomeNarrative(
      'meeting-marathon',
      'yes',
      1,
      'builder',
      scenario.yesOutcomes[1].narrative,
    );
    const builderBadStay = resolveOutcomeNarrative(
      'meeting-marathon',
      'yes',
      0,
      'builder',
      scenario.yesOutcomes[0].narrative,
    );
    expect(builderGoodStay.toLowerCase()).toMatch(/that one landed|good point/);
    expect(builderGoodStay.toLowerCase()).not.toMatch(/still useless/);
    expect(builderBadStay.toLowerCase()).toMatch(/accepted the 7th sync/);
  });

  it('aligns lunch-steal decline paths with role setup hooks', () => {
    const scenario = SCENARIOS.find((s) => s.id === 'lunch-steal')!;
    const productSeethe = resolveOutcomeNarrative(
      'lunch-steal',
      'no',
      0,
      'product-partner',
      scenario.noOutcomes[0].narrative,
    );
    const truthSeethe = resolveOutcomeNarrative(
      'lunch-steal',
      'no',
      0,
      'truth-finder',
      scenario.noOutcomes[0].narrative,
    );
    const productWalk = resolveOutcomeNarrative(
      'lunch-steal',
      'no',
      1,
      'product-partner',
      scenario.noOutcomes[1].narrative,
    );
    expect(productSeethe.toLowerCase()).toMatch(/roadmap review|todo/);
    expect(truthSeethe.toLowerCase()).toMatch(/numbers|cost/);
    expect(productWalk.toLowerCase()).toMatch(/roadmap review/);
    expect(productSeethe.toLowerCase()).not.toMatch(/linkedin/);
  });

  it('skews lunch-steal performance by choice direction', () => {
    const scenario = SCENARIOS.find((s) => s.id === 'lunch-steal')!;
    const yesPerf = scenario.yesOutcomes.reduce(
      (sum, o) => sum + (o.performance * o.weight) / scenario.yesOutcomes.reduce((w, x) => w + x.weight, 0),
      0,
    );
    const noPerf = scenario.noOutcomes.reduce(
      (sum, o) => sum + (o.performance * o.weight) / scenario.noOutcomes.reduce((w, x) => w + x.weight, 0),
      0,
    );
    expect(yesPerf).toBeGreaterThan(0);
    expect(noPerf).toBeLessThan(0);
  });

  it('skews yes/no performance in opposite directions for work scenarios', () => {
    const exceptions = new Set(['oma-marga-call']);
    function weightedPerf(outcomes: Outcome[]): number {
      const total = outcomes.reduce((w, o) => w + o.weight, 0);
      return outcomes.reduce((sum, o) => sum + (o.performance * o.weight) / total, 0);
    }
    for (const scenario of SCENARIOS) {
      if (exceptions.has(scenario.id)) continue;
      const yesPerf = weightedPerf(scenario.yesOutcomes);
      const noPerf = weightedPerf(scenario.noOutcomes);
      expect(
        Math.sign(yesPerf) !== Math.sign(noPerf) && yesPerf !== 0 && noPerf !== 0,
        `${scenario.id}: yes EV ${yesPerf.toFixed(1)}, no EV ${noPerf.toFixed(1)}`,
      ).toBe(true);
    }
  });

  it('gives the best roll in each branch a clear career win', () => {
    /** Branches where every roll is intentionally a loss (e.g. self-sacrifice choices). */
    const allLossBranches = new Set<string>([]);
    const hiddenVisibilityBranches = new Set([
      'all-hands-question:no',
      'townhall-question:no',
      'unmuted-chaos:no',
    ]);
    function career(o: Outcome) {
      return o.performance + o.raiseProgress;
    }
    function branchKey(scenarioId: string, choice: 'yes' | 'no') {
      return `${scenarioId}:${choice}`;
    }
    for (const scenario of SCENARIOS) {
      if (scenario.id === 'oma-marga-call') continue;
      for (const [choice, outcomes] of [
        ['yes', scenario.yesOutcomes],
        ['no', scenario.noOutcomes],
      ] as const) {
        const key = branchKey(scenario.id, choice);
        if (hiddenVisibilityBranches.has(key) || allLossBranches.has(key)) continue;
        const best = outcomes.reduce((a, b) => (career(a) >= career(b) ? a : b));
        expect(
          career(best),
          `${scenario.id} ${choice} best roll career=${career(best)}: "${best.narrative.slice(0, 80)}..."`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it('aligns pto-guilt and reorg-rumor outcomes with role setup', () => {
    const pto = SCENARIOS.find((s) => s.id === 'pto-guilt')!;
    const mentorPto = resolveOutcomeNarrative('pto-guilt', 'no', 0, 'mentor', pto.noOutcomes[0].narrative);
    expect(mentorPto.toLowerCase()).toMatch(/family|friday/);
    expect(mentorPto.toLowerCase()).not.toMatch(/reading a book/);

    const reorg = SCENARIOS.find((s) => s.id === 'reorg-rumor')!;
    const builderReorg = resolveOutcomeNarrative('reorg-rumor', 'yes', 0, 'builder', reorg.yesOutcomes[0].narrative);
    expect(builderReorg.toLowerCase()).toMatch(/alignment|manager|chat/);
    expect(builderReorg.toLowerCase()).not.toMatch(/coffee machine/);
  });

  it('aligns town hall outcomes with the question in setup', () => {
    const scenario = SCENARIOS.find((s) => s.id === 'townhall-question')!;
    for (const choice of ['yes', 'no'] as const) {
      const outcomes = choice === 'yes' ? scenario.yesOutcomes : scenario.noOutcomes;
      outcomes.forEach((outcome, index) => {
        const narrative = resolveOutcomeNarrative(
          'townhall-question',
          choice,
          index,
          'truth-finder',
          outcome.narrative,
        );
        expect(narrative.toLowerCase()).toMatch(/data/);
        expect(narrative.toLowerCase()).not.toMatch(/reorg/);
      });
    }
  });

  it('aligns all-hands outcomes with voluntary speak-up setup', () => {
    const scenario = SCENARIOS.find((s) => s.id === 'all-hands-question')!;
    expect(scenario.description.toLowerCase()).toMatch(/ceo opens the floor/);
    expect(scenario.description.toLowerCase()).not.toMatch(/were not listening/);
    const mentorNo = resolveOutcomeNarrative(
      'all-hands-question',
      'no',
      0,
      'mentor',
      scenario.noOutcomes[0].narrative,
    );
    expect(mentorNo.toLowerCase()).toMatch(/camera-off|team/);
    expect(mentorNo.toLowerCase()).not.toMatch(/deflect|were not listening/);
  });

  it('aligns peer-callout outcomes with the flagged artifact per role', () => {
    const scenario = SCENARIOS.find((s) => s.id === 'peer-callout')!;
    const hooks: Record<string, RegExp> = {
      builder: /bug/,
      'fast-learner': /onboarding doc|doc/,
      'truth-finder': /numbers|discrepanc/,
      'reliability-pro': /deploy|runbook/,
      mentor: /team/,
      professor: /assumption|derivation/,
    };
    for (const [role, pattern] of Object.entries(hooks)) {
      for (const choice of ['yes', 'no'] as const) {
        const outcomes = choice === 'yes' ? scenario.yesOutcomes : scenario.noOutcomes;
        outcomes.forEach((outcome, index) => {
          const narrative = resolveOutcomeNarrative(
            'peer-callout',
            choice,
            index,
            role as (typeof ROLES)[number],
            outcome.narrative,
          );
          expect(
            pattern.test(narrative.toLowerCase()),
            `peer-callout ${choice}:${index} for ${role} dropped its hook: "${narrative.slice(0, 100)}"`,
          ).toBe(true);
        });
      }
    }
  });

  it('avoids common grammar and spelling mistakes in player-facing copy', () => {
    for (const text of allPlayerFacingText()) {
      const issues = findGrammarIssues(text);
      expect(issues, `${issues.join('; ')} in "${text.slice(0, 120)}..."`).toEqual([]);
    }
  });

  it('produces no broken English from role flavor substitutions', () => {
    // Catches the failure modes of the substring-swap flavor layer:
    // duplicated words, double articles, and capitalized verbs spliced mid-sentence.
    const duplicateWord = /\b(\w+) \1\b/i;
    const doubleArticle = /\b(the|a|an) (the|a|an)\b/i;
    const splicedCapital = /[a-z,] (You|He|She|They|Drop|Answer|Add|Escalate|Quick|Reply|Push|Stay|Present|Pitch) [a-z]/;
    const allowedDuplicates = new Set(['friday is still friday', 'had had']);

    for (const scenario of SCENARIOS) {
      for (const role of ROLES) {
        const rows: { choice: 'yes' | 'no'; index: number; outcome: Outcome }[] = [
          ...scenario.yesOutcomes.map((outcome, index) => ({ choice: 'yes' as const, index, outcome })),
          ...scenario.noOutcomes.map((outcome, index) => ({ choice: 'no' as const, index, outcome })),
        ];
        for (const { choice, index, outcome } of rows) {
          const text = resolveOutcomeNarrative(scenario.id, choice, index, role, outcome.narrative);
          const dup = text.match(duplicateWord);
          if (dup && !allowedDuplicates.has(dup[0].toLowerCase())) {
            expect.fail(`duplicated word "${dup[0]}" in ${scenario.id} ${choice}:${index} (${role}): "${text}"`);
          }
          const art = text.match(doubleArticle);
          if (art) {
            expect.fail(`double article "${art[0]}" in ${scenario.id} ${choice}:${index} (${role}): "${text}"`);
          }
          const splice = text.match(splicedCapital);
          if (splice) {
            expect.fail(`spliced capital "${splice[0]}" in ${scenario.id} ${choice}:${index} (${role}): "${text}"`);
          }
          expect(text.includes('  '), `double space in ${scenario.id} ${choice}:${index} (${role})`).toBe(false);
        }
      }
    }
  });
});

describe('outcome tone alignment', () => {
  it('does not label clearly negative totals as good or great', () => {
    for (const { outcome } of allOutcomes()) {
      const total = outcome.energy + outcome.sanity + outcome.performance + outcome.raiseProgress;
      const tone = getOutcomeTone(outcome);
      if (total <= -10) {
        expect(['bad', 'mixed']).toContain(tone.tone);
      }
    }
  });

  it('labels strong net wins as good or great', () => {
    for (const { outcome } of allOutcomes()) {
      const total = outcome.energy + outcome.sanity + outcome.performance + outcome.raiseProgress;
      const personal = outcome.energy + outcome.sanity;
      const tone = getOutcomeTone(outcome);
      if (total >= 12 && personal >= -5) {
        expect(['good', 'great']).toContain(tone.tone);
      }
    }
  });
});

describe('win / lose balance', () => {
  it('allows a skilled 5-day run to reach the raise threshold', () => {
    const topScenarios = [...SCENARIOS]
      .map((s) => ({ id: s.id, best: perfGain(bestRaiseOutcome(s.id)) }))
      .sort((a, b) => b.best - a.best)
      .slice(0, TOTAL_DAYS);

    const totalGain = topScenarios.reduce((sum, s) => sum + s.best, 0);
    expect(STARTING_PERFORMANCE + totalGain).toBeGreaterThanOrEqual(RAISE_THRESHOLD);
  });

  it('allows burnout within 5 days with brutal choices', () => {
    let energy = 80;
    let sanity = 80;
    const brutal = [...SCENARIOS]
      .map((s) => worstPersonalOutcome(s.id))
      .sort((a, b) => a.energy + a.sanity - (b.energy + b.sanity))
      .slice(0, 3);

    for (const outcome of brutal) {
      const next = applyOutcome({ energy, sanity, performance: 50, raise: 0 }, outcome);
      energy = next.energy;
      sanity = next.sanity;
    }
    expect(energy <= 0 || sanity <= 0).toBe(true);
  });

  it('allows missing the raise while surviving all 5 days', () => {
    const lowRaiseScenarios = [...SCENARIOS]
      .map((s) => {
        const pool = [...s.yesOutcomes, ...s.noOutcomes];
        const min = pool.reduce((m, o) => (perfGain(o) < perfGain(m) ? o : m));
        return min;
      })
      .sort((a, b) => perfGain(a) - perfGain(b))
      .slice(0, TOTAL_DAYS);

    const total = lowRaiseScenarios.reduce((sum, o) => sum + perfGain(o), 0);
    expect(STARTING_PERFORMANCE + total).toBeLessThan(RAISE_THRESHOLD);
  });
});
