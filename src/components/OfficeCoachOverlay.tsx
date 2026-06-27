import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

interface OfficeCoachOverlayProps {
  onDismiss: () => void;
}

const STEPS = [
  {
    title: 'Head to the pulsing tile',
    body: 'Use the D-pad at the bottom to move. The path hint shows which way to go.',
  },
  {
    title: 'Interact when you are next to it',
    body: 'Tap Interact when you are beside the spot and the button lights up.',
  },
  {
    title: 'Choose carefully. Outcomes vary',
    body: 'Energy, sanity, and performance all matter. Watch the raise bar. Office climate shifts the odds.',
  },
];

export function OfficeCoachOverlay({ onDismiss }: OfficeCoachOverlayProps) {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>First day on the floor</Text>
        {STEPS.map((step, i) => (
          <View key={step.title} style={styles.step}>
            <Text style={styles.stepNum}>{i + 1}</Text>
            <View style={styles.stepBody}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepText}>{step.body}</Text>
            </View>
          </View>
        ))}
        <Pressable onPress={onDismiss} style={({ pressed }) => [styles.btn, pressed && { opacity: 0.85 }]}>
          <Text style={styles.btnText}>Got it, let me survive</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: SPACING.lg,
    zIndex: 9000,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
  },
  title: { ...FONTS.heading, color: COLORS.text, marginBottom: SPACING.md },
  step: { flexDirection: 'row', marginBottom: SPACING.md, gap: SPACING.sm },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.accentLight,
    color: COLORS.accent,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '700',
    overflow: 'hidden',
  },
  stepBody: { flex: 1 },
  stepTitle: { ...FONTS.bodyBold, color: COLORS.text },
  stepText: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 2, lineHeight: 20 },
  btn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  btnText: { ...FONTS.bodyBold, color: COLORS.white },
});
