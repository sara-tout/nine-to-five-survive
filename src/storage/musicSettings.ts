import AsyncStorage from '@react-native-async-storage/async-storage';

const MUSIC_MUTED_KEY = 'nine-to-five-survive:music-muted';

export async function isMusicMuted(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(MUSIC_MUTED_KEY)) === 'true';
  } catch {
    return false;
  }
}

export async function setMusicMuted(muted: boolean): Promise<void> {
  await AsyncStorage.setItem(MUSIC_MUTED_KEY, muted ? 'true' : 'false');
}
