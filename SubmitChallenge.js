import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Constant from './Constant';
import { Pedometer } from 'expo-sensors';
import { getCurrentUserId, updateUserChallengeScore, getCurrentUserDisplayName, getRealTimeChallengeScoreByUserID, getRealTimeHiestScore, createJoin } from './firebase/firebaseDB';

export default class SubmitChallenge extends React.Component {
  state = {
    isPedometerAvailable: 'checking',
    pastStepCount: 0,
    currentStepCount: 0,
    challengerScore: 0,
    hiestScore: 0,
    allChallenger: 0,
    yourRank: 0
  };

  componentDidMount() {
    this._subscribe();
    getRealTimeChallengeScoreByUserID(getCurrentUserId(), this.props.selectedChallenge.id).onSnapshot(
      (item) => {
        if (item.docs.length > 0) {
          this.setState({ challengerScore: item.docs.map(item1 => { return item1.data().Score })[0] });
        } else {
          console.log('asdas')
          var id = getCurrentUserId().toString();
          var name = getCurrentUserDisplayName();
          createJoin(`${id}-${this.props.selectedChallenge.id}`,
            {
              UserID: id,
              ChallengeID: this.props.selectedChallenge.id,
              Score: 0,
              DisplayName: name
            });
          this.setState({ challengerScore: 0 });
        }
      });
    getRealTimeHiestScore(this.props.selectedChallenge.id).onSnapshot((item) => {
      var sortingScore = item.docs.map(item1 => { return item1.data() }).sort(function (a, b) {
        return b.Score - a.Score;
      });
      var id = getCurrentUserId().toString();
      for (var i = 0; i < sortingScore.length; i++) {
        if (sortingScore[i].UserID == id) {
          this.setState({ yourRank: i+1 });
          break;
        }
      }
      this.setState({ hiestScore: sortingScore[0].Score });
      this.setState({ allChallenger: sortingScore.length });
    });
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
    const { challengerScore, currentStepCount } = this.state;
    const currentDate = new Date();
    const userId = getCurrentUserId().toString();
    const updatedChallengerScore = {
      ChallengeID: selectedChallenge.id,
      UserID: getCurrentUserId(),
      Unit: selectedChallenge.data.WinConditionUnit,
      UpdatedAt: currentDate,
      Score: currentStepCount + challengerScore
    }
    updateUserChallengeScore(`${userId}-${selectedChallenge.id}`, updatedChallengerScore);
    this.setState({ currentStepCount: 0 });
    this.props.goToJoin();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleBlock}>
          <Image
            style={styles.challengeIcon}
            source={require('./assets/img/footprint.png')}
          />
          <Text style={styles.challengeTitle}>{this.props.selectedChallenge.data.ChallengeName}</Text>
        </View>
        <View style={styles.contentBlock}>
          <Text style={styles.challengeDesc}><Text style={{ fontWeight: "bold" }}>Rule:</Text> {this.props.selectedChallenge.data.WinCondition} {this.props.selectedChallenge.data.WinConditionValue} {this.props.selectedChallenge.data.WinConditionUnit}</Text>
          <Text style={styles.challengeDesc}><Text style={{ fontWeight: "bold" }}>Reward:</Text> {this.props.selectedChallenge.data.WinnerPrize}</Text>
        </View>
        <View style={styles.rankingBlock}>
          <Text style={styles.rankText}>Your Rank:{"\n"}{this.state.yourRank}/{this.state.allChallenger}</Text>
          <Text style={styles.rankTextSmall}>(#1: {this.state.hiestScore.toLocaleString()} steps)</Text>
        </View>
        <View style={styles.contentBlock}>
          <Text style={styles.textStyle}>Your Total Step: <Text style={{ fontWeight: "bold" }}>{this.state.challengerScore.toLocaleString()}</Text></Text>
          <Text style={styles.textStyleLast}>Your Step Today: <Text style={{ fontWeight: "bold", color: Constant.COLOR_RED }}>{this.state.currentStepCount}</Text></Text>
        </View>
        <View style={styles.submitBlock}>
          <FontAwesome.Button name="rocket" style={styles.submitButton} onPress={() => { this.handleSubmitScore() }}>
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