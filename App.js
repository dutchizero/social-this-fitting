import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Login';
import Main from './Main';
import ChallengeRunnder from './ChallengeRunner';

import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAwfuINQBrjzs07LyvEKs1PKthEURPGfp8",
  authDomain: "social-this-fitting-d30fb.firebaseapp.com",
  databaseURL: "https://social-this-fitting-d30fb.firebaseio.com",
  projectId: "social-this-fitting-d30fb",
  storageBucket: "social-this-fitting-d30fb.appspot.com",
  messagingSenderId: "522856523662",
  appId: "1:522856523662:web:b96078f3ad1c1d1c02e6df"
}

firebase.initializeApp(firebaseConfig)

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Hello, Social This Fitting!</Text> */}
      <StatusBar style="auto" />
      <ChallengeRunnder />
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
