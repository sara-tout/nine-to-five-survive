import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Linking } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Card } from '../components/Card';
import { APP_NAME, APP_VERSION } from '../constants/appInfo';
import { OMA_MARGA } from '../constants/tributes';
import { isBackendConfigured } from '../services/supabase';

export function AboutScreen({ navigation }: any) {
  const [tributeRevealed, setTributeRevealed] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>About</Text>
        <Text style={styles.version}>
          {APP_NAME} v{APP_VERSION}
        </Text>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>In memory of Oma Marga</Text>
          <Text style={styles.tagline}>{OMA_MARGA.tagline}</Text>
          <Text style={styles.bodyMuted}>
            {OMA_MARGA.birthYear}-{OMA_MARGA.deathYear}
          </Text>

          {tributeRevealed ? (
            <View style={styles.tributeBody}>
              {OMA_MARGA.tributeParagraphs.map((paragraph, i) => (
                <Text key={i} style={styles.body}>
                  {paragraph}
                </Text>
              ))}
              <Text style={styles.tributeClosing}>{OMA_MARGA.tributeClosing}</Text>
            </View>
          ) : (
            <Pressable onPress={() => setTributeRevealed(true)} style={styles.revealWrap}>
              <Text style={styles.link}>Read her tribute →</Text>
            </Pressable>
          )}
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <Text style={styles.body}>
            Game progress (streak, perks, scenario memory) stays on your device via local storage.
          </Text>
          <Text style={styles.body}>
            If you set a badge name and use community features, your display name, scores, and
            request board posts are stored in our cloud database (Supabase) to power the leaderboard
            and request board. We do not collect email, precise location, or contacts.
          </Text>
          <Text style={styles.body}>
            Badge names and request posts are public to other players. Do not share personal or
            confidential work information in requests.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Community data</Text>
          <Text style={styles.body}>
            Status: {isBackendConfigured() ? 'Cloud connected' : 'Offline / device only'}
          </Text>
          <Text style={styles.body}>
            You can play the full game without an account. Community sync is optional.
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Music credit</Text>
          <Text style={styles.body}>
            Background track: &quot;Carefree&quot; by Kevin MacLeod (incompetech.com)
          </Text>
          <Text style={styles.body}>
            Licensed under Creative Commons BY 4.0
          </Text>
          <Pressable
            onPress={() => Linking.openURL('https://creativecommons.org/licenses/by/4.0/')}
            style={styles.linkWrap}
          >
            <Text style={styles.link}>View license</Text>
          </Pressable>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Disclaimer</Text>
          <Text style={styles.body}>
            A satirical office survival game. Characters and scenarios are fictional. Any resemblance
            to your actual standup is probably still funny.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  backBtn: { marginBottom: SPACING.md },
  backText: { ...FONTS.bodyBold, color: COLORS.accent },
  title: { ...FONTS.heading, color: COLORS.text },
  version: { ...FONTS.caption, color: COLORS.textMuted, marginBottom: SPACING.lg },
  card: { marginBottom: SPACING.md },
  sectionTitle: { ...FONTS.subheading, color: COLORS.text, marginBottom: SPACING.sm },
  body: { ...FONTS.body, color: COLORS.textSecondary, lineHeight: 22, marginBottom: SPACING.sm },
  bodyMuted: { ...FONTS.caption, color: COLORS.textMuted, marginTop: SPACING.xs },
  tagline: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: SPACING.xs,
  },
  revealWrap: { marginTop: SPACING.md },
  tributeBody: { marginTop: SPACING.md },
  tributeClosing: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginTop: SPACING.xs,
  },
  linkWrap: { marginTop: SPACING.xs },
  link: { ...FONTS.bodyBold, color: COLORS.accent },
});
