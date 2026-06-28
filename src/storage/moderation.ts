import AsyncStorage from '@react-native-async-storage/async-storage';

const BLOCKED_USERS_KEY = 'nine-to-five-survive:blocked-users';
const HIDDEN_IDEAS_KEY = 'nine-to-five-survive:hidden-ideas';
const GUIDELINES_KEY = 'nine-to-five-survive:guidelines-accepted-v1';

async function loadSet(key: string): Promise<Set<string>> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

async function saveSet(key: string, set: Set<string>): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify([...set]));
  } catch {
    // best-effort; moderation prefs stay in memory for the session otherwise
  }
}

export interface ModerationState {
  blockedUsers: Set<string>;
  hiddenIdeas: Set<string>;
}

export async function loadModerationState(): Promise<ModerationState> {
  const [blockedUsers, hiddenIdeas] = await Promise.all([
    loadSet(BLOCKED_USERS_KEY),
    loadSet(HIDDEN_IDEAS_KEY),
  ]);
  return { blockedUsers, hiddenIdeas };
}

export async function blockUser(username: string): Promise<Set<string>> {
  const set = await loadSet(BLOCKED_USERS_KEY);
  set.add(username);
  await saveSet(BLOCKED_USERS_KEY, set);
  return set;
}

export async function hideIdea(ideaId: string): Promise<Set<string>> {
  const set = await loadSet(HIDDEN_IDEAS_KEY);
  set.add(ideaId);
  await saveSet(HIDDEN_IDEAS_KEY, set);
  return set;
}

export async function hasAcceptedGuidelines(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(GUIDELINES_KEY)) === 'true';
  } catch {
    return false;
  }
}

export async function acceptGuidelines(): Promise<void> {
  try {
    await AsyncStorage.setItem(GUIDELINES_KEY, 'true');
  } catch {
    // ignore; will re-prompt next session
  }
}
