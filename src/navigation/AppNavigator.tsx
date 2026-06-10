import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { CharacterSelectScreen } from '../screens/CharacterSelectScreen';
import { OfficeScreen } from '../screens/OfficeScreen';
import { DayEndScreen } from '../screens/DayEndScreen';
import { GameOverScreen } from '../screens/GameOverScreen';
import { WinScreen } from '../screens/WinScreen';

const Stack = createStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F5F5F0' },
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CharacterSelect" component={CharacterSelectScreen} />
      <Stack.Screen name="Office" component={OfficeScreen} />
      <Stack.Screen name="DayEnd" component={DayEndScreen} />
      <Stack.Screen name="GameOver" component={GameOverScreen} />
      <Stack.Screen name="Win" component={WinScreen} />
    </Stack.Navigator>
  );
}
