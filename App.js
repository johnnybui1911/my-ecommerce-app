/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import Banner from './src/components/Banner';
import DailyTabContextProvider from './src/contexts/DailyTabContext';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './src/navigators';

function App() {
  return (
    <DailyTabContextProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
      <Banner />
    </DailyTabContextProvider>
  );
}

export default App;
