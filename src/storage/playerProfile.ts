import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = 'nine-to-five-survive:player-profile';

export interface PlayerProfile {
  username: string;
  localTotalScore: number;
  localRunsCompleted: number;
  localWins: number;
}

const EMPTY_PROFILE: PlayerProfile = {
  username: '',
  localTotalScore: 0,
  localRunsCompleted: 0,
  localWins: 0,
};

export async function loadPlayerProfile(): Promise<PlayerProfile> {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    if (!raw) return { ...EMPTY_PROFILE };
    const parsed = JSON.parse(raw) as PlayerProfile;
    return {
      username: parsed.username ?? '',
      localTotalScore: parsed.localTotalScore ?? 0,
      localRunsCompleted: parsed.localRunsCompleted ?? 0,
      localWins: parsed.localWins ?? 0,
    };
  } catch {
    return { ...EMPTY_PROFILE };
  }
}

export async function savePlayerProfile(profile: PlayerProfile): Promise<void> {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function setUsername(username: string): Promise<PlayerProfile> {
  const profile = await loadPlayerProfile();
  const updated = { ...profile, username: username.trim() };
  await savePlayerProfile(updated);
  return updated;
}

export function validateUsername(username: string): string | null {
  const trimmed = username.trim();
  if (trimmed.length < 3) return 'Username needs at least 3 characters.';
  if (trimmed.length > 20) return 'Username must be 20 characters or fewer.';
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) return 'Letters, numbers, and underscores only.';
  return null;
}
