import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Card } from '../components/Card';
import { EndRunScreenLayout } from '../components/EndRunScreenLayout';
import { RewardUnlockModal } from '../components/RewardUnlockModal';
import { useGame, RAISE_THRESHOLD } from '../context/GameContext';
import { calculateRunGrade } from '../utils/runGrade';
import { startNewRun } from '../utils/replayNavigation';

const VICTORY_TITLES = [
  'The Art of Saying No',
  'Balanced & Promoted',
  'Corporate Jiu-Jitsu Master',
];

export function WinScreen({ navigation }: any) {
  const { state, celebrationQueue, streakData, streakNotice, lastRunSyncMessage, dismissCelebration, resetAfterRun } =
    useGame();
  const activeCelebration = celebrationQueue[0] ?? null;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const confettiAnims = useRef(
    Array.from({ length: 6 }, () => ({
      y: new Animated.Value(-50),
      opacity: new Animated.Value(0),
      rotate: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();

    confettiAnims.forEach((anim, i) => {
      Animated.sequence([
        Animated.delay(i * 150),
        Animated.parallel([
          Animated.timing(anim.opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(anim.y, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(anim.rotate, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    });
  }, []);

  const confettiEmojis = ['🎉', '💰', '🏆', '⭐', '🎊', '👑'];
  const titleIndex = Math.min(
    Math.floor(state.performance / 40),
    VICTORY_TITLES.length - 1
  );

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

  const grade = calculateRunGrade({
    energy: state.energy,
    sanity: state.sanity,
    performance: state.performance,
    currentStreak: streakData.currentStreak,
    perksEarned: streakData.earnedRewards.length,
    won: true,
  });

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
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.confettiRow}>
            {confettiAnims.map((anim, i) => (
              <Animated.Text
                key={i}
                style={[
                  styles.confetti,
                  {
                    opacity: anim.opacity,
                    transform: [
                      { translateY: anim.y },
                      {
                        rotate: anim.rotate.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['-30deg', '0deg'],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {confettiEmojis[i]}
              </Animated.Text>
            ))}
          </View>

          <View style={styles.trophyWrap}>
            <Text style={styles.trophy}>🏆</Text>
          </View>

          <Text style={styles.title}>You Got the Raise!</Text>
          <Text style={styles.subtitle}>{VICTORY_TITLES[titleIndex]}</Text>

          <Card style={styles.messageCard}>
            <Text style={styles.message}>
              Five days of navigating office politics, dodging unnecessary meetings, and protecting
              your sanity, and it paid off. You played the game smarter, not harder. Your bank
              account thanks you. Your therapist is cautiously optimistic.
            </Text>
            {streakNotice && <Text style={styles.streakNotice}>{streakNotice}</Text>}
            {lastRunSyncMessage && <Text style={styles.syncNotice}>{lastRunSyncMessage}</Text>}
          </Card>

          <View style={styles.gradeWrap}>
            <View style={[styles.gradeBadge, { borderColor: grade.color }]}>
              <Text style={[styles.gradeText, { color: grade.color }]}>{grade.grade}</Text>
            </View>
            <Text style={styles.gradeLabel}>{grade.label}</Text>
            {grade.bonusNote && <Text style={styles.gradeBonus}>{grade.bonusNote}</Text>}
          </View>

          <Card style={styles.statsCard}>
            <Text style={styles.statsTitle}>Final Report Card</Text>
            <View style={styles.statRow}>
              <Text style={styles.statEmoji}>⚡</Text>
              <Text style={styles.statLabel}>Energy</Text>
              <Text style={styles.statValue}>{state.energy}/100</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statEmoji}>🧠</Text>
              <Text style={styles.statLabel}>Sanity</Text>
              <Text style={styles.statValue}>{state.sanity}/100</Text>
            </View>
            <View style={[styles.statRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.statEmoji}>📊</Text>
              <Text style={styles.statLabel}>Performance</Text>
              <Text style={[styles.statValue, { color: COLORS.success }]}>
                {state.performance}/{RAISE_THRESHOLD} needed ✓
              </Text>
            </View>
          </Card>

          <Text style={styles.hint}>
            Can you get an S rank? Different choices, different outcomes...
          </Text>
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
  confettiRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  confetti: { fontSize: 28 },
  trophyWrap: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.xl,
    backgroundColor: '#FFF9E6',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  trophy: { fontSize: 48 },
  title: {
    ...FONTS.heading,
    fontSize: 28,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...FONTS.subheading,
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  messageCard: { marginBottom: SPACING.lg, width: '100%' },
  message: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
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
  gradeWrap: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  gradeBadge: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.lg,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.card,
  },
  gradeText: { fontSize: 32, fontWeight: '800' },
  gradeLabel: { ...FONTS.caption, color: COLORS.textSecondary },
  gradeBonus: { ...FONTS.small, color: COLORS.accent, marginTop: SPACING.xs, textAlign: 'center' },
  statsCard: { marginBottom: SPACING.lg, width: '100%' },
  statsTitle: { ...FONTS.subheading, color: COLORS.text, marginBottom: SPACING.md },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  statEmoji: { fontSize: 16, marginRight: SPACING.sm },
  statLabel: { ...FONTS.body, color: COLORS.textSecondary, flex: 1 },
  statValue: { ...FONTS.bodyBold, color: COLORS.text },
  hint: {
    ...FONTS.small,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});
