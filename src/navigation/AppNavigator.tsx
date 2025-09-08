import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

export type RootStackParamList = {
  "Demon Slayer": undefined;
  "Detalhes": { characterId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Demon Slayer" component={HomeScreen} />
      <Stack.Screen name="Detalhes" component={DetailScreen} />
    </Stack.Navigator>
  );
}
