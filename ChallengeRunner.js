import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Constant from './Constant';

import { getChallengeScoreByUserIDAndChallengeID, updateUserChallengeScore } from './firebase/firebaseDB';

export default class ChallengeRunner extends React.Component {
  state={
    currentScore: 0,
    dbh: null,
    oldScore: 0,
    challengerScore: {},
    docId: ''
  }

  componentDidMount() {
    const { chalengeId, userId } = this.props;
    getChallengeScoreByUserIDAndChallengeID(userId, chalengeId).then(data => {
        if (!data.empty) {
            data.docs.map(item => {
                this.setState({docId: item.id});
                this.setState({challengerScore: item.data()})
            });
        }
    });
  }

  handleSubmitScore = () => {
    const { userId, chalengeId } = this.props;
    const { currentScore, challengerScore, docId } = this.state;
    const currentDate = new Date();
    const updatedChallengerScore = {
        ChallengeID: chalengeId,
        UserID: userId,
        Unit: challengerScore.Unit,
        UpdatedAt: currentDate,
        Score: currentScore
    }
    updateUserChallengeScore(docId, updatedChallengerScore);
  }

  handleScoreChange = (score) => {
    this.setState({currentScore: score});
  }

  render(){
    return (
      <View style={styles.container}>
        <Image
          style={styles.logoImg}
          source={require('./assets/logo.png')}
        />
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Score" 
            placeholderTextColor="#003f5c"
            onChangeText={score => this.handleScoreChange(score)}/>
        </View>
        <FontAwesome.Button style={styles.loginBtn} onClick={() => { this.handleSubmitScore()}}>
          <Text style={styles.loginText}>Submit Score</Text>
        </FontAwesome.Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Constant.COLOR_GREY,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'none'
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
    padding:20
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