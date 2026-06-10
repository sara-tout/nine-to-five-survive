import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { StatBar } from '../components/StatBar';
import { OfficeGrid } from '../components/OfficeGrid';
import { DPad } from '../components/DPad';
import { ScenarioModal } from '../components/ScenarioModal';
import { OutcomeModal } from '../components/OutcomeModal';
import { useGame, TOTAL_DAYS, RAISE_THRESHOLD } from '../context/GameContext';
import { pickOutcome } from '../data/scenarios';

export function OfficeScreen({ navigation }: any) {
  const { state, dispatch, currentScenario } = useGame();

  const handleMove = useCallback(
    (dx: number, dy: number) => {
      dispatch({ type: 'MOVE_PLAYER', dx, dy });
    },
    [dispatch],
  );

  const handleInteract = useCallback(() => {
    dispatch({ type: 'INTERACT' });
  }, [dispatch]);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const handler = (e: KeyboardEvent) => {
      if (state.showScenarioModal || state.showOutcomeModal) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          e.preventDefault();
          handleMove(0, -1);
          break;
        case 'ArrowDown':
        case 's':
          e.preventDefault();
          handleMove(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
          e.preventDefault();
          handleMove(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
          e.preventDefault();
          handleMove(1, 0);
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          handleInteract();
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleMove, handleInteract, state.showScenarioModal, state.showOutcomeModal]);

  useEffect(() => {
    if (state.gameStatus === 'dayEnd') {
      navigation.replace('DayEnd');
    } else if (state.gameStatus === 'burnout') {
      navigation.replace('GameOver');
    } else if (state.gameStatus === 'win') {
      navigation.replace('Win');
    }
  }, [state.gameStatus, navigation]);

  const handleChoose = (choice: 'yes' | 'no') => {
    if (!currentScenario) return;
    const outcomes = choice === 'yes' ? currentScenario.yesOutcomes : currentScenario.noOutcomes;
    const outcome = pickOutcome(outcomes);
    dispatch({ type: 'MAKE_CHOICE', choice, outcome });
  };

  const handleCloseOutcome = () => {
    if (state.gameStatus === 'burnout') {
      navigation.replace('GameOver');
      return;
    }
    dispatch({ type: 'CLOSE_OUTCOME' });
  };

  const choiceLabel =
    state.currentChoice === 'yes'
      ? currentScenario?.yesLabel ?? ''
      : currentScenario?.noLabel ?? '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.dayBadge}>
            <Text style={styles.dayText}>Day {state.currentDay}/{TOTAL_DAYS}</Text>
          </View>
          {currentScenario && (
            <View style={styles.hintBadge}>
              <Text style={styles.hintText}>
                Find the {currentScenario.icon} {currentScenario.locationLabel}
              </Text>
            </View>
          )}
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>{currentScenario?.time ?? ''}</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statHalf}>
            <StatBar label="Energy" value={state.energy} color={COLORS.energy} bgColor={COLORS.energyBg} icon="⚡" />
          </View>
          <View style={styles.statHalf}>
            <StatBar label="Sanity" value={state.sanity} color={COLORS.sanity} bgColor={COLORS.sanityBg} icon="🧠" />
          </View>
        </View>
        <View style={styles.raiseRow}>
          <Text style={styles.raiseLabel}>📈 Raise</Text>
          <View style={styles.raiseTrack}>
            <View style={[styles.raiseFill, { width: `${Math.min(100, (state.raiseProgress / RAISE_THRESHOLD) * 100)}%` }]} />
          </View>
          <Text style={styles.raisePct}>{state.raiseProgress}/{RAISE_THRESHOLD}</Text>
        </View>
      </View>

      <View style={styles.gridArea}>
        <OfficeGrid playerPos={state.playerPos} playerEmoji={state.playerEmoji} activeScenarioId={state.activeScenarioId} />
      </View>

      <View style={styles.controls}>
        {state.nearInteractable && !state.showScenarioModal && !state.showOutcomeModal && (
          <View style={styles.promptBanner}>
            <Text style={styles.promptText}>Press Space or tap Interact</Text>
          </View>
        )}
        <DPad onMove={handleMove} onInteract={handleInteract} canInteract={state.nearInteractable} />
        <Text style={styles.controlHint}>Arrow keys / WASD to move, Space to interact</Text>
      </View>

      {state.showScenarioModal && currentScenario && (
        <ScenarioModal scenario={currentScenario} onChoose={handleChoose} />
      )}

      {state.showOutcomeModal && state.currentOutcome && (
        <OutcomeModal
          outcome={state.currentOutcome}
          choiceLabel={choiceLabel}
          onContinue={handleCloseOutcome}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  dayBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  dayText: { ...FONTS.caption, color: COLORS.white },
  hintBadge: {
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    flex: 1,
    marginHorizontal: SPACING.sm,
  },
  hintText: { ...FONTS.caption, color: COLORS.accent, textAlign: 'center' },
  timeBadge: {
    backgroundColor: COLORS.bg,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  timeText: { ...FONTS.caption, color: COLORS.textSecondary },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  statHalf: { flex: 1 },
  raiseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  raiseLabel: { ...FONTS.small, color: COLORS.textSecondary, marginRight: SPACING.sm },
  raiseTrack: {
    flex: 1,
    height: 5,
    backgroundColor: COLORS.raiseBg,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  raiseFill: {
    height: '100%',
    backgroundColor: COLORS.raise,
    borderRadius: RADIUS.full,
  },
  raisePct: { ...FONTS.small, color: COLORS.textSecondary, marginLeft: SPACING.sm },
  gridArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  controls: {
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    paddingBottom: SPACING.sm,
  },
  promptBanner: {
    backgroundColor: COLORS.accentLight,
    paddingVertical: SPACING.xs + 2,
    alignItems: 'center',
  },
  promptText: { ...FONTS.caption, color: COLORS.accent, fontWeight: '700' },
  controlHint: {
    ...FONTS.small,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
});
