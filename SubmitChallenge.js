import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Constant from './Constant';
import { Pedometer } from 'expo-sensors';
import { getCurrentUserId, updateUserChallengeScore, getChallengeScoreByUserIDAndChallengeID, getRealTimeChallengeScoreByUserID, getRealTimeHiestScore } from './firebase/firebaseDB';

export default class SubmitChallenge extends React.Component {
  state = {
    isPedometerAvailable: 'checking',
    pastStepCount: 0,
    currentStepCount: 0,
    docId: 'eBNPbcvCZ2yir640KcFK',
    challengerScore: 0,
    hiestScore: 0
  };

  componentDidMount() {
    this._subscribe();
    getRealTimeChallengeScoreByUserID(getCurrentUserId(), this.props.selectedChallenge.id).onSnapshot((item) => {
      this.setState({challengerScore: item.docs.map(item1 => { return item1.data().Score })[0]});
      //this.setState({docId: item.docs.map(item1 => { return item1.id })})[0];
    });
    // getRealTimeHiestScore(this.props.selectedChallenge.id).get().then((item) => {
    //   this.setState({challengerScore: item.docs.map(item1 => { return item1.data().Score })[0]});
    //   console.log('this.state.hiestScore', this.state.hiestScore);
    // });
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
    const start = new Date(this.props.selectedChallenge.data.ChallengeStartAt);
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

  handleSubmitScore = () => {
    const { selectedChallenge } = this.props;
    const { challengerScore, docId, currentStepCount } = this.state;
    const currentDate = new Date();
    const updatedChallengerScore = {
        ChallengeID: selectedChallenge.id,
        UserID: getCurrentUserId(),
        Unit: selectedChallenge.data.WinConditionUnit,
        UpdatedAt: currentDate,
        Score: currentStepCount + challengerScore
    }
    updateUserChallengeScore(docId, updatedChallengerScore);
    this.setState({currentStepCount: 0});
    this.props.goToJoin();
  }

  render(){
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleBlock}>
          <Image
            style={styles.challengeIcon}
            source={require('./assets/img/footprint.png')}
          />
          <Text style={styles.challengeTitle}>Ascend Walking Challenge</Text>
        </View>
        <View style={styles.contentBlock}>
          <Text style={styles.challengeDesc}><Text style={{fontWeight: "bold"}}>Rule:</Text> First 100,000 steps</Text>
          <Text style={styles.challengeDesc}><Text style={{fontWeight: "bold"}}>Reward:</Text> 5,000THB GoEat Coupon</Text>
        </View>
        <View style={styles.rankingBlock}>
          <Text style={styles.rankText}>Your Rank:{"\n"}3/96</Text>
          <Text style={styles.rankTextSmall}>(#1: {this.state.hiestScore} steps)</Text>
        </View>
        <View style={styles.contentBlock}>
          <Text style={styles.textStyle}>Your Total Step: <Text style={{fontWeight: "bold"}}>{this.state.challengerScore}</Text></Text>
          <Text style={styles.textStyleLast}>Your Step Today: <Text style={{fontWeight: "bold", color: Constant.COLOR_RED}}>{this.state.currentStepCount}</Text></Text>
        </View>
        <View style={styles.submitBlock}>
          <FontAwesome.Button name="rocket" style={styles.submitButton} onPress={() => {this.handleSubmitScore()}}>
            <Text style={styles.submitText}>SUBMIT</Text>
          </FontAwesome.Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20
  },
  challengeIcon: {
    width: 90,
    height: 90,
    marginBottom: 15,
  },
  titleBlock: {
    alignItems: 'center',
    marginBottom: 20,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '700'
  },
  contentBlock: {
    paddingLeft: 10
  },
  challengeDesc: {
    marginBottom: 5
  },
  rankingBlock: {
    padding: 30,
    alignItems: 'center'
  },
  rankText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '700',
    color: Constant.COLOR_RED,
    marginBottom: 5
  },
  textStyle: {
    color: Constant.COLOR_GREY,
    textAlign: 'center'
  },
  textStyleLast: {
    color: Constant.COLOR_GREY,
    textAlign: 'center',
    marginBottom: 35
  },
  submitBlock: {
    width: 180,
    alignSelf: 'center'
  },
  submitButton: {
    backgroundColor: Constant.COLOR_RED,
    justifyContent: 'center',
  },
  submitText: {
    color: Constant.COLOR_WHITE
  }
});