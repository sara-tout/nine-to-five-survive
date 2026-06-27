import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Card } from '../components/Card';
import { EndRunScreenLayout } from '../components/EndRunScreenLayout';
import { RewardUnlockModal } from '../components/RewardUnlockModal';
import { useGame, RAISE_THRESHOLD } from '../context/GameContext';
import { startNewRun } from '../utils/replayNavigation';

const BURNOUT_MESSAGES = [
  {
    title: 'Total Burnout',
    message:
      "You said yes to everything and now you're staring at your monitor like it personally wronged you. Your energy is gone. Your will to work is depleted.",
    tip: 'Saying no isn\'t career suicide. It\'s self-preservation.',
  },
  {
    title: 'Sanity: 404 Not Found',
    message:
      "Between the passive-aggressive chat messages and the meeting that could've been an email, your brain has officially filed for divorce.",
    tip: 'Protect your mental bandwidth like it\'s production data.',
  },
  {
    title: 'You Didn\'t Get the Raise',
    message:
      "Five days of corporate survival and the raise went to someone who just... vibed better in meetings. The system is broken, but at least you tried.",
    tip: 'Balance is the real promotion. Strategic choices beat blind hustle.',
  },
];

export function GameOverScreen({ navigation }: any) {
  const { state, celebrationQueue, streakData, streakNotice, lastRunSyncMessage, dismissCelebration, resetAfterRun } =
    useGame();
  const activeCelebration = celebrationQueue[0] ?? null;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const isStatBurnout = state.gameStatus === 'stat-burnout' || state.energy <= 0 || state.sanity <= 0;
  const msgIndex =
    state.gameStatus === 'missed-raise'
      ? 2
      : state.energy <= 0
        ? 0
        : state.sanity <= 0
          ? 1
          : 2;
  const msg = BURNOUT_MESSAGES[msgIndex];

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -6, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const handleRestart = () => {
    startNewRun(navigation, resetAfterRun);
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

  return (
    <View style={styles.wrapper}>
      <EndRunScreenLayout
        contentContainerStyle={styles.scroll}
        primaryTitle="Play Again"
        primaryIcon="🔄"
        onPrimary={handleRestart}
        onLeaderboard={handleLeaderboard}
        onHome={handleHome}
        footerHidden={!!activeCelebration}
      >
        <Animated.View style={[styles.fadeWrap, { opacity: fadeAnim }]}>
          <Animated.View
            style={[styles.iconWrap, { transform: [{ translateX: shakeAnim }] }]}
          >
            <Text style={styles.icon}>{isStatBurnout ? '🔥' : '📉'}</Text>
          </Animated.View>

          <Text style={styles.title}>{msg.title}</Text>
          <Text style={styles.subtitle}>Game Over</Text>

          <Card style={styles.messageCard}>
            <Text style={styles.message}>{msg.message}</Text>
            {streakNotice && <Text style={styles.streakNotice}>{streakNotice}</Text>}
            {lastRunSyncMessage && <Text style={styles.syncNotice}>{lastRunSyncMessage}</Text>}
          </Card>

          <View style={styles.tipBanner}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>{msg.tip}</Text>
          </View>

          <Card style={styles.statsCard}>
            <Text style={styles.statsTitle}>Final Stats</Text>
            <View style={styles.statRow}>
              <Text style={styles.statIcon}>⚡</Text>
              <Text style={styles.statLabel} numberOfLines={1}>Energy</Text>
              <Text style={[styles.statValue, state.energy <= 0 && { color: COLORS.danger }]} numberOfLines={1}>
                {Math.max(0, state.energy)}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statIcon}>🧠</Text>
              <Text style={styles.statLabel} numberOfLines={1}>Sanity</Text>
              <Text style={[styles.statValue, state.sanity <= 0 && { color: COLORS.danger }]} numberOfLines={1}>
                {Math.max(0, state.sanity)}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statIcon}>📊</Text>
              <Text style={styles.statLabel} numberOfLines={1}>Performance</Text>
              <Text style={styles.statValue} numberOfLines={1}>{state.performance} / {RAISE_THRESHOLD}</Text>
            </View>
            <View style={[styles.statRow, styles.statRowLast]}>
              <Text style={styles.statIcon}>📅</Text>
              <Text style={styles.statLabel} numberOfLines={1}>Days Survived</Text>
              <Text style={styles.statValue} numberOfLines={1}>{state.currentDay}</Text>
            </View>
          </Card>

          <Text style={styles.hint}>Every expert was once a burnout survivor.</Text>
        </Animated.View>
      </EndRunScreenLayout>

      {activeCelebration && (
        <RewardUnlockModal
          reward={activeCelebration}
          streakDays={streakData.currentStreak}
          onDismiss={dismissCelebration}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, position: 'relative' },
  scroll: {
    alignItems: 'center',
  },
  fadeWrap: {
    alignSelf: 'stretch',
    width: '100%',
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  icon: { fontSize: 34 },
  title: {
    ...FONTS.heading,
    color: COLORS.danger,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...FONTS.caption,
    color: COLORS.textMuted,
    textAlign: 'center',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: SPACING.md,
  },
  messageCard: { marginBottom: SPACING.md, width: '100%' },
  message: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  streakNotice: {
    ...FONTS.caption,
    color: COLORS.accent,
    textAlign: 'center',
    marginTop: SPACING.md,
    fontWeight: '600',
  },
  syncNotice: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 20,
  },
  tipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accentLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    width: '100%',
  },
  tipIcon: { fontSize: 20, marginRight: SPACING.sm },
  tipText: { ...FONTS.caption, color: COLORS.accent, flex: 1, lineHeight: 20 },
  statsCard: { marginBottom: SPACING.md, width: '100%' },
  statsTitle: { ...FONTS.subheading, color: COLORS.text, marginBottom: SPACING.sm },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  statRowLast: { borderBottomWidth: 0 },
  statIcon: { fontSize: 16, marginRight: SPACING.sm },
  statLabel: { ...FONTS.body, color: COLORS.textSecondary, flex: 1 },
  statValue: { ...FONTS.bodyBold, color: COLORS.text, marginLeft: SPACING.sm },
  hint: {
    ...FONTS.small,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
});
