import { Audio } from 'expo-av';
import { Platform } from 'react-native';

let sound: Audio.Sound | null = null;
/**
 * Tracks an in-flight start so concurrent callers share one operation. Without
 * this, two near-simultaneous calls (e.g. mount + focus effects) both see a null
 * `sound`, each create a looping track, and the music plays doubled.
 */
let startInFlight: Promise<boolean> | null = null;

/** Royalty-free: "Carefree" by Kevin MacLeod (incompetech.com), CC BY 4.0. See assets/audio/ATTRIBUTION.txt */
const MUSIC_SOURCE = require('../../assets/audio/chill-office.mp3');

async function configureAudioMode(): Promise<void> {
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    staysActiveInBackground: false,
    shouldDuckAndroid: true,
  });
}

async function startInternal(): Promise<boolean> {
  try {
    await configureAudioMode();

    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        if (!status.isPlaying) {
          await sound.playAsync();
        }
        return true;
      }
    }

    const { sound: created } = await Audio.Sound.createAsync(MUSIC_SOURCE, {
      isLooping: true,
      volume: Platform.OS === 'web' ? 0.25 : 0.35,
      shouldPlay: true,
    });
    sound = created;
    return true;
  } catch {
    return false;
  }
}

/** Start or resume background music. Safe to call repeatedly; only one track ever plays. */
export async function startBackgroundMusic(): Promise<boolean> {
  if (startInFlight) return startInFlight;
  startInFlight = startInternal();
  try {
    return await startInFlight;
  } finally {
    startInFlight = null;
  }
}

export async function stopBackgroundMusic(): Promise<void> {
  if (startInFlight) {
    try {
      await startInFlight;
    } catch {
      // ignore
    }
  }
  if (!sound) return;
  try {
    await sound.stopAsync();
    await sound.unloadAsync();
  } catch {
    // ignore
  }
  sound = null;
}

export async function setMusicMuted(muted: boolean): Promise<void> {
  if (!sound) return;
  try {
    await sound.setIsMutedAsync(muted);
  } catch {
    // ignore
  }
}
