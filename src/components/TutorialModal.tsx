import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { RAISE_THRESHOLD, TOTAL_DAYS } from '../context/GameContext';

interface TutorialModalProps {
  onDismiss: () => void;
}

const TIPS = [
  {
    emoji: '🗓️',
    title: `${TOTAL_DAYS} days per shift`,
    body: 'Walk the office, find the highlighted spot, and make one decision each day.',
  },
  {
    emoji: '📈',
    title: `Get performance to ${RAISE_THRESHOLD}`,
    body: 'Every choice feeds your performance score. End the week at the bar and the raise is yours. Burn out energy or sanity and calibration wins.',
  },
  {
    emoji: '🌤️',
    title: 'Office mood matters',
    body: 'Each day has a climate that nudges certain scenarios. Watch for the "Today" hint.',
  },
  {
    emoji: '🔥',
    title: 'Daily streak perks',
    body: 'Finish one shift per calendar day to build streak and unlock employee rewards.',
  },
];

export function TutorialModal({ onDismiss }: TutorialModalProps) {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.kicker}>First day onboarding</Text>
        <Text style={styles.heading}>How to survive</Text>

        {TIPS.map((tip) => (
          <View key={tip.title} style={styles.tipRow}>
            <Text style={styles.tipEmoji}>{tip.emoji}</Text>
            <View style={styles.tipText}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipBody}>{tip.body}</Text>
            </View>
          </View>
        ))}

        <Pressable onPress={onDismiss} style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}>
          <Text style={styles.buttonText}>Clock in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
    zIndex: 10000,
  },
  modal: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    width: '100%',
    maxWidth: 380,
  },
  kicker: {
    ...FONTS.caption,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  heading: {
    ...FONTS.heading,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  tipRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  tipEmoji: { fontSize: 24, marginTop: 2 },
  tipText: { flex: 1 },
  tipTitle: { ...FONTS.bodyBold, color: COLORS.text },
  tipBody: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 2, lineHeight: 18 },
  button: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  buttonText: { ...FONTS.bodyBold, color: COLORS.white },
});
