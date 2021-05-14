import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
const Stack = createStackNavigator();

function RootStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default RootStackNavigator;
