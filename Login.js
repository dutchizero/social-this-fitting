import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Constant from './Constant';

import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { Facebook } from 'expo';

export default class Login extends React.Component {

  handleLoginFacebook = () => {
    loginWithFacebook();
  }

  loginWithFacebook = async () => {
    await Facebook.initializeAsync(
       '618372385511527',
    );
  
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      { permissions: ['public_profile'] }
    );
  
    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
  
      // Sign in with credential from the Facebook user.
      firebase.auth().signInWithCredential(credential).catch((error) => {
        // Handle Errors here.
      });
    }
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
        <FontAwesome.Button name="facebook" style={styles.loginBtn} onClick={() => this.loginWithFacebook()}>
          <Text style={styles.loginText}>Login with Facebook</Text>
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