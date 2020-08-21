import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Constant from './Constant';
import { Pedometer } from 'expo-sensors';

export default class JoinChallenge extends React.Component {
  state = {
  };

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.textBlock}>
          <Text style={styles.titleStyle}>Current Challenge</Text>
          <Text style={styles.challengeCountStyle}>(1 challenge)</Text>
        </View>

        <View style={styles.challengeLoop}>
          <View style={styles.challengeBox}>
            <View style={styles.leftBox}>
              <Image
                style={styles.challengeIcon}
                source={require('./assets/img/footprint.png')}
              />
              <Text style={styles.textStyleLeft}>Long Walking</Text>
              <Text style={styles.textStyleLeft}>96 / 100</Text>
              <Text style={styles.textStyleLeft}>Challengers</Text>
            </View>
            <View style={styles.rightBox}>
              <Text style={styles.challengeTitle}>Ascend Walking Challenge</Text>
              <Text style={styles.challengeDesc}><Text style={{fontWeight: "bold"}}>Rule:</Text> {"\n"}First 100,000 steps</Text>
              <Text style={styles.challengeDesc}><Text style={{fontWeight: "bold"}}>Reward:</Text>  {"\n"}5,000THB GoEat Coupon</Text>
            </View>
          </View>
          <FontAwesome.Button name="rocket" style={styles.joinButton}>
            <Text style={styles.joinText}>JOIN</Text>
          </FontAwesome.Button>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.titleStyle}>UpComing Challenge</Text>
          <Text style={styles.challengeCountStyle}>(1 challenge)</Text>
        </View>

        <View style={styles.waitChallengeLoop}>
          <View style={styles.challengeBox}>
            <View style={styles.leftBox}>
              <Image
                style={styles.challengeIcon}
                source={require('./assets/img/footprint.png')}
              />
              <Text style={styles.textStyleLeft}>Long Walking</Text>
              <Text style={styles.textStyleLeft}>96 / 100</Text>
              <Text style={styles.textStyleLeft}>Challengers</Text>
            </View>
            <View style={styles.rightBox}>
              <Text style={styles.challengeTitle}>True Walking Challenge</Text>
              <Text style={styles.challengeDesc}><Text style={{fontWeight: "bold"}}>Rule:</Text> {"\n"}First 100,000 steps</Text>
              <Text style={styles.challengeDesc}><Text style={{fontWeight: "bold"}}>Reward:</Text>  {"\n"}5,000THB GoEat Coupon</Text>
            </View>
          </View>
          <FontAwesome.Button name="rocket" style={styles.waitJoinButton}>
            <Text style={styles.joinText}>JOIN</Text>
          </FontAwesome.Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    color: Constant.COLOR_GREY,
  },
  challengeBox: {
    backgroundColor: Constant.COLOR_GREY,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 3
  },
  leftBox: {
    alignSelf: 'flex-start',
    width: '35%',
    padding: 15,
    paddingRight: 15,
    backgroundColor: 'white',
    textAlign: 'center'
  },
  rightBox: {
    alignSelf: 'flex-end',
    height: '100%',
    width: '65%',
    padding: 15,
    paddingRight: 15,
    backgroundColor: Constant.COLOR_GREY
  },
  waitChallengeLoop: {
    opacity: .7
  },
  joinButton: {
    backgroundColor: Constant.COLOR_RED,
    justifyContent: 'center',
  },
  waitJoinButton: {
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  joinText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    color: Constant.COLOR_WHITE
  },
  challengeTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    color: Constant.COLOR_RED
  },
  challengeDesc: {
    marginTop: 5,
    marginBottom: 5,
    color: Constant.COLOR_WHITE
  },
  challengeDescLast: {
    marginBottom: 15
  },
  textStyleLeft: {
    color: Constant.COLOR_GREY,
    fontWeight: '500',
    fontSize: 13,
    textAlign: 'center'
  },
  challengeIcon: {
    marginBottom: 15,
    width: 50,
    height: 50,
    margin: 'auto',
    alignSelf: 'center'
  },
  textStyle: {
    color: Constant.COLOR_GREY,
    fontWeight: '500',
    fontSize: 13
  },
  textBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35
  },
  titleStyle: {
    color: Constant.COLOR_GREY,
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'flex-start'
  },
  challengeCountStyle: {
    color: Constant.COLOR_GREY,
    alignSelf: 'flex-end',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 'auto'
  }
});