import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Constant from '../Constant';

export default class Header extends React.Component {
  state={
    title:""
  }

  render(){
    const { isBack, backFunction } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.leftBox}>
          {isBack ? (
            <FontAwesome.Button name="chevron-left" style={styles.backButton} onPress={() => backFunction()}>
              <Text style={styles.backText}>Back</Text>
            </FontAwesome.Button>
          ) : <Text style={styles.backText}></Text>}
          <Image
            style={styles.logoImg}
            source={require('../assets/logo.png')}
          />
        </View>
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
    paddingTop: 30,
  },
  leftBox: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
  backButton: {
    backgroundColor: Constant.COLOR_RED,
    alignItems: 'flex-start',
  },
  backText: {
    fontWeight: '700',
    color: Constant.COLOR_WHITE
  },
  logoImg:{
    width: 80,
    height: 80,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  signOut: {
    width: 40,
    height: 40,
    right: 10,
    top: 10
  }
});