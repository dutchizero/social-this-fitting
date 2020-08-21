import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Constant from './Constant';

import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export default class Login extends React.Component {
  


  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google , Facebook , Etc as auth providers.
    signInOptions: [
      //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      //firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false
    }
  };



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
            placeholder="Email" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
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