import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Constant from './Constant';
import { Pedometer } from 'expo-sensors';

export default class Main extends React.Component {
  state = {
    isPedometerAvailable: 'checking',
    pastStepCount: 0,
    currentStepCount: 0
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps,
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}</Text>
        <Text style={styles.textStyle}>Steps taken in the last week: {this.state.pastStepCount}</Text>
        <Text style={styles.textStyle}>Walk! And watch this go up: {this.state.currentStepCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Constant.COLOR_GREY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    color: Constant.COLOR_WHITE
  },
  logo:{
    fontWeight:"bold",
    fontSize:28,
    color:Constant.COLOR_RED,
    marginBottom:40
  },
  logoImg: {
    width: 150,
    height: 150,
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:Constant.COLOR_WHITE,
    borderRadius:5,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    display: 'none'
  },
  inputText:{
    height:50,
    color:Constant.COLOR_GREY,
  },
  forgot:{
    color:Constant.COLOR_GREY,
    fontSize:11
  },
  loginBtn:{
    backgroundColor:Constant.COLOR_FACEBOOK,
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
    padding: 15
  },
  loginText:{
    color:"white",
    fontWeight: '700',
    paddingLeft: 20,
    paddingRight: 20
  }
});