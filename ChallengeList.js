import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Constant from './Constant';
import JoinChallenge from './JoinChallenge';
import SubmitChallenge from './SubmitChallenge';
import Header from './components/Header';

export default class ChallengeList extends React.Component {
  state = {
    renderComponent: 'join',
    isBack: false,
    selectedChallenge: {}
  };

  componentDidMount() {
  }

  componentWillUnmount() {
    this.setState({
      renderComponent: 'join'
    });
  }

  goToSubmit = (selectedChallenge) => {
    this.setState({
      renderComponent: 'submit',
      isBack: true,
      selectedChallenge: selectedChallenge
    });
  }

  setBackState = (isBack) => {
    this.setState({
      isBack
    });
  }

  goToJoin = () => {
    this.setState({
      renderComponent: 'join',
      isBack: false
    });
  }

  setChallenge = (selectedChallenge) => {

  }

  render(){
    return (
      <View>
        <Header
          isBack={this.state.isBack}
          backFunction={() => this.goToJoin()}
        />
        {
          this.state.renderComponent === 'submit' ? (
            <SubmitChallenge
              selectedChallenge={this.state.selectedChallenge}
              goToJoin={this.goToJoin}
            />
          ) : (
            <JoinChallenge
              joinChallenge={(selectedChallenge) => this.goToSubmit(selectedChallenge)}
            />
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    color: Constant.COLOR_GREY
  },
  challengeBox: {
    backgroundColor: Constant.COLOR_GREY,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
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