import React, { useRef } from 'react';
import { Pressable, Text, StyleSheet, Animated, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, RADIUS, SPACING } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'large' | 'medium';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: string;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const variantStyles = {
    primary: { bg: COLORS.accent, text: COLORS.white, border: COLORS.accent },
    secondary: { bg: COLORS.white, text: COLORS.text, border: COLORS.cardBorder },
    danger: { bg: COLORS.danger, text: COLORS.white, border: COLORS.danger },
    ghost: { bg: 'transparent', text: COLORS.textSecondary, border: 'transparent' },
  };

  const v = variantStyles[variant];

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.base,
          {
            backgroundColor: v.bg,
            borderColor: v.border,
            paddingVertical: size === 'large' ? SPACING.md : SPACING.sm + 2,
          },
        ]}
      >
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <Text style={[styles.text, { color: v.text }, textStyle]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1.5,
  },
  text: { ...FONTS.bodyBold },
  icon: { fontSize: 18, marginRight: SPACING.sm },
});
