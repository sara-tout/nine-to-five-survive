import React, { createContext, useCallback, useContext, useReducer, ReactNode } from 'react';
import { CharacterRole } from '../data/characters';
import { DayModifierId, pickDayModifierOrder } from '../data/dayModifiers';
import { GameFlag, deriveFlags } from '../data/scenarioContext';
import { SCENARIOS, Scenario, Outcome, pickScenarioOrder } from '../data/scenarios';
import { PLAYER_START, isWalkable, getAdjacentInteractable } from '../data/officeMap';
import { EmployeeReward } from '../data/employeeRewards';
import {
  countUnplayedMoods,
  countUnplayedScenarios,
  loadPlayerHistory,
  recordPlayedRun,
  PlayerHistory,
} from '../storage/playerHistory';
import { clearPendingCelebration, loadStreakData, recordDailyStreak, StreakData } from '../storage/streakStorage';
import {
  loadPlayerProfile,
  PlayerProfile,
  savePlayerProfile,
  validateUsername,
} from '../storage/playerProfile';
import { isUsernameAvailable, upsertPlayerScore } from '../services/supabase';
import { getStandTileForLocation } from '../utils/officeNavigation';
import { calculateRunGrade } from '../utils/runGrade';
import { calculateRunScore } from '../utils/runScore';
import { RAISE_THRESHOLD, STARTING_PERFORMANCE, TOTAL_DAYS } from '../constants/gameRules';

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
  currentDay: number;
  scenarioOrder: number[];
  dayModifierOrder: DayModifierId[];
  scenarioCycleReset: boolean;
  moodCycleReset: boolean;
  currentOutcome: Outcome | null;
  currentChoice: 'yes' | 'no' | null;
  dayResults: DayResult[];
  gameStatus: 'menu' | 'playing' | 'outcome' | 'dayEnd' | 'stat-burnout' | 'missed-raise' | 'win';
  playerPos: { x: number; y: number };
  playerRole: CharacterRole;
  playerEmoji: string;
  showScenarioModal: boolean;
  showOutcomeModal: boolean;
  activeScenarioId: string | null;
  nearInteractable: boolean;
  dayModifier: DayModifierId;
  flags: GameFlag[];
}

type Action =
  | { type: 'SELECT_CHARACTER'; role: CharacterRole; emoji: string }
  | {
      type: 'START_GAME';
      scenarioOrder: number[];
      dayModifierOrder: DayModifierId[];
      scenarioCycleReset: boolean;
      moodCycleReset: boolean;
    }
  | { type: 'MOVE_PLAYER'; dx: number; dy: number }
  | { type: 'INTERACT' }
  | { type: 'TELEPORT_TO_SCENARIO' }
  | { type: 'MAKE_CHOICE'; choice: 'yes' | 'no'; outcome: Outcome; outcomeIndex: number }
  | { type: 'CLOSE_OUTCOME' }
  | { type: 'NEXT_DAY' }
  | { type: 'FINISH_RUN' }
  | { type: 'RESET' };

const MAX_STAT = 100;
const MIN_STAT = 0;

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

const initialState: GameState = {
  energy: 80,
  sanity: 80,
  performance: STARTING_PERFORMANCE,
  currentDay: 0,
  scenarioOrder: [],
  dayModifierOrder: [],
  scenarioCycleReset: false,
  moodCycleReset: false,
  currentOutcome: null,
  currentChoice: null,
  dayResults: [],
  gameStatus: 'menu',
  playerPos: PLAYER_START,
  playerRole: 'builder',
  playerEmoji: '👩‍💻',
  showScenarioModal: false,
  showOutcomeModal: false,
  activeScenarioId: null,
  nearInteractable: false,
  dayModifier: 'manager-on-edge',
  flags: [],
};

function getActiveScenarioId(scenarioOrder: number[], day: number): string | null {
  if (day < 1 || day > TOTAL_DAYS || scenarioOrder.length === 0) return null;
  const idx = scenarioOrder[day - 1];
  return SCENARIOS[idx]?.id ?? null;
}

function getDayModifierForDay(dayModifierOrder: DayModifierId[], day: number): DayModifierId {
  if (day < 1 || dayModifierOrder.length === 0) return 'manager-on-edge';
  return dayModifierOrder[Math.min(day - 1, dayModifierOrder.length - 1)];
}

function getScenarioLocation(activeId: string | null) {
  if (!activeId) return null;
  return SCENARIOS.find((s) => s.id === activeId)?.location ?? null;
}

function checkNearInteractable(px: number, py: number, activeId: string | null): boolean {
  return getAdjacentInteractable(px, py, getScenarioLocation(activeId)) !== null;
}

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SELECT_CHARACTER': {
      return { ...state, playerRole: action.role, playerEmoji: action.emoji };
    }
    case 'START_GAME': {
      const { scenarioOrder, dayModifierOrder, scenarioCycleReset, moodCycleReset } = action;
      const activeId = getActiveScenarioId(scenarioOrder, 1);
      const dayModifier = getDayModifierForDay(dayModifierOrder, 1);
      return {
        ...initialState,
        playerRole: state.playerRole,
        playerEmoji: state.playerEmoji,
        scenarioOrder,
        dayModifierOrder,
        scenarioCycleReset,
        moodCycleReset,
        gameStatus: 'playing',
        currentDay: 1,
        playerPos: PLAYER_START,
        activeScenarioId: activeId,
        nearInteractable: checkNearInteractable(PLAYER_START.x, PLAYER_START.y, activeId),
        dayModifier,
        flags: [],
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
      const adj = getAdjacentInteractable(
        state.playerPos.x,
        state.playerPos.y,
        getScenarioLocation(state.activeScenarioId),
      );
      if (!adj) return state;
      return { ...state, showScenarioModal: true };
    }
    case 'TELEPORT_TO_SCENARIO': {
      if (state.showScenarioModal || state.showOutcomeModal) return state;
      const location = getScenarioLocation(state.activeScenarioId);
      if (!location) return state;
      const stand = getStandTileForLocation(location);
      if (!stand) return state;
      return {
        ...state,
        playerPos: stand,
        nearInteractable: checkNearInteractable(stand.x, stand.y, state.activeScenarioId),
      };
    }
    case 'MAKE_CHOICE': {
      const { choice, outcome, outcomeIndex } = action;
      const newEnergy = clamp(state.energy + outcome.energy, MIN_STAT, MAX_STAT);
      const newSanity = clamp(state.sanity + outcome.sanity, MIN_STAT, MAX_STAT);
      // Raise points fold into performance: one meter decides the raise.
      const newPerformance = clamp(
        state.performance + outcome.performance + outcome.raiseProgress,
        MIN_STAT,
        MAX_STAT,
      );

      const scenario = SCENARIOS.find((s) => s.id === state.activeScenarioId);
      if (!scenario) return state;

      const dayResult: DayResult = { day: state.currentDay, scenario, choice, outcome };
      const isStatBurnout = newEnergy <= 0 || newSanity <= 0;
      const newFlags = deriveFlags(scenario.id, choice, outcomeIndex);
      const flags = [...new Set([...state.flags, ...newFlags])];

      return {
        ...state,
        energy: newEnergy,
        sanity: newSanity,
        performance: newPerformance,
        currentOutcome: outcome,
        currentChoice: choice,
        dayResults: [...state.dayResults, dayResult],
        flags,
        showScenarioModal: false,
        showOutcomeModal: true,
        gameStatus: isStatBurnout ? 'stat-burnout' : state.gameStatus,
      };
    }
    case 'CLOSE_OUTCOME': {
      return {
        ...state,
        showOutcomeModal: false,
        gameStatus: 'dayEnd',
      };
    }
    case 'FINISH_RUN': {
      if (state.gameStatus === 'stat-burnout') return state;
      return {
        ...state,
        gameStatus: state.performance >= RAISE_THRESHOLD ? 'win' : 'missed-raise',
      };
    }
    case 'NEXT_DAY': {
      const nextDay = state.currentDay + 1;
      if (nextDay > TOTAL_DAYS) {
        return {
          ...state,
          gameStatus: state.performance >= RAISE_THRESHOLD ? 'win' : 'missed-raise',
        };
      }
      const activeId = getActiveScenarioId(state.scenarioOrder, nextDay);
      const dayModifier = getDayModifierForDay(state.dayModifierOrder, nextDay);
      return {
        ...state,
        currentDay: nextDay,
        currentOutcome: null,
        currentChoice: null,
        gameStatus: 'playing',
        playerPos: PLAYER_START,
        activeScenarioId: activeId,
        dayModifier,
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
  playerHistory: PlayerHistory;
  unplayedScenarioCount: number;
  unplayedMoodCount: number;
  streakData: StreakData;
  streakNotice: string | null;
  celebrationQueue: EmployeeReward[];
  playerProfile: PlayerProfile;
  setUsername: (username: string) => Promise<{ error?: string }>;
  refreshProfile: () => Promise<void>;
  startGame: () => Promise<void>;
  recordRunComplete: () => Promise<{ cloudSync: 'ok' | 'failed' | 'skipped' | 'already-recorded' }>;
  lastRunSyncMessage: string | null;
  refreshStreak: () => Promise<void>;
  dismissCelebration: () => Promise<void>;
  resetAfterRun: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [playerHistory, setPlayerHistory] = React.useState<PlayerHistory>({
    playedScenarioIds: [],
    playedMoodIds: [],
  });
  const [streakData, setStreakData] = React.useState<StreakData>({
    lastPlayDate: null,
    currentStreak: 0,
    longestStreak: 0,
    earnedRewards: [],
    pendingCelebrations: [],
    streakFreezesAvailable: 0,
  });
  const [streakNotice, setStreakNotice] = React.useState<string | null>(null);
  const [celebrationQueue, setCelebrationQueue] = React.useState<EmployeeReward[]>([]);
  const [playerProfile, setPlayerProfile] = React.useState<PlayerProfile>({
    username: '',
    localTotalScore: 0,
    localRunsCompleted: 0,
    localWins: 0,
  });

  const refreshProfile = useCallback(async () => {
    const profile = await loadPlayerProfile();
    setPlayerProfile(profile);
  }, []);

  const refreshStreak = useCallback(async () => {
    const data = await loadStreakData();
    setStreakData(data);
  }, []);

  React.useEffect(() => {
    loadPlayerHistory().then(setPlayerHistory);
    refreshStreak();
    refreshProfile();
  }, [refreshStreak, refreshProfile]);

  const [lastRunSyncMessage, setLastRunSyncMessage] = React.useState<string | null>(null);
  const runRecordedRef = React.useRef(false);

  const setUsername = useCallback(async (username: string) => {
    const validationError = validateUsername(username);
    if (validationError) return { error: validationError };

    const trimmed = username.trim();
    const profile = await loadPlayerProfile();
    if (profile.username.toLowerCase() !== trimmed.toLowerCase()) {
      const availability = await isUsernameAvailable(trimmed);
      if (availability.error) return { error: availability.error };
      if (!availability.available) {
        return { error: 'That badge name is already taken. Try another.' };
      }
    }

    const updated: PlayerProfile = {
      ...profile,
      username: trimmed,
    };
    await savePlayerProfile(updated);
    setPlayerProfile(updated);
    return {};
  }, []);

  const unplayedScenarioCount = countUnplayedScenarios(playerHistory.playedScenarioIds);
  const unplayedMoodCount = countUnplayedMoods(playerHistory.playedMoodIds);

  const startGame = useCallback(async () => {
    const history = await loadPlayerHistory();
    const scenarioPick = pickScenarioOrder(TOTAL_DAYS, history.playedScenarioIds);
    const moodPick = pickDayModifierOrder(TOTAL_DAYS, history.playedMoodIds);

    dispatch({
      type: 'START_GAME',
      scenarioOrder: scenarioPick.items,
      dayModifierOrder: moodPick.items,
      scenarioCycleReset: scenarioPick.cycleReset,
      moodCycleReset: moodPick.cycleReset,
    });

    setPlayerHistory(history);
  }, []);

  const recordRunComplete = useCallback(async (): Promise<{
    cloudSync: 'ok' | 'failed' | 'skipped' | 'already-recorded';
  }> => {
    if (runRecordedRef.current) {
      return { cloudSync: 'already-recorded' };
    }
    if (state.dayResults.length === 0) {
      return { cloudSync: 'skipped' };
    }
    runRecordedRef.current = true;

    const scenarioIds = state.dayResults.map((result) => result.scenario.id);
    const moodIds = state.dayModifierOrder.slice(0, state.dayResults.length);

    const updated = await recordPlayedRun({
      scenarioIds,
      moodIds,
      scenarioCycleReset: state.scenarioCycleReset,
      moodCycleReset: state.moodCycleReset,
    });

    setPlayerHistory(updated);

    const streakResult = await recordDailyStreak();
    setStreakData(streakResult.data);
    if (streakResult.usedStreakFreeze) {
      setStreakNotice('Streak freeze used. HR pretends that counts as grace.');
    } else {
      setStreakNotice(null);
    }
    if (streakResult.newlyEarned.length > 0) {
      setCelebrationQueue((prev) => [...prev, ...streakResult.newlyEarned]);
    }

    const profile = await loadPlayerProfile();
    const won =
      state.gameStatus === 'win' ||
      (state.gameStatus !== 'stat-burnout' && state.performance >= RAISE_THRESHOLD);

    if (!profile.username) {
      setLastRunSyncMessage('Run saved locally. Set a badge name to sync the leaderboard.');
      return { cloudSync: 'skipped' };
    }
    const grade = calculateRunGrade({
      energy: state.energy,
      sanity: state.sanity,
      performance: state.performance,
      currentStreak: streakResult.data.currentStreak,
      perksEarned: streakResult.data.earnedRewards.length,
      won,
    });
    const runScore = calculateRunScore({
      won,
      grade,
      daysCompleted: state.dayResults.length,
      currentStreak: streakResult.data.currentStreak,
    });

    const updatedProfile: PlayerProfile = {
      ...profile,
      localTotalScore: profile.localTotalScore + runScore,
      localRunsCompleted: profile.localRunsCompleted + 1,
      localWins: profile.localWins + (won ? 1 : 0),
    };
    await savePlayerProfile(updatedProfile);
    setPlayerProfile(updatedProfile);

    const sync = await upsertPlayerScore({
      username: profile.username,
      runScore,
      won,
      bestStreak: streakResult.data.longestStreak,
    });

    setLastRunSyncMessage(
      sync.ok
        ? 'Score synced to the office leaderboard.'
        : `Saved on this device (+${runScore} pts). ${sync.error ?? 'Cloud sync failed.'}`,
    );
    return { cloudSync: sync.ok ? 'ok' : 'failed' };
  }, [
    state.dayResults,
    state.dayModifierOrder,
    state.scenarioCycleReset,
    state.moodCycleReset,
    state.energy,
    state.sanity,
    state.performance,
    state.gameStatus,
  ]);

  React.useEffect(() => {
    if (state.gameStatus === 'menu') {
      runRecordedRef.current = false;
      setLastRunSyncMessage(null);
    }
  }, [state.gameStatus]);

  const dismissCelebration = useCallback(async () => {
    setCelebrationQueue((prev) => {
      const [current, ...rest] = prev;
      if (current) {
        clearPendingCelebration(current.days).then(setStreakData);
      }
      return rest;
    });
  }, []);

  const resetAfterRun = useCallback(() => {
    dispatch({ type: 'RESET' });
    setCelebrationQueue([]);
    setStreakNotice(null);
    setLastRunSyncMessage(null);
    runRecordedRef.current = false;
  }, []);

  const currentScenario = state.activeScenarioId
    ? SCENARIOS.find((s) => s.id === state.activeScenarioId) ?? null
    : null;

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        currentScenario,
        playerHistory,
        unplayedScenarioCount,
        unplayedMoodCount,
        streakData,
        streakNotice,
        celebrationQueue,
        playerProfile,
        setUsername,
        refreshProfile,
        startGame,
        recordRunComplete,
        lastRunSyncMessage,
        refreshStreak,
        dismissCelebration,
        resetAfterRun,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

export { TOTAL_DAYS, RAISE_THRESHOLD, STARTING_PERFORMANCE } from '../constants/gameRules';
