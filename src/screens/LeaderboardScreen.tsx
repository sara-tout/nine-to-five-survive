import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Card } from '../components/Card';
import { useGame } from '../context/GameContext';
import { fetchLeaderboard, isBackendConfigured, LeaderboardEntry } from '../services/supabase';

export function LeaderboardScreen({ navigation }: any) {
  const { playerProfile } = useGame();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await fetchLeaderboard();
    setEntries(result.entries);
    setError(result.error ?? null);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const configured = isBackendConfigured();
  const myRank = entries.findIndex((e) => e.username === playerProfile.username);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
      >
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>Office Leaderboard</Text>
        <Text style={styles.subtitle}>Who is actually surviving capitalism.</Text>

        {!configured && (
          <Card style={styles.noticeCard}>
            <Text style={styles.noticeText}>
              Cloud leaderboard is not wired up yet. Add Supabase keys to `.env` and run
              `supabase/schema.sql` to start tracking real players.
            </Text>
          </Card>
        )}

        {playerProfile.username ? (
          <Card style={styles.youCard}>
            <Text style={styles.youLabel}>Your badge</Text>
            <Text style={styles.youName}>{playerProfile.username}</Text>
            <Text style={styles.youScore}>{playerProfile.localTotalScore} local survival points</Text>
            {myRank >= 0 && (
              <Text style={styles.youRank}>Currently #{myRank + 1} on the board</Text>
            )}
          </Card>
        ) : null}

        {error && configured && <Text style={styles.error}>{error}</Text>}

        {entries.length === 0 && !loading ? (
          <Card>
            <Text style={styles.empty}>
              {configured
                ? 'No survivors on the board yet. Finish a shift to claim rank #1.'
                : 'Local mode only until Supabase is configured.'}
            </Text>
          </Card>
        ) : (
          entries.map((entry, index) => {
            const isYou = entry.username === playerProfile.username;
            return (
              <View
                key={entry.username}
                style={[styles.row, isYou && styles.rowYou, index < 3 && styles.rowPodium]}
              >
                <Text style={styles.rank}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </Text>
                <View style={styles.rowText}>
                  <Text style={styles.rowName}>{entry.username}</Text>
                  <Text style={styles.rowMeta}>
                    {entry.runs_completed} shifts · {entry.wins} wins · best streak {entry.best_streak}
                  </Text>
                </View>
                <Text style={styles.rowScore}>{entry.total_score}</Text>
              </View>
            );
          })
        )}
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
  subtitle: { ...FONTS.body, color: COLORS.textSecondary, marginTop: SPACING.xs, marginBottom: SPACING.lg },
  noticeCard: { marginBottom: SPACING.md, backgroundColor: COLORS.accentLight },
  noticeText: { ...FONTS.caption, color: COLORS.textSecondary, lineHeight: 20 },
  youCard: { marginBottom: SPACING.lg },
  youLabel: { ...FONTS.caption, color: COLORS.textMuted },
  youName: { ...FONTS.subheading, color: COLORS.text, marginTop: 2 },
  youScore: { ...FONTS.body, color: COLORS.accent, marginTop: 4 },
  youRank: { ...FONTS.caption, color: COLORS.textSecondary, marginTop: 4 },
  error: { ...FONTS.caption, color: COLORS.danger, marginBottom: SPACING.md },
  empty: { ...FONTS.body, color: COLORS.textSecondary, lineHeight: 22 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  rowYou: { borderColor: COLORS.accent, backgroundColor: COLORS.accentLight },
  rowPodium: { borderColor: '#FFD700' },
  rank: { width: 36, fontSize: 18, textAlign: 'center' },
  rowText: { flex: 1, marginHorizontal: SPACING.sm },
  rowName: { ...FONTS.bodyBold, color: COLORS.text },
  rowMeta: { ...FONTS.small, color: COLORS.textSecondary, marginTop: 2 },
  rowScore: { ...FONTS.subheading, color: COLORS.accent },
});
