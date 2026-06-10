import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { SCENARIOS, Scenario, Outcome } from '../data/scenarios';
import { PLAYER_START, isWalkable, getAdjacentInteractable } from '../data/officeMap';

export interface DayResult {
  day: number;
  scenario: Scenario;
  choice: 'yes' | 'no';
  outcome: Outcome;
}

export interface GameState {
  energy: number;
  sanity: number;
  performance: number;
  raiseProgress: number;
  currentDay: number;
  scenarioOrder: number[];
  currentOutcome: Outcome | null;
  currentChoice: 'yes' | 'no' | null;
  dayResults: DayResult[];
  gameStatus: 'menu' | 'playing' | 'outcome' | 'dayEnd' | 'burnout' | 'win';
  playerPos: { x: number; y: number };
  playerEmoji: string;
  showScenarioModal: boolean;
  showOutcomeModal: boolean;
  activeScenarioId: string | null;
  nearInteractable: boolean;
}

type Action =
  | { type: 'SELECT_CHARACTER'; emoji: string }
  | { type: 'START_GAME' }
  | { type: 'MOVE_PLAYER'; dx: number; dy: number }
  | { type: 'INTERACT' }
  | { type: 'MAKE_CHOICE'; choice: 'yes' | 'no'; outcome: Outcome }
  | { type: 'CLOSE_OUTCOME' }
  | { type: 'NEXT_DAY' }
  | { type: 'RESET' };

const MAX_STAT = 100;
const MIN_STAT = 0;
const RAISE_THRESHOLD = 50;
const TOTAL_DAYS = 5;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const initialState: GameState = {
  energy: 80,
  sanity: 80,
  performance: 50,
  raiseProgress: 0,
  currentDay: 0,
  scenarioOrder: [],
  currentOutcome: null,
  currentChoice: null,
  dayResults: [],
  gameStatus: 'menu',
  playerPos: PLAYER_START,
  playerEmoji: '🧑‍💻',
  showScenarioModal: false,
  showOutcomeModal: false,
  activeScenarioId: null,
  nearInteractable: false,
};

function getActiveScenarioId(scenarioOrder: number[], day: number): string | null {
  if (day < 1 || day > TOTAL_DAYS || scenarioOrder.length === 0) return null;
  const idx = scenarioOrder[day - 1];
  return SCENARIOS[idx]?.id ?? null;
}

function checkNearInteractable(px: number, py: number, activeId: string | null): boolean {
  return getAdjacentInteractable(px, py, activeId) !== null;
}

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SELECT_CHARACTER': {
      return { ...state, playerEmoji: action.emoji };
    }
    case 'START_GAME': {
      const order = shuffle(SCENARIOS.map((_, i) => i));
      const activeId = getActiveScenarioId(order, 1);
      return {
        ...initialState,
        playerEmoji: state.playerEmoji,
        scenarioOrder: order,
        gameStatus: 'playing',
        currentDay: 1,
        playerPos: PLAYER_START,
        activeScenarioId: activeId,
        nearInteractable: checkNearInteractable(PLAYER_START.x, PLAYER_START.y, activeId),
      };
    }
    case 'MOVE_PLAYER': {
      if (state.showScenarioModal || state.showOutcomeModal) return state;
      const nx = state.playerPos.x + action.dx;
      const ny = state.playerPos.y + action.dy;
      if (!isWalkable(nx, ny)) return state;
      const newPos = { x: nx, y: ny };
      return {
        ...state,
        playerPos: newPos,
        nearInteractable: checkNearInteractable(nx, ny, state.activeScenarioId),
      };
    }
    case 'INTERACT': {
      if (state.showScenarioModal || state.showOutcomeModal) return state;
      const adj = getAdjacentInteractable(state.playerPos.x, state.playerPos.y, state.activeScenarioId);
      if (!adj) return state;
      return { ...state, showScenarioModal: true };
    }
    case 'MAKE_CHOICE': {
      const { choice, outcome } = action;
      const newEnergy = clamp(state.energy + outcome.energy, MIN_STAT, MAX_STAT);
      const newSanity = clamp(state.sanity + outcome.sanity, MIN_STAT, MAX_STAT);
      const newPerformance = clamp(state.performance + outcome.performance, MIN_STAT, MAX_STAT);
      const newRaise = clamp(state.raiseProgress + outcome.raiseProgress, MIN_STAT, MAX_STAT);

      const scenario = SCENARIOS.find((s) => s.id === state.activeScenarioId)!;
      const dayResult: DayResult = { day: state.currentDay, scenario, choice, outcome };
      const isBurnout = newEnergy <= 0 || newSanity <= 0;

      return {
        ...state,
        energy: newEnergy,
        sanity: newSanity,
        performance: newPerformance,
        raiseProgress: newRaise,
        currentOutcome: outcome,
        currentChoice: choice,
        dayResults: [...state.dayResults, dayResult],
        showScenarioModal: false,
        showOutcomeModal: true,
        gameStatus: isBurnout ? 'burnout' : state.gameStatus,
      };
    }
    case 'CLOSE_OUTCOME': {
      return {
        ...state,
        showOutcomeModal: false,
        gameStatus: 'dayEnd',
      };
    }
    case 'NEXT_DAY': {
      const nextDay = state.currentDay + 1;
      if (nextDay > TOTAL_DAYS) {
        return {
          ...state,
          gameStatus: state.raiseProgress >= RAISE_THRESHOLD ? 'win' : 'burnout',
        };
      }
      const activeId = getActiveScenarioId(state.scenarioOrder, nextDay);
      return {
        ...state,
        currentDay: nextDay,
        currentOutcome: null,
        currentChoice: null,
        gameStatus: 'playing',
        playerPos: PLAYER_START,
        activeScenarioId: activeId,
        showScenarioModal: false,
        showOutcomeModal: false,
        nearInteractable: checkNearInteractable(PLAYER_START.x, PLAYER_START.y, activeId),
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<Action>;
  currentScenario: Scenario | null;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const currentScenario = state.activeScenarioId
    ? SCENARIOS.find((s) => s.id === state.activeScenarioId) ?? null
    : null;

  return (
    <GameContext.Provider value={{ state, dispatch, currentScenario }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

export { TOTAL_DAYS, RAISE_THRESHOLD };
