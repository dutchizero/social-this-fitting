import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Constant from "./Constant";

import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Spinner from "react-native-loading-spinner-overlay";

export default class Login extends React.Component {
  state = {};

  handleLogin = () => {
    this.setState({ isLoading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .catch((error) => {
            console.log(error);
            this.setState({ isLoading: false });
            Alert.alert(
              "Incorrect email or password",
              "please try again or contact customer service",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
          });
        console.log(error);
      });
  };

  loginWithFacebook = async () => {
    await Facebook.initializeAsync("618372385511527");

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });
    console.log(type);
    if (type === "success") {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      console.log(credential);
      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) => console.log(res))
        .catch((error) => {
          console.log(error);
          // Handle Errors here.
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          overlayColor="rgba(0, 0, 0, 0.7)"
          visible={this.state.isLoading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <Image style={styles.logoImg} source={require("./assets/logo.png")} />
        <View style={styles.inputView}>
          <TextInput
            disabled={this.state.isLoading}
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            disabled={this.state.isLoading}
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>

        <View style={styles.loginBtnWrap}>
          <FontAwesome.Button
            disabled={
              !(this.state.email && this.state.password) || this.state.isLoading
            }
            name="key"
            style={styles.loginBtn}
            onPress={() => this.handleLogin()}
          >
            <Text style={styles.loginText}>Login / Register</Text>
          </FontAwesome.Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    height: "100%",
    backgroundColor: Constant.COLOR_GREY,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 28,
    color: Constant.COLOR_RED,
    marginBottom: 40,
  },
  logoImg: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: Constant.COLOR_WHITE,
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: Constant.COLOR_GREY,
  },
  forgot: {
    color: Constant.COLOR_GREY,
    fontSize: 11,
  },
  loginBtn: {
    backgroundColor: Constant.COLOR_FACEBOOK,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    width: "100%",
  },
  registerBtn: {
    backgroundColor: Constant.COLOR_ORANGE,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  loginText: {
    color: "white",
    fontWeight: "700",
    paddingLeft: 20,
    paddingRight: 20,
  },
  loginBtnWrap: {
    marginBottom: 15,
  },
});
