import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { StatBar } from '../components/StatBar';
import { useGame, TOTAL_DAYS, RAISE_THRESHOLD } from '../context/GameContext';

const DAY_END_QUIPS = [
  'You survived another day. Your houseplant is proud.',
  'Clock out. Touch grass. Forget Slack exists.',
  'Another day, another dollar (before taxes).',
  'You made it. Time for a well-deserved existential crisis.',
  'Tomorrow is another chance to pretend you read the standup notes.',
];

export function DayEndScreen({ navigation }: any) {
  const { state, dispatch } = useGame();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const isLastDay = state.currentDay >= TOTAL_DAYS;
  const lastResult = state.dayResults[state.dayResults.length - 1];
  const quip = DAY_END_QUIPS[state.currentDay - 1] || DAY_END_QUIPS[0];

  const handleNext = () => {
    if (isLastDay) {
      if (state.raiseProgress >= RAISE_THRESHOLD) {
        navigation.replace('Win');
      } else {
        navigation.replace('GameOver');
      }
    } else {
      dispatch({ type: 'NEXT_DAY' });
      navigation.replace('Office');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.headerWrap}>
            <Text style={styles.clockIcon}>🕐</Text>
            <Text style={styles.title}>Day {state.currentDay} Complete</Text>
            <Text style={styles.quip}>{quip}</Text>
          </View>

          <Card style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>End-of-Day Report</Text>

            <StatBar
              label="Energy"
              value={state.energy}
              color={COLORS.energy}
              bgColor={COLORS.energyBg}
              icon="⚡"
              showChange={lastResult?.outcome.energy}
            />
            <StatBar
              label="Sanity"
              value={state.sanity}
              color={COLORS.sanity}
              bgColor={COLORS.sanityBg}
              icon="🧠"
              showChange={lastResult?.outcome.sanity}
            />
            <StatBar
              label="Performance"
              value={state.performance}
              color={COLORS.performance}
              bgColor={COLORS.performanceBg}
              icon="📊"
              showChange={lastResult?.outcome.performance}
            />

            <View style={styles.raiseSummary}>
              <Text style={styles.raiseLabel}>📈 Raise Progress</Text>
              <View style={styles.raiseTrack}>
                <View
                  style={[
                    styles.raiseFill,
                    { width: `${Math.min(100, (state.raiseProgress / RAISE_THRESHOLD) * 100)}%` },
                  ]}
                />
              </View>
              <Text style={styles.raisePct}>
                {state.raiseProgress}/{RAISE_THRESHOLD}
              </Text>
            </View>
          </Card>

          {lastResult && (
            <Card style={styles.decisionCard}>
              <Text style={styles.decisionTitle}>Today's Decision</Text>
              <View style={styles.decisionRow}>
                <Text style={styles.decisionIcon}>{lastResult.scenario.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.decisionName}>{lastResult.scenario.title}</Text>
                  <Text style={styles.decisionChoice}>
                    You chose:{' '}
                    {lastResult.choice === 'yes'
                      ? lastResult.scenario.yesLabel
                      : lastResult.scenario.noLabel}
                  </Text>
                </View>
              </View>
            </Card>
          )}

          {state.energy <= 25 && (
            <View style={styles.warningBanner}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.warningText}>
                Energy critically low. One more bad decision and you're toast.
              </Text>
            </View>
          )}

          {state.sanity <= 25 && (
            <View style={styles.warningBanner}>
              <Text style={styles.warningIcon}>🧠</Text>
              <Text style={styles.warningText}>
                Sanity is hanging by a thread. Maybe skip the Slack drama tomorrow.
              </Text>
            </View>
          )}

          <Button
            title={isLastDay ? 'See Final Results' : 'Start Day ' + (state.currentDay + 1)}
            onPress={handleNext}
            icon={isLastDay ? '🏁' : '☀️'}
            style={styles.nextBtn}
          />

          {!isLastDay && (
            <Text style={styles.daysLeft}>
              {TOTAL_DAYS - state.currentDay} day{TOTAL_DAYS - state.currentDay > 1 ? 's' : ''} remaining
            </Text>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  headerWrap: { alignItems: 'center', marginBottom: SPACING.xl },
  clockIcon: { fontSize: 48, marginBottom: SPACING.sm },
  title: { ...FONTS.heading, color: COLORS.text, marginBottom: SPACING.xs },
  quip: { ...FONTS.body, color: COLORS.textSecondary, textAlign: 'center' },
  summaryCard: { marginBottom: SPACING.md },
  summaryTitle: { ...FONTS.subheading, color: COLORS.text, marginBottom: SPACING.md },
  raiseSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  raiseLabel: { ...FONTS.caption, color: COLORS.textSecondary, marginRight: SPACING.sm },
  raiseTrack: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.raiseBg,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  raiseFill: {
    height: '100%',
    backgroundColor: COLORS.raise,
    borderRadius: RADIUS.full,
  },
  raisePct: { ...FONTS.caption, color: COLORS.textSecondary, marginLeft: SPACING.sm },
  decisionCard: { marginBottom: SPACING.md },
  decisionTitle: { ...FONTS.caption, color: COLORS.textMuted, marginBottom: SPACING.sm },
  decisionRow: { flexDirection: 'row', alignItems: 'center' },
  decisionIcon: { fontSize: 32, marginRight: SPACING.md },
  decisionName: { ...FONTS.bodyBold, color: COLORS.text },
  decisionChoice: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 2 },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.dangerBg,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  warningIcon: { fontSize: 20, marginRight: SPACING.sm },
  warningText: { ...FONTS.caption, color: COLORS.danger, flex: 1 },
  nextBtn: { width: '100%', marginTop: SPACING.sm },
  daysLeft: {
    ...FONTS.small,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});
