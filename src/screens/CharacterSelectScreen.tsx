import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Button } from '../components/Button';
import { CHARACTERS } from '../data/characters';
import { useGame } from '../context/GameContext';

export function CharacterSelectScreen({ navigation }: any) {
  const { dispatch, startGame, unplayedScenarioCount, unplayedMoodCount } = useGame();
  const [selected, setSelected] = useState(0);
  const [starting, setStarting] = useState(false);

  const handleConfirm = async () => {
    if (starting) return;
    setStarting(true);
    dispatch({
      type: 'SELECT_CHARACTER',
      role: CHARACTERS[selected].role,
      emoji: CHARACTERS[selected].emoji,
    });
    await startGame();
    setStarting(false);
    navigation.replace('Office');
  };

  const char = CHARACTERS[selected];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Fighter</Text>
          <Text style={styles.subtitle}>Who are you today? Scenarios adapt lightly to your role.</Text>
        </View>

        <View style={styles.grid}>
          {CHARACTERS.map((c, i) => (
            <Pressable
              key={c.name}
              onPress={() => setSelected(i)}
              style={[
                styles.card,
                selected === i && styles.cardSelected,
              ]}
            >
              <Text style={styles.cardEmoji}>{c.emoji}</Text>
              <Text style={[styles.cardName, selected === i && styles.cardNameSelected]}>
                {c.name}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.bioSection}>
          <View style={styles.bioHeader}>
            <Text style={styles.bioEmoji}>{char.emoji}</Text>
            <View>
              <Text style={styles.bioName}>{char.name}</Text>
              <Text style={styles.bioTitle}>{char.title}</Text>
            </View>
          </View>
          <Text style={styles.bioText}>{char.bio}</Text>
        </View>

        <View style={styles.buttonArea}>
          {(unplayedScenarioCount > 0 || unplayedMoodCount > 0) && (
            <Text style={styles.poolHint}>
              {Math.min(unplayedScenarioCount, 5)} fresh scenario{Math.min(unplayedScenarioCount, 5) === 1 ? '' : 's'}
              {' · '}
              {Math.min(unplayedMoodCount, 5)} fresh office climate{Math.min(unplayedMoodCount, 5) === 1 ? '' : 's'} queued
            </Text>
          )}
          <Button
            title={starting ? 'Loading week...' : `Play as ${char.name}`}
            onPress={handleConfirm}
            icon={char.emoji}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: SPACING.xxl,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    alignItems: 'center',
  },
  title: {
    ...FONTS.heading,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  card: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accentLight,
  },
  cardEmoji: {
    fontSize: 36,
    marginBottom: SPACING.xs,
  },
  cardName: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
  },
  cardNameSelected: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  bioSection: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  bioEmoji: {
    fontSize: 40,
  },
  bioName: {
    ...FONTS.subheading,
    color: COLORS.text,
  },
  bioTitle: {
    ...FONTS.caption,
    color: COLORS.accent,
    marginTop: 2,
  },
  bioText: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  buttonArea: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  poolHint: {
    ...FONTS.caption,
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
});
