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
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, isLow && { color: COLORS.danger }]}>
          {Math.round(value)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.md },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  icon: { fontSize: 16, marginRight: SPACING.xs },
  label: { ...FONTS.caption, color: COLORS.textSecondary, flex: 1 },
  value: { ...FONTS.bodyBold, color: COLORS.text },
  change: { ...FONTS.caption, marginLeft: SPACING.xs },
  track: {
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
