import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/screen/HomeScreen';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
