import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './Login';
import JoinChallenge from './JoinChallenge';
import Header from './components/Header';
import * as Constant from './Constant';
import * as firebase from 'firebase'

function JoinChallengeScreen() {
  return (
    <JoinChallenge />
  );
}

function AccountScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account</Text>
    </View>
  );
}

function RankingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ranking</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

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
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => setIsSignedIn(!!user)
    );
    return () => {
      unregisterAuthObserver()
    }
  }, [])

  return (
    <View style={styles.container}>
      {/* <Text>Hello, Social This Fitting!</Text> */}
      {isSignedIn ?
        (<>
          <StatusBar style="light" />
          <Header />
          <NavigationContainer style={styles.navigator}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Join Challenge') {
                    iconName = focused ? 'rocket' : 'rocket';
                  } else if (route.name === 'Account') {
                    iconName = focused ? 'user' : 'user';
                  } else if (route.name === 'Ranking') {
                    iconName = focused ? 'trophy' : 'trophy';
                  }

                  // You can return any component that you like here!
                  return <Icon name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: Constant.COLOR_RED,
                inactiveTintColor: Constant.COLOR_GREY,
              }}
            >
              <Tab.Screen name="Join Challenge" component={JoinChallengeScreen} />
              <Tab.Screen name="Ranking" component={RankingScreen} />
              <Tab.Screen name="Account" component={AccountScreen} />
            </Tab.Navigator>
          </NavigationContainer> </>) : (<Login></Login>)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  navigator: {
    backgroundColor: Constant.COLOR_GREY
  }
});
