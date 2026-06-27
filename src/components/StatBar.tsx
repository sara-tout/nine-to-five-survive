import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACING } from '../constants/theme';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
  bgColor: string;
  icon: string;
  showChange?: number;
  /** Draws a tick on the track to mark a meaningful line (e.g. the depletion threshold). */
  thresholdValue?: number;
}

export function StatBar({
  label,
  value,
  maxValue = 100,
  color,
  bgColor,
  icon,
  showChange,
  thresholdValue,
}: StatBarProps) {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const changeOpacity = useRef(new Animated.Value(0)).current;
  const pct = Math.max(0, Math.min(100, (value / maxValue) * 100));

  useEffect(() => {
    Animated.spring(widthAnim, {
      toValue: pct,
      friction: 8,
      tension: 40,
      useNativeDriver: false,
    }).start();
  }, [pct]);

  useEffect(() => {
    if (showChange !== undefined && showChange !== 0) {
      changeOpacity.setValue(1);
      Animated.timing(changeOpacity, {
        toValue: 0,
        duration: 2000,
        delay: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [showChange]);

  const isLow = pct <= 25;
  const thresholdPct =
    thresholdValue !== undefined
      ? Math.max(0, Math.min(100, (thresholdValue / maxValue) * 100))
      : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
          {label}
        </Text>
        {showChange !== undefined && showChange !== 0 && (
          <Animated.Text
            style={[
              styles.change,
              { color: showChange > 0 ? COLORS.success : COLORS.danger, opacity: changeOpacity },
            ]}
          >
            {showChange > 0 ? '+' : ''}
            {showChange}
          </Animated.Text>
        )}
      </View>
      <View style={styles.barRow}>
        <View style={[styles.track, { backgroundColor: bgColor }]}>
          <Animated.View
            style={[
              styles.fill,
              {
                backgroundColor: isLow ? COLORS.danger : color,
                width: widthAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
          {thresholdPct !== null && (
            <View style={[styles.threshold, { left: `${thresholdPct}%` }]} />
          )}
        </View>
        <Text style={[styles.value, isLow && { color: COLORS.danger }]} numberOfLines={1}>
          {Math.round(value)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.md },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  icon: { fontSize: 15, marginRight: 4 },
  label: { ...FONTS.caption, color: COLORS.textSecondary, flex: 1 },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  value: { ...FONTS.caption, fontWeight: '700', color: COLORS.text, minWidth: 20, textAlign: 'right' },
  change: { ...FONTS.caption, marginLeft: SPACING.xs },
  track: {
    flex: 1,
    height: 8,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: RADIUS.full,
  },
  threshold: {
    position: 'absolute',
    top: -1,
    bottom: -1,
    width: 2,
    backgroundColor: COLORS.text,
    opacity: 0.35,
  },
});
