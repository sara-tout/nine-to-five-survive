import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Button } from '../components/Button';
import { useGame } from '../context/GameContext';
import { isUsernameAvailable, isBackendConfigured } from '../services/supabase';

export function UsernameScreen({ navigation, route }: any) {
  const { setUsername } = useGame();
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [checking, setChecking] = useState(false);
  const [availabilityHint, setAvailabilityHint] = useState<string | null>(null);

  const returnTo = route.params?.returnTo ?? 'CharacterSelect';

  React.useEffect(() => {
    const trimmed = name.trim();
    if (trimmed.length < 3 || !isBackendConfigured()) {
      setAvailabilityHint(null);
      return;
    }

    const timer = setTimeout(async () => {
      setChecking(true);
      const result = await isUsernameAvailable(trimmed);
      setChecking(false);
      if (result.error) {
        setAvailabilityHint(null);
        return;
      }
      setAvailabilityHint(result.available ? 'Badge name is available.' : 'That badge name is taken.');
    }, 400);

    return () => clearTimeout(timer);
  }, [name]);

  const handleContinue = async () => {
    if (saving) return;
    setSaving(true);
    setError(null);
    const result = await setUsername(name);
    setSaving(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    navigation.replace(returnTo);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.emoji}>🪪</Text>
        <Text style={styles.title}>Badge in</Text>
        <Text style={styles.subtitle}>
          Pick a display name for the office leaderboard. Your shifts and survival score attach to
          this badge.
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g. Carla_Survivor"
          placeholderTextColor={COLORS.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={20}
          style={styles.input}
        />

        {error && <Text style={styles.error}>{error}</Text>}
        {!error && availabilityHint && (
          <Text
            style={[
              styles.availability,
              availabilityHint.includes('taken') && styles.availabilityTaken,
            ]}
          >
            {checking ? 'Checking availability...' : availabilityHint}
          </Text>
        )}

        <Text style={styles.hint}>3-20 characters. Letters, numbers, underscores.</Text>

        <Button
          title={saving ? 'Saving...' : 'Continue to shift'}
          onPress={handleContinue}
          icon="☕"
          style={styles.button}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  inner: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  emoji: { fontSize: 48, textAlign: 'center', marginBottom: SPACING.md },
  title: { ...FONTS.heading, color: COLORS.text, textAlign: 'center' },
  subtitle: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
    lineHeight: 24,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: 14,
    ...FONTS.body,
    color: COLORS.text,
  },
  error: { ...FONTS.caption, color: COLORS.danger, marginTop: SPACING.sm },
  availability: { ...FONTS.caption, color: COLORS.success, marginTop: SPACING.sm },
  availabilityTaken: { color: COLORS.danger },
  hint: { ...FONTS.small, color: COLORS.textMuted, marginTop: SPACING.sm, marginBottom: SPACING.lg },
  button: { width: '100%' },
});
