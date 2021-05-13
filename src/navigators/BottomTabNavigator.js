import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import BottomTab from '../components/BottomTab';
import MallScreen from '../screens/Mall';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTab {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mall" component={MallScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
