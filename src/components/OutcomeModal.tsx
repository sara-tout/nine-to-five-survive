import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Outcome } from '../data/scenarios';
import { getOutcomeTone } from '../utils/outcomeTone';

interface OutcomeModalProps {
  outcome: Outcome;
  choiceLabel: string;
  onContinue: () => void;
}

function StatPill({ label, value, icon }: { label: string; value: number; icon: string }) {
  if (value === 0) return null;
  const positive = value > 0;
  return (
    <View style={[pillStyles.pill, { backgroundColor: positive ? COLORS.successBg : COLORS.dangerBg }]}>
      <Text style={pillStyles.icon}>{icon}</Text>
      <Text style={[pillStyles.value, { color: positive ? COLORS.success : COLORS.danger }]}>
        {positive ? '+' : ''}{value}
      </Text>
      <Text style={pillStyles.label}>{label}</Text>
    </View>
  );
}

const pillStyles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  icon: { fontSize: 14, marginRight: SPACING.xs },
  value: { ...FONTS.bodyBold, marginRight: SPACING.xs },
  label: { ...FONTS.caption, color: COLORS.textSecondary },
});

export function OutcomeModal({ outcome, choiceLabel, onContinue }: OutcomeModalProps) {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const maxModalHeight = Math.min(windowHeight * 0.92, windowHeight - insets.top - 16);
  const maxScrollHeight = Math.max(180, maxModalHeight - 120);

  const { tone, badge, emoji } = getOutcomeTone(outcome);
  const isPositiveTone = tone === 'great' || tone === 'good';
  const isMixedTone = tone === 'mixed';

  return (
    <View style={styles.overlay}>
      <View style={styles.backdrop} />
      <View style={styles.modalPositioner}>
        <View style={[styles.modal, { maxHeight: maxModalHeight, paddingBottom: SPACING.lg + insets.bottom }]}>
          <View style={styles.handleBar} />

          <ScrollView
            style={[styles.scrollArea, { maxHeight: maxScrollHeight }]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerRow}>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: isPositiveTone
                      ? COLORS.successBg
                      : isMixedTone
                        ? COLORS.accentLight
                        : COLORS.dangerBg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    {
                      color: isPositiveTone
                        ? COLORS.success
                        : isMixedTone
                          ? COLORS.accent
                          : COLORS.danger,
                    },
                  ]}
                >
                  {badge}
                </Text>
              </View>
              <Text style={styles.choiceLabelText}>You chose: {choiceLabel}</Text>
            </View>

            <View style={styles.emojiWrap}>
              <Text style={styles.emoji}>{emoji}</Text>
            </View>

            <View style={styles.narrativeBox}>
              <Text style={styles.narrative}>{outcome.narrative}</Text>
            </View>

            {outcome.contextNote ? (
              <View style={styles.contextBox}>
                <Text style={styles.contextTitle}>Office gossip</Text>
                <Text style={styles.contextText}>{outcome.contextNote}</Text>
              </View>
            ) : null}

            <Text style={styles.impactTitle}>Impact</Text>
            <View style={styles.pillRow}>
              <StatPill label="Energy" value={outcome.energy} icon="⚡" />
              <StatPill label="Sanity" value={outcome.sanity} icon="🧠" />
              <StatPill label="Performance" value={outcome.performance + outcome.raiseProgress} icon="📊" />
            </View>
          </ScrollView>

          <View style={styles.buttonArea}>
            <Pressable
              onPress={onContinue}
              style={({ pressed }) => [
                styles.continueBtn,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={styles.continueBtnText}>→ Continue</Text>
            </Pressable>
          </View>
        </View>
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
    zIndex: 9999,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalPositioner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
    zIndex: 10000,
  },
  handleBar: {
    width: 36,
    height: 4,
    backgroundColor: COLORS.cardBorder,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: SPACING.md,
  },
  scrollArea: {
    flexShrink: 1,
    marginBottom: SPACING.md,
  },
  scrollContent: {
    paddingBottom: SPACING.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
  },
  badgeText: { ...FONTS.bodyBold },
  choiceLabelText: { ...FONTS.caption, color: COLORS.textMuted, flex: 1 },
  emojiWrap: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  emoji: { fontSize: 32 },
  narrativeBox: {
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  narrative: {
    ...FONTS.body,
    color: COLORS.text,
    lineHeight: 24,
    textAlign: 'center',
  },
  contextBox: {
    backgroundColor: COLORS.accentLight,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  contextTitle: {
    ...FONTS.caption,
    color: COLORS.accent,
    fontWeight: '700',
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contextText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  impactTitle: {
    ...FONTS.subheading,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonArea: {
    paddingTop: SPACING.sm,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.accent,
  },
  continueBtnText: { ...FONTS.bodyBold, color: COLORS.white },
});
