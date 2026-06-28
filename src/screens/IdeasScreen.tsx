import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  Modal,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useGame } from '../context/GameContext';
import {
  fetchScenarioIdeas,
  IdeaSort,
  isBackendConfigured,
  postScenarioIdea,
  reportScenarioIdea,
  ScenarioIdea,
  toggleScenarioIdeaLike,
} from '../services/supabase';
import { findBlockedTerm } from '../utils/contentModeration';
import {
  acceptGuidelines,
  blockUser,
  hasAcceptedGuidelines,
  hideIdea,
  loadModerationState,
} from '../storage/moderation';

const REQUEST_CATEGORIES = [
  { id: 'scenario', label: 'Scenario', emoji: '📋', prefix: 'Scenario: ' },
  { id: 'character', label: 'Character', emoji: '👤', prefix: 'Character: ' },
  { id: 'climate', label: 'Climate', emoji: '🌦️', prefix: 'Office climate: ' },
  { id: 'app', label: 'App tweak', emoji: '⚙️', prefix: 'App: ' },
] as const;

const REQUEST_PLACEHOLDERS: Record<(typeof REQUEST_CATEGORIES)[number]['id'], string> = {
  scenario: 'The coworker who schedules a sync to discuss syncing...',
  character: 'The intern who cc\'s your manager on every "quick question"...',
  climate: 'Everyone is hungover from the company offsite and pretending otherwise...',
  app: 'Replay a single day without restarting the whole week...',
};

function applyRequestPrefix(body: string, prefix: string): string {
  const stripped = body.replace(/^(Scenario|Character|Office climate|App):\s*/i, '').trimStart();
  if (!stripped) return prefix;
  return `${prefix}${stripped}`;
}

export function IdeasScreen({ navigation }: any) {
  const { playerProfile } = useGame();
  const [ideas, setIdeas] = useState<ScenarioIdea[]>([]);
  const [sort, setSort] = useState<IdeaSort>('recent');
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [likingId, setLikingId] = useState<string | null>(null);
  const [category, setCategory] = useState<(typeof REQUEST_CATEGORIES)[number]['id']>('scenario');
  const [blockedUsers, setBlockedUsers] = useState<Set<string>>(new Set());
  const [hiddenIdeas, setHiddenIdeas] = useState<Set<string>>(new Set());
  const [showGuidelines, setShowGuidelines] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await fetchScenarioIdeas(sort, playerProfile.username);
    setIdeas(result.ideas);
    setError(result.error ?? null);
    setLoading(false);
  }, [sort, playerProfile.username]);

  React.useEffect(() => {
    load();
  }, [load]);

  React.useEffect(() => {
    loadModerationState().then((state) => {
      setBlockedUsers(state.blockedUsers);
      setHiddenIdeas(state.hiddenIdeas);
    });
  }, []);

  const submitIdea = async () => {
    setPosting(true);
    setStatus(null);
    const result = await postScenarioIdea({ username: playerProfile.username, body });
    setPosting(false);
    if (!result.ok) {
      setStatus(result.error ?? 'Could not post request.');
      return;
    }
    setBody('');
    setCategory('scenario');
    setStatus('Request posted. Upvotes help us prioritize what ships next.');
    load();
  };

  const handlePost = async () => {
    if (!playerProfile.username) {
      navigation.replace('Username', { returnTo: 'Ideas' });
      return;
    }
    if (posting) return;
    const trimmed = body.trim();
    if (trimmed.length < 8) {
      setStatus('Add a bit more detail so we know what you want.');
      return;
    }
    const blockedTerm = findBlockedTerm(trimmed);
    if (blockedTerm) {
      setStatus('That looks like it breaks our community rules. Please keep it civil.');
      return;
    }
    if (!(await hasAcceptedGuidelines())) {
      setShowGuidelines(true);
      return;
    }
    await submitIdea();
  };

  const handleAcceptGuidelines = async () => {
    await acceptGuidelines();
    setShowGuidelines(false);
    await submitIdea();
  };

  const handleReport = (idea: ScenarioIdea) => {
    Alert.alert(
      'Report this request?',
      'We\'ll review it and remove it if it breaks our rules. It will be hidden from you right away.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Report',
          style: 'destructive',
          onPress: async () => {
            const next = await hideIdea(idea.id);
            setHiddenIdeas(new Set(next));
            if (playerProfile.username) {
              await reportScenarioIdea({ ideaId: idea.id, username: playerProfile.username });
            }
            setStatus('Thanks for the report. We\'ll take a look.');
          },
        },
      ],
    );
  };

  const handleBlock = (idea: ScenarioIdea) => {
    Alert.alert(
      `Block ${idea.username}?`,
      'You won\'t see any requests from this person anymore.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Block',
          style: 'destructive',
          onPress: async () => {
            const next = await blockUser(idea.username);
            setBlockedUsers(new Set(next));
            setStatus(`You won't see posts from ${idea.username} anymore.`);
          },
        },
      ],
    );
  };

  const handleLike = async (ideaId: string) => {
    if (!playerProfile.username) {
      navigation.replace('Username', { returnTo: 'Ideas' });
      return;
    }
    if (likingId) return;

    setLikingId(ideaId);
    const result = await toggleScenarioIdeaLike({
      ideaId,
      username: playerProfile.username,
    });
    setLikingId(null);

    if (!result.ok) {
      setStatus(result.error ?? 'Could not update like.');
      return;
    }

    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === ideaId
          ? { ...idea, liked_by_viewer: result.liked ?? false, like_count: result.likeCount ?? idea.like_count }
          : idea,
      ),
    );
  };

  const configured = isBackendConfigured();
  const activeCategory = REQUEST_CATEGORIES.find((item) => item.id === category) ?? REQUEST_CATEGORIES[0];
  const inputPlaceholder = `${activeCategory.prefix}${REQUEST_PLACEHOLDERS[category]}`;
  const visibleIdeas = ideas.filter(
    (idea) => !hiddenIdeas.has(idea.id) && !blockedUsers.has(idea.username),
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        >
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>

          <Text style={styles.title}>Request Board</Text>
          <Text style={styles.subtitle}>
            Ask for new scenarios, characters, office climates, or app tweaks. Upvote what you want
            in the game next.
          </Text>

          {!configured && (
            <Card style={styles.noticeCard}>
              <Text style={styles.noticeText}>
                Community board is offline. You can still play the full game. Scores and streak stay
                on this device.
              </Text>
            </Card>
          )}

          <Card style={styles.composeCard}>
            <Text style={styles.composeLabel}>
              Posting as {playerProfile.username || 'anonymous (set badge name first)'}
            </Text>
            <Text style={styles.categoryHint}>What kind of request?</Text>
            <View style={styles.categoryRow}>
              {REQUEST_CATEGORIES.map((item) => {
                const active = category === item.id;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      setCategory(item.id);
                      setBody((current) => applyRequestPrefix(current, item.prefix));
                    }}
                    style={[styles.categoryChip, active && styles.categoryChipActive]}
                  >
                    <Text style={[styles.categoryChipText, active && styles.categoryChipTextActive]}>
                      {item.emoji} {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder={inputPlaceholder}
              placeholderTextColor={COLORS.textMuted}
              multiline
              maxLength={500}
              style={styles.input}
            />
            <Text style={styles.counter}>{body.length}/500</Text>
            {status && <Text style={styles.status}>{status}</Text>}
            <Button
              title={posting ? 'Posting...' : 'Submit request'}
              onPress={handlePost}
              icon="📨"
              style={styles.postBtn}
            />
            <Text style={styles.guidelinesNote}>
              By posting, you agree to keep it civil. Hateful, sexual, or abusive content is not
              tolerated and will be removed.
            </Text>
          </Card>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Community requests</Text>
            <View style={styles.sortRow}>
              <Pressable
                onPress={() => setSort('recent')}
                style={[styles.sortChip, sort === 'recent' && styles.sortChipActive]}
              >
                <Text style={[styles.sortChipText, sort === 'recent' && styles.sortChipTextActive]}>
                  Recent
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSort('top')}
                style={[styles.sortChip, sort === 'top' && styles.sortChipActive]}
              >
                <Text style={[styles.sortChipText, sort === 'top' && styles.sortChipTextActive]}>
                  Most liked
                </Text>
              </Pressable>
            </View>
          </View>

          {error && configured && <Text style={styles.error}>{error}</Text>}

          {visibleIdeas.length === 0 && !loading ? (
            <Card>
              <Text style={styles.empty}>No requests yet. Ask for a scenario, character, or feature.</Text>
            </Card>
          ) : (
            visibleIdeas.map((idea) => {
              const isOwn = idea.username === playerProfile.username;
              return (
                <Card key={idea.id} style={styles.requestCard}>
                  <View style={styles.requestHeader}>
                    <Text style={styles.requestUser}>{idea.username}</Text>
                    <Pressable
                      onPress={() => handleLike(idea.id)}
                      disabled={!configured || likingId === idea.id}
                      style={({ pressed }) => [
                        styles.likeBtn,
                        idea.liked_by_viewer && styles.likeBtnActive,
                        pressed && { opacity: 0.85 },
                      ]}
                    >
                      <Text style={[styles.likeIcon, idea.liked_by_viewer && styles.likeIconActive]}>
                        {idea.liked_by_viewer ? '♥' : '♡'}
                      </Text>
                      <Text style={[styles.likeCount, idea.liked_by_viewer && styles.likeCountActive]}>
                        {idea.like_count}
                      </Text>
                    </Pressable>
                  </View>
                  <Text style={styles.requestBody}>{idea.body}</Text>
                  <View style={styles.requestFooter}>
                    <Text style={styles.requestDate}>
                      {new Date(idea.created_at).toLocaleString()}
                    </Text>
                    {!isOwn && (
                      <View style={styles.moderationActions}>
                        <Pressable onPress={() => handleReport(idea)} hitSlop={8}>
                          <Text style={styles.moderationLink}>Report</Text>
                        </Pressable>
                        <Text style={styles.moderationDivider}>·</Text>
                        <Pressable onPress={() => handleBlock(idea)} hitSlop={8}>
                          <Text style={styles.moderationLink}>Block</Text>
                        </Pressable>
                      </View>
                    )}
                  </View>
                </Card>
              );
            })
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={showGuidelines}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGuidelines(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Community guidelines</Text>
            <Text style={styles.modalBody}>
              The request board is shared with other players. Keep it civil and on-topic.
              {'\n\n'}There is zero tolerance for hateful, harassing, sexual, or otherwise
              objectionable content. Posts that break these rules are removed, and repeat offenders
              are blocked. You can report or block anyone whose posts cross the line.
            </Text>
            <Button title="I agree - post my request" onPress={handleAcceptGuidelines} icon="✅" />
            <Pressable onPress={() => setShowGuidelines(false)} style={styles.modalCancel}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  backBtn: { marginBottom: SPACING.md },
  backText: { ...FONTS.bodyBold, color: COLORS.accent },
  title: { ...FONTS.heading, color: COLORS.text },
  subtitle: { ...FONTS.body, color: COLORS.textSecondary, marginTop: SPACING.xs, marginBottom: SPACING.lg, lineHeight: 24 },
  noticeCard: { marginBottom: SPACING.md, backgroundColor: COLORS.accentLight },
  noticeText: { ...FONTS.caption, color: COLORS.textSecondary, lineHeight: 20 },
  composeCard: { marginBottom: SPACING.lg },
  composeLabel: { ...FONTS.caption, color: COLORS.textMuted, marginBottom: SPACING.sm },
  categoryHint: { ...FONTS.caption, color: COLORS.textSecondary, marginBottom: SPACING.xs, fontWeight: '600' },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  categoryChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.bg,
  },
  categoryChipActive: {
    backgroundColor: COLORS.accentLight,
    borderColor: COLORS.accent,
  },
  categoryChipText: { ...FONTS.caption, color: COLORS.textSecondary, fontWeight: '600' },
  categoryChipTextActive: { color: COLORS.accent },
  input: {
    minHeight: 110,
    textAlignVertical: 'top',
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...FONTS.body,
    color: COLORS.text,
  },
  counter: { ...FONTS.small, color: COLORS.textMuted, textAlign: 'right', marginTop: SPACING.xs },
  status: { ...FONTS.caption, color: COLORS.success, marginTop: SPACING.sm },
  postBtn: { marginTop: SPACING.md },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  sectionTitle: { ...FONTS.subheading, color: COLORS.text, flex: 1 },
  sortRow: { flexDirection: 'row', gap: SPACING.xs },
  sortChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.card,
  },
  sortChipActive: {
    backgroundColor: COLORS.accentLight,
    borderColor: COLORS.accent,
  },
  sortChipText: { ...FONTS.caption, color: COLORS.textSecondary, fontWeight: '600' },
  sortChipTextActive: { color: COLORS.accent },
  error: { ...FONTS.caption, color: COLORS.danger, marginBottom: SPACING.sm },
  empty: { ...FONTS.body, color: COLORS.textSecondary },
  requestCard: { marginBottom: SPACING.sm },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  requestUser: { ...FONTS.bodyBold, color: COLORS.accent, flex: 1 },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.bg,
    minWidth: 52,
    justifyContent: 'center',
  },
  likeBtnActive: {
    borderColor: COLORS.danger,
    backgroundColor: COLORS.dangerBg,
  },
  likeIcon: { fontSize: 16, color: COLORS.textMuted },
  likeIconActive: { color: COLORS.danger },
  likeCount: { ...FONTS.caption, color: COLORS.textSecondary, fontWeight: '700' },
  likeCountActive: { color: COLORS.danger },
  requestBody: { ...FONTS.body, color: COLORS.text, marginTop: SPACING.xs, lineHeight: 22 },
  requestFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
    gap: SPACING.sm,
  },
  requestDate: { ...FONTS.small, color: COLORS.textMuted },
  moderationActions: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  moderationLink: { ...FONTS.small, color: COLORS.textMuted, fontWeight: '600' },
  moderationDivider: { ...FONTS.small, color: COLORS.textMuted },
  guidelinesNote: { ...FONTS.small, color: COLORS.textMuted, marginTop: SPACING.sm, lineHeight: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },
  modalTitle: { ...FONTS.subheading, color: COLORS.text, marginBottom: SPACING.sm },
  modalBody: { ...FONTS.body, color: COLORS.textSecondary, lineHeight: 22, marginBottom: SPACING.lg },
  modalCancel: { alignItems: 'center', paddingVertical: SPACING.sm, marginTop: SPACING.xs },
  modalCancelText: { ...FONTS.bodyBold, color: COLORS.textMuted },
});
