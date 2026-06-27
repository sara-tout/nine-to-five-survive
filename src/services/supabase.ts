import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { MAX_SYNC_BEST_STREAK, MAX_SYNC_RUN_SCORE } from '../constants/scoreLimits';
import { validateUsername } from '../storage/playerProfile';
import { toUserFacingSyncError } from '../utils/supabaseErrors';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

let client: SupabaseClient | null = null;

export function isBackendConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabase(): SupabaseClient | null {
  if (!isBackendConfigured()) return null;
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
}

export interface LeaderboardEntry {
  username: string;
  total_score: number;
  runs_completed: number;
  wins: number;
  best_streak: number;
  updated_at: string;
}

export type IdeaSort = 'recent' | 'top';

export interface ScenarioIdea {
  id: string;
  username: string;
  body: string;
  created_at: string;
  like_count: number;
  liked_by_viewer: boolean;
}

function clampSyncScore(value: number): number {
  return Math.max(0, Math.min(MAX_SYNC_RUN_SCORE, Math.floor(value)));
}

function clampSyncStreak(value: number): number {
  return Math.max(0, Math.min(MAX_SYNC_BEST_STREAK, Math.floor(value)));
}

function validatedUsername(username: string): string | null {
  const trimmed = username.trim();
  return validateUsername(trimmed) ? null : trimmed;
}

export async function upsertPlayerScore(input: {
  username: string;
  runScore: number;
  won: boolean;
  bestStreak: number;
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'Community cloud not configured yet.' };

  const username = validatedUsername(input.username);
  if (!username) return { ok: false, error: 'Badge name is not valid for cloud sync.' };

  const { error } = await supabase.rpc('record_player_run', {
    p_username: username,
    p_run_score: clampSyncScore(input.runScore),
    p_won: input.won,
    p_best_streak: clampSyncStreak(input.bestStreak),
  });

  if (error) {
    return { ok: false, error: toUserFacingSyncError(error.message) };
  }
  return { ok: true };
}

export async function fetchLeaderboard(limit = 50): Promise<{
  entries: LeaderboardEntry[];
  error?: string;
}> {
  const supabase = getSupabase();
  if (!supabase) return { entries: [], error: 'Community cloud not configured yet.' };

  const safeLimit = Math.max(1, Math.min(100, Math.floor(limit)));
  const { data, error } = await supabase
    .from('players')
    .select('username, total_score, runs_completed, wins, best_streak, updated_at')
    .order('total_score', { ascending: false })
    .limit(safeLimit);

  if (error) return { entries: [], error: toUserFacingSyncError(error.message) };
  return { entries: (data ?? []) as LeaderboardEntry[] };
}

export async function fetchScenarioIdeas(
  sort: IdeaSort = 'recent',
  viewerUsername?: string,
  limit = 50,
): Promise<{
  ideas: ScenarioIdea[];
  error?: string;
}> {
  const supabase = getSupabase();
  if (!supabase) return { ideas: [], error: 'Community cloud not configured yet.' };

  const safeLimit = Math.max(1, Math.min(100, Math.floor(limit)));
  const { data, error } = await supabase.rpc('fetch_scenario_ideas', {
    p_limit: safeLimit,
    p_sort: sort,
    p_viewer_username: viewerUsername?.trim() || null,
  });

  if (error) {
    const missingRpc =
      error.message.includes('fetch_scenario_ideas') ||
      error.code === 'PGRST202' ||
      error.code === '42883';
    if (missingRpc) {
      return fetchScenarioIdeasLegacy(supabase, sort, safeLimit);
    }
    return { ideas: [], error: toUserFacingSyncError(error.message) };
  }
  return {
    ideas: (data ?? []).map((row: ScenarioIdea) => ({
      ...row,
      like_count: Number(row.like_count ?? 0),
      liked_by_viewer: Boolean(row.liked_by_viewer),
    })),
  };
}

async function fetchScenarioIdeasLegacy(
  supabase: NonNullable<ReturnType<typeof getSupabase>>,
  sort: IdeaSort,
  limit: number,
): Promise<{ ideas: ScenarioIdea[]; error?: string }> {
  const { data, error } = await supabase
    .from('scenario_ideas')
    .select('id, username, body, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return { ideas: [], error: toUserFacingSyncError(error.message) };

  const ideas = (data ?? []).map((row) => ({
    ...row,
    like_count: 0,
    liked_by_viewer: false,
  })) as ScenarioIdea[];

  if (sort === 'top') {
    return { ideas, error: 'Sorting by likes is temporarily unavailable.' };
  }
  return { ideas };
}

export async function toggleScenarioIdeaLike(input: {
  ideaId: string;
  username: string;
}): Promise<{ ok: boolean; liked?: boolean; likeCount?: number; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'Community cloud not configured yet.' };

  const username = validatedUsername(input.username);
  if (!username) return { ok: false, error: 'Set a valid badge name before liking ideas.' };

  const { data, error } = await supabase.rpc('toggle_scenario_idea_like', {
    p_idea_id: input.ideaId,
    p_username: username,
  });

  if (error) return { ok: false, error: toUserFacingSyncError(error.message) };

  const row = Array.isArray(data) ? data[0] : data;
  return {
    ok: true,
    liked: Boolean(row?.liked),
    likeCount: Number(row?.like_count ?? 0),
  };
}

export async function postScenarioIdea(input: {
  username: string;
  body: string;
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'Community cloud not configured yet.' };

  const username = validatedUsername(input.username);
  if (!username) return { ok: false, error: 'Set a valid badge name before posting ideas.' };

  const trimmed = input.body.trim();
  if (trimmed.length < 8) return { ok: false, error: 'Say a bit more than that.' };
  if (trimmed.length > 500) return { ok: false, error: 'Keep it under 500 characters.' };

  const { error } = await supabase.rpc('post_scenario_idea', {
    p_username: username,
    p_body: trimmed,
  });

  if (error) {
    const missingRpc =
      error.message.includes('post_scenario_idea') ||
      error.code === 'PGRST202' ||
      error.code === '42883';
    if (missingRpc) {
      const legacy = await supabase.from('scenario_ideas').insert({
        username,
        body: trimmed,
      });
      if (legacy.error) return { ok: false, error: toUserFacingSyncError(legacy.error.message) };
      return { ok: true };
    }
    return { ok: false, error: toUserFacingSyncError(error.message) };
  }
  return { ok: true };
}

export async function isUsernameAvailable(username: string): Promise<{
  available: boolean;
  error?: string;
}> {
  const supabase = getSupabase();
  if (!supabase) return { available: true };

  const trimmed = validatedUsername(username);
  if (!trimmed) return { available: false, error: 'Invalid badge name.' };

  const { data, error } = await supabase
    .from('players')
    .select('username')
    .eq('username', trimmed)
    .maybeSingle();

  if (error) return { available: false, error: toUserFacingSyncError(error.message) };
  return { available: !data };
}

export async function pingCommunityBackend(): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: 'Not configured' };

  const { error } = await supabase.from('players').select('username', { head: true, count: 'exact' });
  if (error) return { ok: false, error: toUserFacingSyncError(error.message) };
  return { ok: true };
}
