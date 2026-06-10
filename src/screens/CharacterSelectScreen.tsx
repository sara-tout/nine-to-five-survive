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
    name: 'Carla',
    title: 'The Builder',
    bio: 'Ships clean code, protects deep work, and mentors without ego. The person everyone wants on their project.',
  },
  {
    emoji: '👩‍💼',
    name: 'Ming',
    title: 'The Product Partner',
    bio: 'Cuts scope creep, shields the team, and actually understands the work. Makes hard calls so others can focus.',
  },
  {
    emoji: '👨‍💼',
    name: 'Alan',
    title: 'The Fast Learner',
    bio: 'New to the role but asks the right questions, takes notes, and levels up every week. Hungry without being chaotic.',
  },
  {
    emoji: '👩‍🎨',
    name: 'Julia',
    title: 'The Craftsperson',
    bio: 'Fights for users, sweats the details, and makes products feel inevitable. Design with a backbone.',
  },
  {
    emoji: '👩‍🔬',
    name: 'Dr. Ursula',
    title: 'The Truth Finder',
    bio: 'Turns noise into signal. Brings receipts, not vibes. The room gets quieter when she presents the data.',
  },
  {
    emoji: '👷',
    name: 'Hong',
    title: 'The Reliability Pro',
    bio: 'Keeps systems running so everyone else can sleep. Fixes fires before they become headlines.',
  },
  {
    emoji: '👩‍🏫',
    name: 'Kevin',
    title: 'The Mentor',
    bio: 'Has seen every reorg and survived them all. The team calls him Cookie. Lifts others up, shares credit, and still ships.',
  },
  {
    emoji: '👴',
    name: 'Jido',
    title: 'The Professor',
    bio: 'A mathematician who should have retired years ago. Still shows up because the problems are interesting, not the paycheck.',
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
