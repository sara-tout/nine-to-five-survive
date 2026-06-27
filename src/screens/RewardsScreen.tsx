import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Card } from '../components/Card';
import { EMPLOYEE_REWARDS } from '../data/employeeRewards';
import { getEarnedRewardRecords, loadStreakData, StreakData } from '../storage/streakStorage';

export function RewardsScreen({ navigation }: any) {
  const [streak, setStreak] = useState<StreakData | null>(null);

  useEffect(() => {
    loadStreakData().then(setStreak);
  }, []);

  const earned = streak ? getEarnedRewardRecords(streak) : [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>Perks Vault</Text>
        <Text style={styles.subtitle}>
          Attendance rewards HR pretends are generous. Only the streak freeze changes gameplay; the
          rest are collectible flex (and grade flavor).
        </Text>

        {streak && (
          <Card style={styles.streakCard}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <View style={styles.streakInfo}>
              <Text style={styles.streakValue}>{streak.currentStreak} day streak</Text>
              <Text style={styles.streakMeta}>Best run: {streak.longestStreak} days</Text>
              {streak.streakFreezesAvailable > 0 && (
                <Text style={styles.freezeMeta}>
                  🧊 {streak.streakFreezesAvailable} streak freeze
                  {streak.streakFreezesAvailable === 1 ? '' : 's'} available
                </Text>
              )}
            </View>
          </Card>
        )}

        <Text style={styles.sectionTitle}>Earned perks</Text>
        {earned.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>
              No perks yet. Finish a shift each day to build your streak. First reward at 7 days.
            </Text>
          </Card>
        ) : (
          earned.map(({ reward, earnedAt }) => (
            <Card key={reward.id} style={styles.rewardCard}>
              <View style={styles.rewardHeader}>
                <Text style={styles.rewardEmoji}>{reward.emoji}</Text>
                <View style={styles.rewardText}>
                  <Text style={styles.rewardTitle}>{reward.title}</Text>
                  <Text style={styles.rewardPerk}>{reward.perk}</Text>
                </View>
              </View>
              <Text style={styles.rewardDescription}>{reward.description}</Text>
              <Text style={styles.rewardDate}>
                Earned {new Date(earnedAt).toLocaleDateString()} · {reward.days}-day milestone
              </Text>
              <Text style={styles.rewardFinePrint}>{reward.hrFinePrint}</Text>
            </Card>
          ))
        )}

        <Text style={styles.sectionTitle}>Milestone track</Text>
        {EMPLOYEE_REWARDS.map((reward) => {
          const unlocked = streak ? earned.some((e) => e.reward.id === reward.id) : false;
          return (
            <View key={reward.id} style={[styles.trackRow, unlocked && styles.trackRowUnlocked]}>
              <Text style={styles.trackEmoji}>{reward.emoji}</Text>
              <View style={styles.trackText}>
                <Text style={styles.trackTitle}>
                  {reward.days} days · {reward.title}
                </Text>
                <Text style={styles.trackPerk}>
                  {unlocked ? 'Unlocked' : reward.perk}
                  {reward.kind === 'mechanical' ? ' · active perk' : ' · collectible'}
                </Text>
              </View>
              <Text style={styles.trackStatus}>{unlocked ? '✓' : '🔒'}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  backBtn: { marginBottom: SPACING.md },
  backText: { ...FONTS.bodyBold, color: COLORS.accent },
  title: { ...FONTS.heading, color: COLORS.text },
  subtitle: { ...FONTS.body, color: COLORS.textSecondary, marginTop: SPACING.xs, marginBottom: SPACING.lg },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  streakEmoji: { fontSize: 32 },
  streakInfo: { flex: 1 },
  streakValue: { ...FONTS.subheading, color: COLORS.text },
  streakMeta: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 2 },
  freezeMeta: { ...FONTS.caption, color: COLORS.accent, marginTop: 4, fontWeight: '600' },
  sectionTitle: { ...FONTS.subheading, color: COLORS.text, marginBottom: SPACING.sm },
  emptyText: { ...FONTS.body, color: COLORS.textSecondary, lineHeight: 24 },
  rewardCard: { marginBottom: SPACING.md },
  rewardHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginBottom: SPACING.sm },
  rewardEmoji: { fontSize: 36 },
  rewardText: { flex: 1 },
  rewardTitle: { ...FONTS.bodyBold, color: COLORS.text },
  rewardPerk: { ...FONTS.caption, color: COLORS.success, marginTop: 2 },
  rewardDescription: { ...FONTS.body, color: COLORS.textSecondary, lineHeight: 22 },
  rewardDate: { ...FONTS.caption, color: COLORS.textMuted, marginTop: SPACING.sm },
  rewardFinePrint: { ...FONTS.small, color: COLORS.textMuted, marginTop: SPACING.xs, fontStyle: 'italic' },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    opacity: 0.75,
  },
  trackRowUnlocked: {
    opacity: 1,
    borderColor: COLORS.success,
    backgroundColor: COLORS.successBg,
  },
  trackEmoji: { fontSize: 24, marginRight: SPACING.sm },
  trackText: { flex: 1 },
  trackTitle: { ...FONTS.bodyBold, color: COLORS.text },
  trackPerk: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 2 },
  trackStatus: { fontSize: 18 },
});
