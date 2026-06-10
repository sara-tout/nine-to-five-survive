import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useGame } from '../context/GameContext';

const BURNOUT_MESSAGES = [
  {
    title: 'Total Burnout',
    message:
      "You said yes to everything and now you're staring at your monitor like it personally wronged you. Your energy is gone. Your will to live-code is depleted.",
    tip: 'Saying no isn\'t career suicide—it\'s self-preservation.',
  },
  {
    title: 'Sanity: 404 Not Found',
    message:
      "Between the passive-aggressive Slack messages and the meeting that could've been an email, your brain has officially filed for divorce.",
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
  const { state, dispatch } = useGame();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const isBurnout = state.energy <= 0 || state.sanity <= 0;
  const msgIndex = state.energy <= 0 ? 0 : state.sanity <= 0 ? 1 : 2;
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
    dispatch({ type: 'RESET' });
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Animated.View
            style={[styles.iconWrap, { transform: [{ translateX: shakeAnim }] }]}
          >
            <Text style={styles.icon}>{isBurnout ? '🔥' : '📉'}</Text>
          </Animated.View>

          <Text style={styles.title}>{msg.title}</Text>
          <Text style={styles.subtitle}>Game Over</Text>

          <Card style={styles.messageCard}>
            <Text style={styles.message}>{msg.message}</Text>
          </Card>

          <View style={styles.tipBanner}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>{msg.tip}</Text>
          </View>

          <Card style={styles.statsCard}>
            <Text style={styles.statsTitle}>Final Stats</Text>
            <View style={styles.statRow}>
              <Text style={styles.statIcon}>⚡</Text>
              <Text style={styles.statLabel}>Energy</Text>
              <Text style={[styles.statValue, state.energy <= 0 && { color: COLORS.danger }]}>
                {Math.max(0, state.energy)}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statIcon}>🧠</Text>
              <Text style={styles.statLabel}>Sanity</Text>
              <Text style={[styles.statValue, state.sanity <= 0 && { color: COLORS.danger }]}>
                {Math.max(0, state.sanity)}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statIcon}>📊</Text>
              <Text style={styles.statLabel}>Performance</Text>
              <Text style={styles.statValue}>{state.performance}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statIcon}>📈</Text>
              <Text style={styles.statLabel}>Raise Progress</Text>
              <Text style={styles.statValue}>{state.raiseProgress}/50</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statIcon}>📅</Text>
              <Text style={styles.statLabel}>Days Survived</Text>
              <Text style={styles.statValue}>{state.currentDay}</Text>
            </View>
          </Card>

          <Button
            title="Try Again"
            onPress={handleRestart}
            icon="🔄"
            style={styles.restartBtn}
          />
          <Text style={styles.hint}>Every expert was once a burnout survivor.</Text>
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
  iconWrap: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  icon: { fontSize: 48 },
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
    marginBottom: SPACING.lg,
  },
  messageCard: { marginBottom: SPACING.md, width: '100%' },
  message: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  tipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accentLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.lg,
    width: '100%',
  },
  tipIcon: { fontSize: 20, marginRight: SPACING.sm },
  tipText: { ...FONTS.body, color: COLORS.accent, flex: 1 },
  statsCard: { marginBottom: SPACING.lg, width: '100%' },
  statsTitle: { ...FONTS.subheading, color: COLORS.text, marginBottom: SPACING.md },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  statIcon: { fontSize: 16, marginRight: SPACING.sm },
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
