import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Scenario } from '../data/scenarios';

interface ScenarioModalProps {
  scenario: Scenario;
  onChoose: (choice: 'yes' | 'no') => void;
}

export function ScenarioModal({ scenario, onChoose }: ScenarioModalProps) {
  return (
    <View style={styles.overlay}>
      <View style={styles.backdrop} />
      <View style={styles.modalPositioner}>
        <View style={styles.modal}>
          <View style={styles.handleBar} />

          <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={styles.iconWrap}>
                <Text style={styles.icon}>{scenario.icon}</Text>
              </View>
              <View>
                <Text style={styles.locationLabel}>{scenario.locationLabel}</Text>
                <Text style={styles.timeText}>{scenario.time}</Text>
              </View>
            </View>

            <Text style={styles.title}>{scenario.title}</Text>
            <Text style={styles.description}>{scenario.description}</Text>
          </ScrollView>

          <View style={styles.buttonsArea}>
            <Pressable
              onPress={() => onChoose('yes')}
              style={({ pressed }) => [
                styles.choiceBtn,
                styles.yesBtn,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={styles.btnEmoji}>👍</Text>
              <Text style={styles.yesBtnText}>{scenario.yesLabel}</Text>
            </Pressable>

            <Pressable
              onPress={() => onChoose('no')}
              style={({ pressed }) => [
                styles.choiceBtn,
                styles.noBtn,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={styles.btnEmoji}>✋</Text>
              <Text style={styles.noBtnText}>{scenario.noLabel}</Text>
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
    paddingBottom: SPACING.lg,
    maxHeight: '70%',
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
  buttonsArea: {
    gap: SPACING.sm,
  },
  choiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
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
});
