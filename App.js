import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Login';
import Main from './Main';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Hello, Social This Fitting!</Text> */}
      <StatusBar style="auto" />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff'
  },
});
