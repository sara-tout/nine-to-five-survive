import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, Pressable } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { StatBar } from '../components/StatBar';
import { OfficeGrid } from '../components/OfficeGrid';
import { DPad } from '../components/DPad';
import { ScenarioModal } from '../components/ScenarioModal';
import { OutcomeModal } from '../components/OutcomeModal';
import { OfficeCoachOverlay } from '../components/OfficeCoachOverlay';
import { useGame, TOTAL_DAYS, RAISE_THRESHOLD } from '../context/GameContext';
import { getDayModifier } from '../data/dayModifiers';
import { adjustOutcomeWeights, buildResolvedOutcome, ScenarioContext, PREP_ENERGY_COST } from '../data/scenarioContext';
import { getChoiceRisk, getDepletionFactor, getReputationFactors } from '../data/strategy';
import { pickOutcome } from '../data/scenarios';
import { getNPC } from '../data/officeNPCs';
import { getPathHint } from '../utils/officeNavigation';
import { hapticLight, hapticMedium, hapticSuccess } from '../utils/haptics';
import { hasSeenOfficeCoach, markOfficeCoachSeen } from '../storage/onboarding';

export function OfficeScreen({ navigation }: any) {
  const { state, dispatch, currentScenario, playerProfile } = useGame();
  const [showCoach, setShowCoach] = useState(false);
  const canSkipWalk = playerProfile.localRunsCompleted > 0;

  useEffect(() => {
    hasSeenOfficeCoach().then((seen) => {
      if (!seen) setShowCoach(true);
    });
  }, []);

  const handleMove = useCallback(
    (dx: number, dy: number) => {
      hapticLight();
      dispatch({ type: 'MOVE_PLAYER', dx, dy });
    },
    [dispatch],
  );

  const handleInteract = useCallback(() => {
    if (!state.nearInteractable) return;
    hapticMedium();
    dispatch({ type: 'INTERACT' });
  }, [dispatch, state.nearInteractable]);

  const handleSkipWalk = useCallback(() => {
    hapticLight();
    dispatch({ type: 'TELEPORT_TO_SCENARIO' });
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
    }
  }, [state.gameStatus, navigation]);

  const scenarioContext: ScenarioContext = {
    dayModifier: state.dayModifier,
    priorChoices: state.dayResults.map((r) => ({
      scenarioId: r.scenario.id,
      choice: r.choice,
    })),
    flags: state.flags,
    energy: state.energy,
    sanity: state.sanity,
    prepared: state.prepared,
    perk: state.perk,
  };

  const handleChoose = (choice: 'yes' | 'no') => {
    if (!currentScenario) return;
    hapticMedium();
    const outcomes = choice === 'yes' ? currentScenario.yesOutcomes : currentScenario.noOutcomes;
    const context = scenarioContext;
    const adjusted = adjustOutcomeWeights(currentScenario.id, choice, outcomes, context);
    const { outcome: rawOutcome, index } = pickOutcome(adjusted);
    const outcome = buildResolvedOutcome(
      currentScenario.id,
      choice,
      rawOutcome,
      index,
      state.playerRole,
      context,
    );
    dispatch({ type: 'MAKE_CHOICE', choice, outcome, outcomeIndex: index });
  };

  const handlePrepare = () => {
    hapticLight();
    dispatch({ type: 'PREPARE' });
  };

  const handleCloseOutcome = () => {
    hapticSuccess();
    if (state.gameStatus === 'stat-burnout') {
      navigation.replace('RunSummary');
      return;
    }
    dispatch({ type: 'CLOSE_OUTCOME' });
  };

  const dismissCoach = async () => {
    await markOfficeCoachSeen();
    setShowCoach(false);
  };

  const choiceLabel =
    state.currentChoice === 'yes'
      ? currentScenario?.yesLabel ?? ''
      : currentScenario?.noLabel ?? '';

  const mood = getDayModifier(state.dayModifier);
  const pathHint = getPathHint(state.playerPos, currentScenario?.location ?? null);
  const npc = currentScenario?.npcId ? getNPC(currentScenario.npcId) : undefined;
  const raiseGap = Math.max(0, RAISE_THRESHOLD - state.performance);
  const daysLeft = TOTAL_DAYS - state.currentDay + 1;

  const controlHint = 'D-pad to move · tap Interact when lit up';
  const interactPrompt = 'Tap Interact';

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
                {currentScenario.icon} {currentScenario.locationLabel}
              </Text>
            </View>
          )}
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>{currentScenario?.time ?? ''}</Text>
          </View>
        </View>

        {pathHint && !state.showScenarioModal && !state.showOutcomeModal && (
          <Text style={styles.pathHint}>{pathHint}</Text>
        )}

        <View style={styles.statsRow}>
          <View style={styles.statThird}>
            <StatBar label="Energy" value={state.energy} color={COLORS.energy} bgColor={COLORS.energyBg} icon="⚡" />
          </View>
          <View style={styles.statThird}>
            <StatBar label="Sanity" value={state.sanity} color={COLORS.sanity} bgColor={COLORS.sanityBg} icon="🧠" />
          </View>
          <View style={styles.statThird}>
            <StatBar
              label="Performance"
              value={state.performance}
              color={COLORS.performance}
              bgColor={COLORS.performanceBg}
              icon="📊"
            />
          </View>
        </View>

        <View style={styles.moodRow}>
          <Text style={styles.moodChip}>
            {mood.emoji} {mood.label}
          </Text>
        </View>

        <View style={styles.raiseRow}>
          <Text style={styles.raiseLabel}>📈 Raise</Text>
          <View style={styles.raiseTrack}>
            <View
              style={[styles.raiseFill, { width: `${Math.min(100, (state.performance / RAISE_THRESHOLD) * 100)}%` }]}
            />
          </View>
          <Text style={styles.raisePct}>{state.performance}/{RAISE_THRESHOLD}</Text>
        </View>
        <Text style={styles.raiseHint}>
          {raiseGap > 0
            ? `Need +${raiseGap} performance in ${daysLeft} day${daysLeft === 1 ? '' : 's'} to earn the raise`
            : 'Raise within reach. Keep performance up.'}
        </Text>
      </View>

      <View style={styles.gridArea}>
        <OfficeGrid
          playerPos={state.playerPos}
          playerEmoji={state.playerEmoji}
          activeLocation={currentScenario?.location ?? null}
          npcMarker={npc?.emoji ?? null}
        />
        {canSkipWalk && !state.nearInteractable && !state.showScenarioModal && !state.showOutcomeModal && (
          <Pressable onPress={handleSkipWalk} style={styles.skipWalkBtn}>
            <Text style={styles.skipWalkText}>Skip walk →</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.controls}>
        {state.nearInteractable && !state.showScenarioModal && !state.showOutcomeModal && (
          <View style={styles.promptBanner}>
            <Text style={styles.promptText}>{interactPrompt}</Text>
          </View>
        )}
        <DPad onMove={handleMove} onInteract={handleInteract} canInteract={state.nearInteractable} />
        <Text style={styles.controlHint}>{controlHint}</Text>
      </View>

      {state.showScenarioModal && currentScenario && (
        <ScenarioModal
          scenario={currentScenario}
          playerRole={state.playerRole}
          dayModifier={state.dayModifier}
          factors={[
            ...getReputationFactors(state.flags),
            ...(getDepletionFactor(state.energy, state.sanity)
              ? [getDepletionFactor(state.energy, state.sanity)!]
              : []),
          ]}
          yesRisk={getChoiceRisk(currentScenario, 'yes', state.playerRole, scenarioContext)}
          noRisk={getChoiceRisk(currentScenario, 'no', state.playerRole, scenarioContext)}
          prepared={state.prepared}
          canPrepare={state.energy > PREP_ENERGY_COST}
          prepCost={PREP_ENERGY_COST}
          onPrepare={handlePrepare}
          onChoose={handleChoose}
        />
      )}

      {state.showOutcomeModal && state.currentOutcome && (
        <OutcomeModal
          outcome={state.currentOutcome}
          choiceLabel={choiceLabel}
          onContinue={handleCloseOutcome}
        />
      )}

      {showCoach && !state.showScenarioModal && !state.showOutcomeModal && (
        <OfficeCoachOverlay onDismiss={dismissCoach} />
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
    marginBottom: SPACING.xs,
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
  pathHint: {
    ...FONTS.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  timeBadge: {
    backgroundColor: COLORS.bg,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  timeText: { ...FONTS.caption, color: COLORS.textSecondary },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  statThird: { flex: 1 },
  moodRow: {
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  moodChip: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.bg,
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
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
  raiseHint: {
    ...FONTS.small,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  gridArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  skipWalkBtn: {
    position: 'absolute',
    bottom: SPACING.sm,
    right: SPACING.md,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  skipWalkText: { ...FONTS.caption, color: COLORS.accent, fontWeight: '600' },
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
