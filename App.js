/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import Banner from './src/components/Banner';
import BannerContextProvider from './src/contexts/BannerContext';
import Home from './src/screens/Home';

function App() {
  return (
    <BannerContextProvider>
      <Home />
      <Banner />
    </BannerContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
});

export default App;
