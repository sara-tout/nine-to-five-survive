import Constants from 'expo-constants';

export const APP_VERSION =
  Constants.expoConfig?.version ?? Constants.nativeAppVersion ?? '1.0.0';

export const APP_NAME = '9 to 5: Survive';
