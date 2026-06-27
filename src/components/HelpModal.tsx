import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { RAISE_THRESHOLD, TOTAL_DAYS } from '../context/GameContext';
import { LOW_STAT_THRESHOLD, PREP_ENERGY_COST } from '../data/scenarioContext';

interface HelpModalProps {
  onDismiss: () => void;
}

interface HelpItem {
  emoji: string;
  title: string;
  body: string;
}

const ITEMS: HelpItem[] = [
  {
    emoji: '⚡',
    title: 'Energy',
    body: `How much gas is left in the tank. Hard choices drain it. If it falls below ${LOW_STAT_THRESHOLD} (the line on the bar) your judgment slips: good outcomes get less likely and wins land smaller. Hit zero and your run ends.`,
  },
  {
    emoji: '🧠',
    title: 'Sanity',
    body: `Your composure. Stressful, draining scenarios chip away at it. Drop below ${LOW_STAT_THRESHOLD} and outcomes degrade just like low energy. Hit zero and you burn out.`,
  },
  {
    emoji: '📊',
    title: 'Performance',
    body: 'How leadership sees your work. This is the score that earns the raise. Good outcomes raise it, bad ones lower it.',
  },
  {
    emoji: '📈',
    title: 'Raise goal',
    body: `Reach ${RAISE_THRESHOLD} performance by the end of ${TOTAL_DAYS} days to win the raise, without burning out energy or sanity first.`,
  },
  {
    emoji: '🌤️',
    title: 'Office mood',
    body: 'The day\'s climate. It quietly tilts which outcomes are more likely for that day\'s decision. Read it before you commit.',
  },
  {
    emoji: '⭐',
    title: 'Perk',
    body: 'The strength you picked at the start. It passively helps every day, e.g. softening damage or improving your odds on a certain kind of choice. The chip up top reminds you which one you have, and Read the room shows what it does for the choice in front of you.',
  },
  {
    emoji: '👀',
    title: 'Read the room',
    body: 'A quick list of what is helping or hurting you for this decision. Green is working for you, amber is a caution, red is working against you.',
  },
  {
    emoji: '🎯',
    title: 'Prepare',
    body: `Spend ${PREP_ENERGY_COST} energy before deciding to improve your odds of a good outcome on that scenario. Worth it when the stakes are high and you have energy to spare.`,
  },
  {
    emoji: '⚠️',
    title: 'Run-ending choices',
    body: 'A choice marked "Could end your run" can push energy or sanity to zero in one bad swing. High risk, sometimes high reward.',
  },
];

export function HelpModal({ onDismiss }: HelpModalProps) {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.kicker}>Quick reference</Text>
        <Text style={styles.heading}>What affects what</Text>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator
        >
          {ITEMS.map((item) => (
            <View key={item.title} style={styles.row}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <View style={styles.text}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <Pressable onPress={onDismiss} style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}>
          <Text style={styles.buttonText}>Got it</Text>
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
    maxWidth: 400,
    maxHeight: '85%',
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
    marginBottom: SPACING.md,
  },
  scroll: { flexGrow: 0 },
  scrollContent: { paddingBottom: SPACING.xs },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  emoji: { fontSize: 22, marginTop: 2, width: 28, textAlign: 'center' },
  text: { flex: 1 },
  title: { ...FONTS.bodyBold, color: COLORS.text },
  body: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 2, lineHeight: 18 },
  button: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  buttonText: { ...FONTS.bodyBold, color: COLORS.white },
});
