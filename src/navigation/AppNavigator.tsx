import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { CharacterSelectScreen } from '../screens/CharacterSelectScreen';
import { OfficeScreen } from '../screens/OfficeScreen';
import { DayEndScreen } from '../screens/DayEndScreen';
import { GameOverScreen } from '../screens/GameOverScreen';
import { WinScreen } from '../screens/WinScreen';
import { RewardsScreen } from '../screens/RewardsScreen';
import { RunSummaryScreen } from '../screens/RunSummaryScreen';
import { UsernameScreen } from '../screens/UsernameScreen';
import { LeaderboardScreen } from '../screens/LeaderboardScreen';
import { IdeasScreen } from '../screens/IdeasScreen';
import { AboutScreen } from '../screens/AboutScreen';

const Stack = createStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // flex: 1 bounds the card height on web; without it react-navigation lets the
        // page overflow and expects body scrolling, which Expo web disables, so anything
        // below the fold was unreachable on short windows.
        cardStyle: { backgroundColor: '#F5F5F0', flex: 1 },
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Username" component={UsernameScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Stack.Screen name="Ideas" component={IdeasScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="CharacterSelect" component={CharacterSelectScreen} />
      <Stack.Screen name="Office" component={OfficeScreen} />
      <Stack.Screen name="DayEnd" component={DayEndScreen} />
      <Stack.Screen name="RunSummary" component={RunSummaryScreen} />
      <Stack.Screen name="GameOver" component={GameOverScreen} />
      <Stack.Screen name="Win" component={WinScreen} />
      <Stack.Screen name="Rewards" component={RewardsScreen} />
    </Stack.Navigator>
  );
}
