import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { EndRunScreenLayout } from '../components/EndRunScreenLayout';
import { useGame, RAISE_THRESHOLD, TOTAL_DAYS } from '../context/GameContext';
import { getDayModifier } from '../data/dayModifiers';
import { getNPC } from '../data/officeNPCs';
import { calculateRunGrade } from '../utils/runGrade';
import { calculateRunScore } from '../utils/runScore';
import { startNewRun } from '../utils/replayNavigation';

export function RunSummaryScreen({ navigation }: any) {
  const { state, streakData, recordRunComplete, lastRunSyncMessage, resetAfterRun } = useGame();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const recordedRef = useRef(false);

  const isStatBurnout = state.gameStatus === 'stat-burnout';
  const completedFullWeek = state.dayResults.length >= TOTAL_DAYS;
  const won =
    state.gameStatus === 'win' ||
    (!isStatBurnout && state.performance >= RAISE_THRESHOLD && completedFullWeek);

  const totalPerfGained = state.dayResults.reduce(
    (sum, r) => sum + r.outcome.performance + r.outcome.raiseProgress,
    0,
  );
  const perksEarned = streakData.earnedRewards.length;
  const grade = calculateRunGrade({
    energy: state.energy,
    sanity: state.sanity,
    performance: state.performance,
    currentStreak: streakData.currentStreak,
    perksEarned,
    won,
  });
  const runPoints = calculateRunScore({
    won,
    grade,
    daysCompleted: state.dayResults.length,
    currentStreak: streakData.currentStreak,
  });

  const npcsMet = [
    ...new Set(
      state.dayResults
        .map((r) => r.scenario.npcId)
        .filter(Boolean)
        .map((id) => getNPC(id!)?.name)
        .filter(Boolean),
    ),
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  useEffect(() => {
    if (recordedRef.current) return;
    recordedRef.current = true;
    recordRunComplete();
  }, [recordRunComplete]);

  const handlePlayAgain = () => {
    startNewRun(navigation, resetAfterRun);
  };

  const handleSeeOutcome = () => {
    navigation.replace(won ? 'Win' : 'GameOver');
  };

  const handleHome = () => {
    resetAfterRun();
    navigation.replace('Home');
  };

  const handleLeaderboard = () => {
    resetAfterRun();
    navigation.reset({
      index: 1,
      routes: [{ name: 'Home' }, { name: 'Leaderboard' }],
    });
  };

  const subtitle = isStatBurnout
    ? `You burned out on day ${state.currentDay}. The office won this round.`
    : won
      ? 'You hit the raise bar. HR is already rewriting the narrative.'
      : completedFullWeek
        ? `You ended at ${state.performance}/${RAISE_THRESHOLD} performance. Close, but calibration is unforgiving.`
        : `Shift ended early at ${state.performance}/${RAISE_THRESHOLD} performance after ${state.dayResults.length} day${state.dayResults.length === 1 ? '' : 's'}.`;

  return (
    <EndRunScreenLayout
      primaryTitle="Play Again"
      primaryIcon="🔄"
      onPrimary={handlePlayAgain}
      onLeaderboard={handleLeaderboard}
      onHome={handleHome}
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.eyebrow}>
          {isStatBurnout ? 'Early exit' : completedFullWeek ? 'Week in review' : 'Partial shift'}
        </Text>
        <Text style={styles.title}>Your shift summary</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <Button
          title={
            won
              ? 'See victory screen'
              : isStatBurnout
                ? 'See burnout screen'
                : 'See final verdict'
          }
          onPress={handleSeeOutcome}
          variant="secondary"
          icon={won ? '🏆' : '😵'}
          style={styles.recapBtn}
        />

        {lastRunSyncMessage && (
          <View style={styles.syncBanner}>
            <Text style={styles.syncText}>{lastRunSyncMessage}</Text>
          </View>
        )}

        <Card style={styles.gradeCard}>
          <View style={[styles.gradeBadge, { borderColor: grade.color }]}>
            <Text style={[styles.gradeText, { color: grade.color }]}>{grade.grade}</Text>
          </View>
          <View style={styles.gradeInfo}>
            <Text style={styles.gradeLabel}>{grade.label}</Text>
            {grade.bonusNote && <Text style={styles.gradeBonus}>{grade.bonusNote}</Text>}
          </View>
        </Card>

        <Text style={styles.sectionTitle}>This week you faced</Text>
        {state.dayResults.map((result) => {
          const mood = getDayModifier(state.dayModifierOrder[result.day - 1]);
          return (
            <Card key={result.day} style={styles.dayCard}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayIcon}>{result.scenario.icon}</Text>
                <View style={styles.dayText}>
                  <Text style={styles.dayTitle}>
                    Day {result.day}: {result.scenario.title}
                  </Text>
                  <Text style={styles.dayChoice}>
                    {result.choice === 'yes' ? result.scenario.yesLabel : result.scenario.noLabel}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.dayRaise,
                    result.outcome.performance + result.outcome.raiseProgress >= 0
                      ? styles.positive
                      : styles.negative,
                  ]}
                >
                  {result.outcome.performance + result.outcome.raiseProgress >= 0 ? '+' : ''}
                  {result.outcome.performance + result.outcome.raiseProgress}📊
                </Text>
              </View>
              <Text style={styles.dayMood}>
                {mood.emoji} {mood.label}
              </Text>
            </Card>
          );
        })}

        {npcsMet.length > 0 && (
          <Card style={styles.npcCard}>
            <Text style={styles.npcTitle}>Cast of characters</Text>
            <Text style={styles.npcList}>{npcsMet.join(' · ')}</Text>
          </Card>
        )}

        <Card style={styles.totalsCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Survival points this shift</Text>
            <Text style={styles.totalValue}>+{runPoints} pts toward leaderboard</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Performance gained this week</Text>
            <Text style={styles.totalValue}>
              {totalPerfGained >= 0 ? '+' : ''}
              {totalPerfGained}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Final energy / sanity / performance</Text>
            <Text style={styles.totalValue}>
              {state.energy}⚡ · {state.sanity}🧠 · {state.performance}📊
            </Text>
          </View>
        </Card>
      </Animated.View>
    </EndRunScreenLayout>
  );
}

const styles = StyleSheet.create({
  eyebrow: { ...FONTS.caption, color: COLORS.accent, textTransform: 'uppercase', letterSpacing: 1 },
  title: { ...FONTS.heading, color: COLORS.text, marginTop: SPACING.xs },
  subtitle: { ...FONTS.body, color: COLORS.textSecondary, marginTop: SPACING.sm, lineHeight: 24, marginBottom: SPACING.md },
  recapBtn: { marginBottom: SPACING.md, width: '100%' },
  syncBanner: {
    backgroundColor: COLORS.accentLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  syncText: { ...FONTS.caption, color: COLORS.accent, lineHeight: 20 },
  gradeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  gradeBadge: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.lg,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
  },
  gradeText: { fontSize: 28, fontWeight: '800' },
  gradeInfo: { flex: 1 },
  gradeLabel: { ...FONTS.bodyBold, color: COLORS.text },
  gradeBonus: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 4 },
  sectionTitle: { ...FONTS.subheading, color: COLORS.text, marginBottom: SPACING.sm },
  dayCard: { marginBottom: SPACING.sm },
  dayHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  dayIcon: { fontSize: 28 },
  dayText: { flex: 1 },
  dayTitle: { ...FONTS.bodyBold, color: COLORS.text },
  dayChoice: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 2 },
  dayRaise: { ...FONTS.bodyBold },
  positive: { color: COLORS.success },
  negative: { color: COLORS.danger },
  dayMood: { ...FONTS.small, color: COLORS.textMuted, marginTop: SPACING.sm },
  npcCard: { marginTop: SPACING.sm, marginBottom: SPACING.md },
  npcTitle: { ...FONTS.caption, color: COLORS.textMuted, marginBottom: SPACING.xs },
  npcList: { ...FONTS.body, color: COLORS.textSecondary, lineHeight: 22 },
  totalsCard: { marginBottom: SPACING.lg },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  totalLabel: { ...FONTS.body, color: COLORS.textSecondary, flex: 1, marginRight: SPACING.sm },
  totalValue: { ...FONTS.bodyBold, color: COLORS.text, flexShrink: 1, textAlign: 'right' },
});
