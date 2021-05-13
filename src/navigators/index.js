import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
const Stack = createStackNavigator();

function RootStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Tab" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default RootStackNavigator;
