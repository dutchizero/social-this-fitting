import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Constant from '../Constant';

export default class Header extends React.Component {
  state={
    title:""
  }

  render(){
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoImg}
          source={require('../assets/logo.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    backgroundColor: Constant.COLOR_GREY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30
  },
  logoImg:{
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOut: {
    width: 40,
    height: 40,
    right: 10,
    top: 10
  }
});