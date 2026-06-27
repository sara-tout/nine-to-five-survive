import { describe, expect, it } from 'vitest';
import {
  gameReducer,
  initialState,
  GameState,
  Action,
} from '../context/GameContext';
import { Outcome, SCENARIOS } from '../data/scenarios';
import { RAISE_THRESHOLD, STARTING_PERFORMANCE, TOTAL_DAYS } from '../constants/gameRules';

function makeOutcome(overrides: Partial<Outcome> = {}): Outcome {
  return {
    narrative: 'test outcome',
    energy: 0,
    sanity: 0,
    performance: 0,
    raiseProgress: 0,
    weight: 50,
    ...overrides,
  };
}

function startedState(overrides: Partial<GameState> = {}): GameState {
  const scenarioOrder = Array.from({ length: TOTAL_DAYS }, (_, i) => i);
  const started = gameReducer(initialState, {
    type: 'START_GAME',
    scenarioOrder,
    dayModifierOrder: Array(TOTAL_DAYS).fill('manager-on-edge'),
    scenarioCycleReset: false,
    moodCycleReset: false,
  });
  return { ...started, ...overrides };
}

describe('gameReducer: lifecycle', () => {
  it('starts in the menu', () => {
    expect(initialState.gameStatus).toBe('menu');
    expect(initialState.currentDay).toBe(0);
  });

  it('SELECT_CHARACTER updates role and emoji without starting', () => {
    const next = gameReducer(initialState, {
      type: 'SELECT_CHARACTER',
      role: 'mentor',
      emoji: '🧑‍🏫',
    });
    expect(next.playerRole).toBe('mentor');
    expect(next.playerEmoji).toBe('🧑‍🏫');
    expect(next.gameStatus).toBe('menu');
  });

  it('START_GAME begins on day 1 and preserves the selected role', () => {
    const picked = gameReducer(initialState, {
      type: 'SELECT_CHARACTER',
      role: 'professor',
      emoji: '👨‍🏫',
    });
    const started = gameReducer(picked, {
      type: 'START_GAME',
      scenarioOrder: [0, 1, 2, 3, 4],
      dayModifierOrder: Array(TOTAL_DAYS).fill('manager-on-edge'),
      scenarioCycleReset: false,
      moodCycleReset: false,
    });
    expect(started.gameStatus).toBe('playing');
    expect(started.currentDay).toBe(1);
    expect(started.playerRole).toBe('professor');
    expect(started.activeScenarioId).toBe(SCENARIOS[0].id);
    expect(started.performance).toBe(STARTING_PERFORMANCE);
  });

  it('RESET returns to the initial state', () => {
    const dirty = startedState({ performance: 99, gameStatus: 'win' });
    expect(gameReducer(dirty, { type: 'RESET' })).toEqual(initialState);
  });
});

describe('gameReducer: MAKE_CHOICE', () => {
  it('applies stat deltas and folds raiseProgress into performance', () => {
    const state = startedState({ activeScenarioId: SCENARIOS[0].id });
    const next = gameReducer(state, {
      type: 'MAKE_CHOICE',
      choice: 'yes',
      outcome: makeOutcome({ energy: -10, sanity: -5, performance: 8, raiseProgress: 2 }),
      outcomeIndex: 0,
    });
    expect(next.energy).toBe(state.energy - 10);
    expect(next.sanity).toBe(state.sanity - 5);
    expect(next.performance).toBe(state.performance + 8 + 2);
    expect(next.dayResults).toHaveLength(1);
    expect(next.showOutcomeModal).toBe(true);
    expect(next.showScenarioModal).toBe(false);
  });

  it('clamps stats to the 0-100 range', () => {
    const state = startedState({ activeScenarioId: SCENARIOS[0].id, performance: 98 });
    const next = gameReducer(state, {
      type: 'MAKE_CHOICE',
      choice: 'yes',
      outcome: makeOutcome({ performance: 50, raiseProgress: 50 }),
      outcomeIndex: 0,
    });
    expect(next.performance).toBe(100);
  });

  it('triggers stat-burnout when energy hits zero', () => {
    const state = startedState({ activeScenarioId: SCENARIOS[0].id, energy: 5 });
    const next = gameReducer(state, {
      type: 'MAKE_CHOICE',
      choice: 'no',
      outcome: makeOutcome({ energy: -20 }),
      outcomeIndex: 0,
    });
    expect(next.energy).toBe(0);
    expect(next.gameStatus).toBe('stat-burnout');
  });

  it('derives and accumulates flags from the choice', () => {
    const state = startedState({ activeScenarioId: 'late-night-task' });
    const next = gameReducer(state, {
      type: 'MAKE_CHOICE',
      choice: 'no',
      outcome: makeOutcome(),
      outcomeIndex: 0,
    });
    expect(next.flags).toContain('derek-grudge');
  });

  it('is a no-op when the active scenario is unknown', () => {
    const state = startedState({ activeScenarioId: 'does-not-exist' });
    const next = gameReducer(state, {
      type: 'MAKE_CHOICE',
      choice: 'yes',
      outcome: makeOutcome({ performance: 10 }),
      outcomeIndex: 0,
    });
    expect(next).toBe(state);
  });
});

describe('gameReducer: day progression', () => {
  it('CLOSE_OUTCOME moves to the day-end summary', () => {
    const state = startedState({ showOutcomeModal: true });
    const next = gameReducer(state, { type: 'CLOSE_OUTCOME' });
    expect(next.showOutcomeModal).toBe(false);
    expect(next.gameStatus).toBe('dayEnd');
  });

  it('NEXT_DAY advances the day and resumes playing', () => {
    const state = startedState({ currentDay: 2, gameStatus: 'dayEnd' });
    const next = gameReducer(state, { type: 'NEXT_DAY' });
    expect(next.currentDay).toBe(3);
    expect(next.gameStatus).toBe('playing');
    expect(next.activeScenarioId).toBe(SCENARIOS[state.scenarioOrder[2]].id);
  });

  it('NEXT_DAY past the final day wins when performance clears the threshold', () => {
    const state = startedState({ currentDay: TOTAL_DAYS, performance: RAISE_THRESHOLD });
    const next = gameReducer(state, { type: 'NEXT_DAY' });
    expect(next.gameStatus).toBe('win');
  });

  it('NEXT_DAY past the final day misses the raise below the threshold', () => {
    const state = startedState({ currentDay: TOTAL_DAYS, performance: RAISE_THRESHOLD - 1 });
    const next = gameReducer(state, { type: 'NEXT_DAY' });
    expect(next.gameStatus).toBe('missed-raise');
  });
});

describe('gameReducer: FINISH_RUN', () => {
  it('wins at or above the raise threshold', () => {
    const state = startedState({ performance: RAISE_THRESHOLD + 5, gameStatus: 'dayEnd' });
    expect(gameReducer(state, { type: 'FINISH_RUN' }).gameStatus).toBe('win');
  });

  it('misses the raise below the threshold', () => {
    const state = startedState({ performance: RAISE_THRESHOLD - 5, gameStatus: 'dayEnd' });
    expect(gameReducer(state, { type: 'FINISH_RUN' }).gameStatus).toBe('missed-raise');
  });

  it('does not overwrite a burnout loss', () => {
    const state = startedState({ performance: 100, gameStatus: 'stat-burnout' });
    expect(gameReducer(state, { type: 'FINISH_RUN' }).gameStatus).toBe('stat-burnout');
  });
});
