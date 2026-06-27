import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { EmployeeReward } from '../data/employeeRewards';

interface RewardUnlockModalProps {
  reward: EmployeeReward;
  streakDays: number;
  onDismiss: () => void;
}

export function RewardUnlockModal({ reward, streakDays, onDismiss }: RewardUnlockModalProps) {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.kicker}>Employee perk unlocked</Text>
        <Text style={styles.emoji}>{reward.emoji}</Text>
        <Text style={styles.title}>{reward.title}</Text>
        <Text style={styles.perk}>{reward.perk}</Text>
        <Text style={styles.description}>{reward.description}</Text>
        <Text style={styles.streakLine}>{streakDays}-day attendance streak</Text>
        <Text style={styles.finePrint}>{reward.hrFinePrint}</Text>
        <Pressable onPress={onDismiss} style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
        <Text style={styles.hint}>Tap Continue, then Play Again below.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
    zIndex: 10001,
  },
  modal: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  kicker: {
    ...FONTS.caption,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  emoji: { fontSize: 56, marginBottom: SPACING.sm },
  title: { ...FONTS.heading, color: COLORS.text, textAlign: 'center' },
  perk: { ...FONTS.subheading, color: COLORS.success, marginTop: SPACING.xs, textAlign: 'center' },
  description: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.md,
    lineHeight: 24,
  },
  streakLine: {
    ...FONTS.caption,
    color: COLORS.text,
    marginTop: SPACING.md,
    fontWeight: '700',
  },
  finePrint: {
    ...FONTS.small,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  button: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { ...FONTS.bodyBold, color: COLORS.white },
  hint: {
    ...FONTS.small,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 18,
  },
});
