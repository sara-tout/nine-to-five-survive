import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Button } from '../components/Button';
import { useGame } from '../context/GameContext';

interface CharacterDef {
  emoji: string;
  name: string;
  title: string;
  bio: string;
}

const CHARACTERS: CharacterDef[] = [
  {
    emoji: '👩‍💻',
    name: 'Priya',
    title: 'The Developer',
    bio: 'Lives in the terminal. Allergic to meetings. Has 47 browser tabs open and regrets nothing.',
  },
  {
    emoji: '👩‍💼',
    name: 'Claire',
    title: 'The PM',
    bio: 'Speaks fluent Jira. Will "circle back" on literally anything. Her calendar is a war crime.',
  },
  {
    emoji: '👨‍💼',
    name: 'Marcus',
    title: 'The New Guy',
    bio: "First week on the job. Still doesn't know where the bathroom is. Dangerously eager.",
  },
  {
    emoji: '👩‍🎨',
    name: 'Sage',
    title: 'The Designer',
    bio: 'Moved a button 2px to the left and called it a productive day. Has very strong opinions about fonts.',
  },
  {
    emoji: '👩‍🔬',
    name: 'Dr. Lin',
    title: 'The Data Analyst',
    bio: "Turned a vibe check into a 40-slide deck. Will prove you wrong with a pivot table and zero remorse.",
  },
  {
    emoji: '🦊',
    name: 'Fox',
    title: 'The Intern',
    bio: "Nobody knows how a fox got hired. HR is looking into it. Surprisingly good at Excel.",
  },
  {
    emoji: '👷‍♀️',
    name: 'Tanya',
    title: 'The DevOps Engineer',
    bio: "The pipeline broke at 3 AM. She fixed it. Nobody thanked her. This is fine.",
  },
  {
    emoji: '🤖',
    name: 'Unit-7',
    title: 'The AI Assistant',
    bio: "Was supposed to replace everyone. Now mostly fixes the printer. Existential crisis loading...",
  },
];

export function CharacterSelectScreen({ navigation }: any) {
  const { dispatch } = useGame();
  const [selected, setSelected] = useState(0);

  const handleConfirm = () => {
    dispatch({ type: 'SELECT_CHARACTER', emoji: CHARACTERS[selected].emoji });
    dispatch({ type: 'START_GAME' });
    navigation.replace('Office');
  };

  const char = CHARACTERS[selected];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Fighter</Text>
        <Text style={styles.subtitle}>Who are you today?</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
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
      </ScrollView>

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
        <Button title={`Play as ${char.name}`} onPress={handleConfirm} icon={char.emoji} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
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
});
