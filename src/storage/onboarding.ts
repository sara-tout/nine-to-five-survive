import AsyncStorage from '@react-native-async-storage/async-storage';

const TUTORIAL_KEY = 'nine-to-five-survive:seen-tutorial';
const OFFICE_COACH_KEY = 'nine-to-five-survive:seen-office-coach';

export async function hasSeenTutorial(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(TUTORIAL_KEY);
    return value === 'true';
  } catch {
    return false;
  }
}

export async function markTutorialSeen(): Promise<void> {
  await AsyncStorage.setItem(TUTORIAL_KEY, 'true');
}

export async function resetTutorialSeen(): Promise<void> {
  await AsyncStorage.removeItem(TUTORIAL_KEY);
}

export async function hasSeenOfficeCoach(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(OFFICE_COACH_KEY);
    return value === 'true';
  } catch {
    return false;
  }
}

export async function markOfficeCoachSeen(): Promise<void> {
  await AsyncStorage.setItem(OFFICE_COACH_KEY, 'true');
}
