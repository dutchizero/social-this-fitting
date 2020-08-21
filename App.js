import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './Login';
import JoinChallenge from './JoinChallenge';
import Header from './components/Header';
import * as Constant from './Constant';

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

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Hello, Social This Fitting!</Text> */}
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
          <Tab.Screen name="Join Challenge" component={JoinChallengeScreen}/>
          <Tab.Screen name="Ranking" component={RankingScreen} />
          <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
      </NavigationContainer>
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
