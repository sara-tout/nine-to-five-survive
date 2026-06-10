import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useGame } from '../context/GameContext';

const VICTORY_TITLES = [
  'The Art of Saying No',
  'Balanced & Promoted',
  'Corporate Jiu-Jitsu Master',
];

export function WinScreen({ navigation }: any) {
  const { state, dispatch } = useGame();
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
    dispatch({ type: 'RESET' });
    navigation.replace('Home');
  };

  const getGrade = () => {
    const total = state.energy + state.sanity + state.performance;
    if (total >= 200) return { grade: 'S', color: '#FFD700', label: 'Legendary Office Survivor' };
    if (total >= 150) return { grade: 'A', color: COLORS.success, label: 'Senior Survivor' };
    if (total >= 100) return { grade: 'B', color: COLORS.accent, label: 'Mid-Level Survivor' };
    return { grade: 'C', color: COLORS.energy, label: 'Junior Survivor (but hey, you made it)' };
  };

  const grade = getGrade();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
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
              your sanity—and it paid off. You played the game smarter, not harder. Your bank
              account thanks you. Your therapist is cautiously optimistic.
            </Text>
          </Card>

          <View style={styles.gradeWrap}>
            <View style={[styles.gradeBadge, { borderColor: grade.color }]}>
              <Text style={[styles.gradeText, { color: grade.color }]}>{grade.grade}</Text>
            </View>
            <Text style={styles.gradeLabel}>{grade.label}</Text>
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
            <View style={styles.statRow}>
              <Text style={styles.statEmoji}>📊</Text>
              <Text style={styles.statLabel}>Performance</Text>
              <Text style={styles.statValue}>{state.performance}/100</Text>
            </View>
            <View style={[styles.statRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.statEmoji}>📈</Text>
              <Text style={styles.statLabel}>Raise Progress</Text>
              <Text style={[styles.statValue, { color: COLORS.success }]}>
                {state.raiseProgress}/50 ✓
              </Text>
            </View>
          </Card>

          <Button
            title="Play Again"
            onPress={handleRestart}
            icon="🔄"
            style={styles.restartBtn}
          />
          <Text style={styles.hint}>
            Can you get an S rank? Different choices, different outcomes...
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
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
  restartBtn: { width: '100%' },
  hint: {
    ...FONTS.small,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});
