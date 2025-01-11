// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import AddPersonScreen from './screens/AddPersonScreen';
import GroupMapScreen from './screens/GroupMapScreen';
import SuggestionsScreen from './screens/SuggestionsScreen';
import { GroupProvider } from './store/GroupContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GroupProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Personality Mapper' }}
          />
          <Stack.Screen
            name="AddPerson"
            component={AddPersonScreen}
            options={{ title: 'Add Group Member' }}
          />
          <Stack.Screen
            name="GroupMap"
            component={GroupMapScreen}
            options={{ title: 'Group Dynamics Map' }}
          />
          <Stack.Screen
            name="Suggestions"
            component={SuggestionsScreen}
            options={{ title: 'Group Suggestions' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GroupProvider>
  );
}