import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Button } from '../components/Button';
import { useGame } from '../context/GameContext';

export function HomeScreen({ navigation }: any) {
  const { dispatch } = useGame();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const iconScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(iconScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStart = () => {
    navigation.replace('CharacterSelect');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[styles.iconBlock, { opacity: fadeAnim, transform: [{ scale: iconScale }] }]}
        >
          <Text style={styles.buildingIcon}>🏢</Text>
        </Animated.View>

        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <Text style={styles.title}>9 to 5</Text>
          <Text style={styles.subtitle}>SURVIVE</Text>
          <View style={styles.divider} />
          <Text style={styles.tagline}>
            Navigate office politics.{'\n'}Protect your sanity.{'\n'}Get that raise.
          </Text>
        </Animated.View>

        <Animated.View style={[styles.buttonArea, { opacity: fadeAnim }]}>
          <Button title="Start Your Shift" onPress={handleStart} icon="☕" />
          <Text style={styles.hint}>5 days. Infinite regret.</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBlock: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  buildingIcon: {
    fontSize: 48,
  },
  title: {
    ...FONTS.title,
    fontSize: 42,
    color: COLORS.text,
    textAlign: 'center',
    letterSpacing: -1,
  },
  subtitle: {
    ...FONTS.title,
    fontSize: 18,
    color: COLORS.accent,
    textAlign: 'center',
    letterSpacing: 8,
    marginTop: SPACING.xs,
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: SPACING.lg,
  },
  tagline: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  buttonArea: {
    marginTop: SPACING.xxl,
    width: '100%',
    paddingHorizontal: SPACING.xl,
  },
  hint: {
    ...FONTS.small,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});
