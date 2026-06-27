import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Button } from './Button';

interface EndRunFooterProps {
  primaryTitle: string;
  primaryIcon?: string;
  onPrimary: () => void;
  onLeaderboard: () => void;
  onHome: () => void;
}

export function EndRunFooter({
  primaryTitle,
  primaryIcon,
  onPrimary,
  onLeaderboard,
  onHome,
}: EndRunFooterProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footer, { paddingBottom: Math.max(SPACING.lg, insets.bottom) }]}>
      <Button title={primaryTitle} onPress={onPrimary} icon={primaryIcon} style={styles.primaryBtn} />
      <View style={styles.secondaryRow}>
        <Pressable
          onPress={onLeaderboard}
          style={({ pressed }) => [styles.secondaryBtn, pressed && styles.secondaryPressed]}
        >
          <Text style={styles.secondaryText}>🏆 Leaderboard</Text>
        </Pressable>
        <Pressable
          onPress={onHome}
          style={({ pressed }) => [styles.secondaryBtn, pressed && styles.secondaryPressed]}
        >
          <Text style={styles.secondaryText}>🏠 Home</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    backgroundColor: COLORS.bg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  primaryBtn: { width: '100%' },
  secondaryRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  secondaryBtn: {
    flex: 1,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryPressed: { opacity: 0.85 },
  secondaryText: { ...FONTS.bodyBold, color: COLORS.text },
});
