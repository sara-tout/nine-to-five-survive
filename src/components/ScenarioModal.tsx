import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { CharacterRole } from '../data/characters';
import { DayModifierId, getDayModifier, getMoodScenarioHint } from '../data/dayModifiers';
import { Scenario } from '../data/scenarios';
import { getNPC } from '../data/officeNPCs';
import { getScenarioChoiceLabels, getScenarioDescription } from '../data/scenarioText';
import { ChoiceRisk, Factor, FactorTone } from '../data/strategy';

interface ScenarioModalProps {
  scenario: Scenario;
  playerRole: CharacterRole;
  dayModifier: DayModifierId;
  factors: Factor[];
  yesRisk: ChoiceRisk;
  noRisk: ChoiceRisk;
  prepared: boolean;
  canPrepare: boolean;
  prepCost: number;
  onPrepare: () => void;
  onChoose: (choice: 'yes' | 'no') => void;
}

const FACTOR_COLORS: Record<FactorTone, string> = {
  good: '#1F8A4C',
  bad: '#C2410C',
  warn: '#B45309',
};

/** Only surface a tag when it actually matters; a steady choice shows nothing. */
function riskLabel(risk: ChoiceRisk): string | null {
  const parts: string[] = [];
  if (risk.level === 'swingy') parts.push('Swingy');
  if (risk.canBurnout) parts.push('\u26a0 Could end your run');
  return parts.length ? parts.join(' \u00b7 ') : null;
}

export function ScenarioModal({
  scenario,
  playerRole,
  dayModifier,
  factors,
  yesRisk,
  noRisk,
  prepared,
  canPrepare,
  prepCost,
  onPrepare,
  onChoose,
}: ScenarioModalProps) {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const maxModalHeight = Math.min(windowHeight * 0.88, windowHeight - insets.top - 24);
  const maxScrollHeight = Math.max(160, maxModalHeight - 180);

  const npc = scenario.npcId ? getNPC(scenario.npcId) : undefined;
  const description = getScenarioDescription(scenario, playerRole);
  const choiceLabels = getScenarioChoiceLabels(scenario, playerRole);
  const mood = getDayModifier(dayModifier);
  const moodHint = getMoodScenarioHint(dayModifier, scenario.id);
  const yesRiskLabel = riskLabel(yesRisk);
  const noRiskLabel = riskLabel(noRisk);

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
            <View style={styles.header}>
              <View style={styles.iconWrap}>
                <Text style={styles.icon}>{scenario.icon}</Text>
              </View>
              <View>
                <Text style={styles.locationLabel}>{scenario.locationLabel}</Text>
                <Text style={styles.timeText}>{scenario.time}</Text>
              </View>
            </View>

            <View style={[styles.moodBadge, moodHint && styles.moodBadgeActive]}>
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <View style={styles.moodTextWrap}>
                <Text style={styles.moodLabel}>Office mood: {mood.label}</Text>
                <Text style={styles.moodDescription}>{mood.description}</Text>
                {moodHint && <Text style={styles.moodEffect}>Today: {moodHint}</Text>}
              </View>
            </View>

            {npc && (
              <View style={styles.npcBadge}>
                <Text style={styles.npcEmoji}>{npc.emoji}</Text>
                <View>
                  <Text style={styles.npcName}>{npc.name}</Text>
                  <Text style={styles.npcTitle}>{npc.title}</Text>
                </View>
              </View>
            )}

            <Text style={styles.title}>{scenario.title}</Text>
            <Text style={styles.description}>{description}</Text>

            {factors.length > 0 && (
              <View style={styles.factorsCard}>
                <Text style={styles.factorsHeader}>Read the room</Text>
                {factors.map((factor, i) => (
                  <View key={i} style={styles.factorRow}>
                    <View style={[styles.factorDot, { backgroundColor: FACTOR_COLORS[factor.tone] }]} />
                    <Text style={styles.factorText}>{factor.text}</Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>

          <View style={styles.buttonsArea}>
            <Pressable
              onPress={onPrepare}
              disabled={prepared || !canPrepare}
              style={({ pressed }) => [
                styles.prepBtn,
                prepared && styles.prepBtnDone,
                !prepared && !canPrepare && styles.prepBtnDisabled,
                pressed && !prepared && canPrepare && { opacity: 0.7 },
              ]}
            >
              <Text style={[styles.prepText, prepared && styles.prepTextDone]}>
                {prepared
                  ? '\u2713 Prepared \u00b7 better odds this scenario'
                  : canPrepare
                    ? `\ud83c\udfaf Prepare (\u2212${prepCost} energy) for better odds`
                    : 'Too drained to prepare'}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => onChoose('yes')}
              style={({ pressed }) => [
                styles.choiceBtn,
                styles.yesBtn,
                pressed && { opacity: 0.7 },
              ]}
            >
              <View style={styles.choiceTop}>
                <Text style={styles.btnEmoji}>👍</Text>
                <Text style={styles.yesBtnText}>{choiceLabels.yes}</Text>
              </View>
              {yesRiskLabel && (
                <View style={[styles.riskChip, styles.riskChipLight, yesRisk.canBurnout && styles.riskChipDangerLight]}>
                  <Text style={[styles.riskChipText, styles.riskChipTextLight, yesRisk.canBurnout && styles.riskChipTextDangerLight]}>
                    {yesRiskLabel}
                  </Text>
                </View>
              )}
            </Pressable>

            <Pressable
              onPress={() => onChoose('no')}
              style={({ pressed }) => [
                styles.choiceBtn,
                styles.noBtn,
                pressed && { opacity: 0.7 },
              ]}
            >
              <View style={styles.choiceTop}>
                <Text style={styles.btnEmoji}>✋</Text>
                <Text style={styles.noBtnText}>{choiceLabels.no}</Text>
              </View>
              {noRiskLabel && (
                <View style={[styles.riskChip, noRisk.canBurnout && styles.riskChipDanger]}>
                  <Text style={[styles.riskChipText, noRisk.canBurnout && styles.riskChipTextDanger]}>
                    {noRiskLabel}
                  </Text>
                </View>
              )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 24 },
  locationLabel: {
    ...FONTS.caption,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  timeText: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 2 },
  moodBadge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    backgroundColor: COLORS.accentLight,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  moodEmoji: { fontSize: 22, marginTop: 1 },
  moodTextWrap: { flex: 1 },
  moodLabel: { ...FONTS.caption, color: COLORS.accent, fontWeight: '700' },
  moodDescription: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 2, lineHeight: 18 },
  moodBadgeActive: {
    borderColor: COLORS.accent,
    backgroundColor: '#F0F7FF',
  },
  moodEffect: {
    ...FONTS.caption,
    color: COLORS.accent,
    marginTop: 6,
    lineHeight: 18,
    fontWeight: '600',
  },
  npcBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  npcEmoji: { fontSize: 24 },
  npcName: { ...FONTS.bodyBold, color: COLORS.text },
  npcTitle: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 1 },
  title: {
    ...FONTS.heading,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  description: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  factorsCard: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.sm,
    gap: 6,
  },
  factorsHeader: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: 2,
  },
  factorRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  factorDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 6,
  },
  factorText: { ...FONTS.caption, color: COLORS.text, flex: 1, lineHeight: 18 },
  buttonsArea: {
    gap: SPACING.sm,
  },
  prepBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    borderStyle: 'dashed',
    backgroundColor: COLORS.accentLight,
  },
  prepBtnDone: {
    borderStyle: 'solid',
    borderColor: '#1F8A4C',
    backgroundColor: '#E9F7EF',
  },
  prepBtnDisabled: {
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.bg,
  },
  prepText: { ...FONTS.caption, color: COLORS.accent, fontWeight: '700' },
  prepTextDone: { color: '#1F8A4C' },
  choiceBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    gap: 3,
  },
  choiceTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yesBtn: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  noBtn: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.cardBorder,
  },
  btnEmoji: { fontSize: 18, marginRight: SPACING.sm },
  yesBtnText: { ...FONTS.bodyBold, color: COLORS.white },
  noBtnText: { ...FONTS.bodyBold, color: COLORS.text },
  riskChip: {
    marginTop: 2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bg,
  },
  riskChipLight: { backgroundColor: 'rgba(255,255,255,0.18)' },
  riskChipDanger: { backgroundColor: '#FBE4D8' },
  riskChipDangerLight: { backgroundColor: 'rgba(255,255,255,0.25)' },
  riskChipText: { ...FONTS.small, color: COLORS.textSecondary, fontWeight: '700' },
  riskChipTextLight: { color: 'rgba(255,255,255,0.92)' },
  riskChipTextDanger: { color: '#C2410C' },
  riskChipTextDangerLight: { color: '#FFE2D1' },
});
