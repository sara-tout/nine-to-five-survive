import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Button } from '../components/Button';
import { TutorialModal } from '../components/TutorialModal';
import { useGame, RAISE_THRESHOLD, TOTAL_DAYS } from '../context/GameContext';
import { getNextMilestone } from '../data/employeeRewards';
import { hasSeenTutorial, markTutorialSeen, resetTutorialSeen } from '../storage/onboarding';
import { isMusicMuted, setMusicMuted } from '../storage/musicSettings';
import { startBackgroundMusic, stopBackgroundMusic } from '../services/backgroundMusic';
import { isBackendConfigured, pingCommunityBackend } from '../services/supabase';
import { APP_VERSION } from '../constants/appInfo';

export function HomeScreen({ navigation }: any) {
  const { streakData, playerProfile, refreshStreak, refreshProfile } = useGame();
  const [showTutorial, setShowTutorial] = useState(false);
  const [communityOnline, setCommunityOnline] = useState<boolean | null>(null);
  const [musicMuted, setMusicMutedState] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const iconScale = useRef(new Animated.Value(0.5)).current;

  const syncMusicPreference = useCallback(async (startIfEnabled = false) => {
    const muted = await isMusicMuted();
    setMusicMutedState(muted);
    if (!muted && startIfEnabled) {
      await startBackgroundMusic();
    }
    return muted;
  }, []);

  useEffect(() => {
    refreshStreak();
    refreshProfile();
    hasSeenTutorial().then((seen) => {
      if (!seen) setShowTutorial(true);
    });
    syncMusicPreference(true);
    if (isBackendConfigured()) {
      pingCommunityBackend().then((r) => setCommunityOnline(r.ok));
    } else {
      setCommunityOnline(false);
    }
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
  }, [refreshStreak, refreshProfile, syncMusicPreference]);

  useFocusEffect(
    useCallback(() => {
      syncMusicPreference(true);
    }, [syncMusicPreference]),
  );

  const handleDismissTutorial = async () => {
    await markTutorialSeen();
    setShowTutorial(false);
    const muted = await isMusicMuted();
    if (!muted) {
      await startBackgroundMusic();
    }
  };

  const handleReplayTutorial = async () => {
    await resetTutorialSeen();
    setShowTutorial(true);
  };

  const handleToggleMusic = async () => {
    const next = !musicMuted;
    setMusicMutedState(next);
    await setMusicMuted(next);
    if (next) {
      await stopBackgroundMusic();
    } else {
      await startBackgroundMusic();
    }
  };

  const handleStart = async () => {
    const muted = await isMusicMuted();
    if (!muted) {
      await startBackgroundMusic();
    }
    if (!playerProfile.username) {
      navigation.replace('Username', { returnTo: 'CharacterSelect' });
      return;
    }
    navigation.replace('CharacterSelect');
  };

  const nextMilestone = getNextMilestone(streakData.currentStreak);
  const daysToNext = nextMilestone ? nextMilestone.days - streakData.currentStreak : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
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
          <Text style={styles.goalLine}>
            Survive {TOTAL_DAYS} days · Get performance to {RAISE_THRESHOLD} · Keep your streak
          </Text>
        </Animated.View>

        <Animated.View style={[styles.streakCard, { opacity: fadeAnim }]}>
          <View style={styles.streakTop}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <View style={styles.streakText}>
              <Text style={styles.streakValue}>
                {streakData.currentStreak > 0
                  ? `${streakData.currentStreak} day streak`
                  : 'Start your attendance streak'}
              </Text>
              {nextMilestone ? (
                <Text style={styles.streakNext}>
                  {daysToNext} day{daysToNext === 1 ? '' : 's'} until {nextMilestone.emoji}{' '}
                  {nextMilestone.title}
                </Text>
              ) : (
                <Text style={styles.streakNext}>All milestone perks unlocked. HR is nervous.</Text>
              )}
              {streakData.streakFreezesAvailable > 0 && (
                <Text style={styles.freezeHint}>
                  🧊 {streakData.streakFreezesAvailable} streak freeze
                  {streakData.streakFreezesAvailable === 1 ? '' : 's'} ready
                </Text>
              )}
            </View>
          </View>
          <Pressable onPress={() => navigation.navigate('Rewards')} style={styles.vaultLink}>
            <Text style={styles.vaultLinkText}>View perks vault →</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={[styles.communityStatus, { opacity: fadeAnim }]}>
          <Text style={styles.communityStatusText}>
            {communityOnline === null
              ? '☁️ Checking community...'
              : communityOnline
                ? '🟢 Leaderboard & requests online'
                : isBackendConfigured()
                  ? '⚪ Community unreachable. Scores saved on device'
                  : '⚪ Playing offline. Scores saved on device'}
          </Text>
        </Animated.View>

        <Animated.View style={[styles.navRow, { opacity: fadeAnim }]}>
          <Pressable style={styles.navChip} onPress={() => navigation.navigate('Leaderboard')}>
            <Text style={styles.navChipText}>🏆 Leaderboard</Text>
          </Pressable>
          <Pressable style={styles.navChip} onPress={() => navigation.navigate('Ideas')}>
            <Text style={styles.navChipText}>📨 Request board</Text>
          </Pressable>
        </Animated.View>

        {playerProfile.username ? (
          <Animated.Text style={[styles.badgeLine, { opacity: fadeAnim }]}>
            Playing as {playerProfile.username} · {playerProfile.localTotalScore} pts
          </Animated.Text>
        ) : null}

        <Animated.View style={[styles.utilityRow, { opacity: fadeAnim }]}>
          <Pressable onPress={handleReplayTutorial} style={styles.utilityLink}>
            <Text style={styles.utilityLinkText}>Replay tips</Text>
          </Pressable>
          <Text style={styles.utilityDot}>·</Text>
          <Pressable onPress={handleToggleMusic} style={styles.utilityLink}>
            <Text style={styles.utilityLinkText}>{musicMuted ? 'Music off' : 'Music on'}</Text>
          </Pressable>
          <Text style={styles.utilityDot}>·</Text>
          <Pressable onPress={() => navigation.navigate('About')} style={styles.utilityLink}>
            <Text style={styles.utilityLinkText}>About</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={[styles.buttonArea, { opacity: fadeAnim }]}>
          <Button title="Start Your Shift" onPress={handleStart} icon="☕" />
          <Text style={styles.hint}>Finish one shift per day to keep your streak.</Text>
        </Animated.View>

        <Animated.Text style={[styles.versionLine, { opacity: fadeAnim }]}>
          v{APP_VERSION}
        </Animated.Text>
      </View>
      </ScrollView>

      {showTutorial && <TutorialModal onDismiss={handleDismissTutorial} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: SPACING.xxl,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 640,
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
  goalLine: {
    ...FONTS.caption,
    color: COLORS.accent,
    textAlign: 'center',
    marginTop: SPACING.md,
    fontWeight: '600',
    lineHeight: 20,
  },
  streakCard: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  streakTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  streakEmoji: { fontSize: 28 },
  streakText: { flex: 1 },
  streakValue: { ...FONTS.bodyBold, color: COLORS.text },
  streakNext: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 4, lineHeight: 18 },
  freezeHint: { ...FONTS.caption, color: COLORS.accent, marginTop: 4, fontWeight: '600' },
  vaultLink: { marginTop: SPACING.sm, alignSelf: 'flex-start' },
  vaultLinkText: { ...FONTS.caption, color: COLORS.accent, fontWeight: '700' },
  communityStatus: {
    marginTop: SPACING.lg,
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  communityStatusText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  navRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.lg,
    width: '100%',
  },
  navChip: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.lg,
    paddingVertical: 12,
    alignItems: 'center',
  },
  navChipText: { ...FONTS.caption, color: COLORS.accent, fontWeight: '700' },
  badgeLine: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  utilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  utilityLink: { paddingVertical: SPACING.xs },
  utilityLinkText: { ...FONTS.caption, color: COLORS.textMuted, fontWeight: '600' },
  utilityDot: { ...FONTS.caption, color: COLORS.textMuted },
  buttonArea: {
    marginTop: SPACING.lg,
    width: '100%',
    paddingHorizontal: SPACING.xl,
  },
  hint: {
    ...FONTS.small,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  versionLine: {
    ...FONTS.small,
    color: COLORS.textMuted,
    marginTop: SPACING.xl,
    opacity: 0.55,
  },
});
