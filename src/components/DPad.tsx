import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACING } from '../constants/theme';

interface DPadProps {
  onMove: (dx: number, dy: number) => void;
  onInteract: () => void;
  canInteract: boolean;
}

function DirButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.dirBtn, pressed && styles.dirBtnPressed]}
    >
      <Text style={styles.dirText}>{label}</Text>
    </Pressable>
  );
}

export function DPad({ onMove, onInteract, canInteract }: DPadProps) {
  return (
    <View style={styles.container}>
      <View style={styles.dpad}>
        <View style={styles.row}>
          <View style={styles.spacer} />
          <DirButton label="▲" onPress={() => onMove(0, -1)} />
          <View style={styles.spacer} />
        </View>
        <View style={styles.row}>
          <DirButton label="◀" onPress={() => onMove(-1, 0)} />
          <View style={styles.center} />
          <DirButton label="▶" onPress={() => onMove(1, 0)} />
        </View>
        <View style={styles.row}>
          <View style={styles.spacer} />
          <DirButton label="▼" onPress={() => onMove(0, 1)} />
          <View style={styles.spacer} />
        </View>
      </View>

      <Pressable
        onPress={() => {
          if (canInteract) onInteract();
        }}
        disabled={!canInteract}
        style={({ pressed }) => [
          styles.interactBtn,
          canInteract && styles.interactBtnActive,
          pressed && canInteract && styles.interactBtnPressed,
          !canInteract && styles.interactBtnDisabled,
        ]}
      >
        <Text style={styles.interactIcon}>💬</Text>
        <Text style={[styles.interactText, canInteract && styles.interactTextActive]}>
          Interact
        </Text>
      </Pressable>
    </View>
  );
}

const BTN_SIZE = 48;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  dpad: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: BTN_SIZE,
    height: BTN_SIZE,
  },
  center: {
    width: BTN_SIZE,
    height: BTN_SIZE,
  },
  dirBtn: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  dirBtnPressed: {
    backgroundColor: COLORS.accentLight,
    borderColor: COLORS.accent,
  },
  dirText: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  interactBtn: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  interactBtnDisabled: {
    opacity: 0.4,
  },
  interactBtnActive: {
    backgroundColor: COLORS.accentLight,
    borderColor: COLORS.accent,
    opacity: 1,
  },
  interactBtnPressed: {
    backgroundColor: COLORS.accent,
  },
  interactIcon: {
    fontSize: 20,
    marginBottom: SPACING.xs,
  },
  interactText: {
    ...FONTS.caption,
    color: COLORS.textMuted,
  },
  interactTextActive: {
    color: COLORS.accent,
    fontWeight: '700',
  },
});
