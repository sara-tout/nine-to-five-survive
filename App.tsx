import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GameProvider } from './src/context/GameContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { startBackgroundMusic } from './src/services/backgroundMusic';
import { isMusicMuted } from './src/storage/musicSettings';

export default function App() {
  const [sessionKey, setSessionKey] = useState(0);

  React.useEffect(() => {
    (async () => {
      const muted = await isMusicMuted();
      if (!muted) {
        await startBackgroundMusic();
      }
    })();
  }, [sessionKey]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary onReset={() => setSessionKey((k) => k + 1)}>
        <GameProvider key={sessionKey}>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar style="dark" />
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </GameProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
