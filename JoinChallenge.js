import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Constant from "./Constant";
import {
  getAllChallenge,
  getAllChallengeStatus,
  getChallengeScoreByUserID,
  getCurrentUserId,
} from "./firebase/firebaseDB";
import Spinner from "react-native-loading-spinner-overlay";

export default class JoinChallenge extends React.Component {
  state = {
    challengeList: [],
    userID: "",
    myChallengeListId: [],
    challengeStatusList: [],
    refreshing: false,
    isLoading: true,
  };

  componentDidMount() {
    getChallengeScoreByUserID(getCurrentUserId()).then((data) => {
      this.setState({
        myChallengeListId: data.docs.map((item) => {
          return item.data().ChallengeID;
        }),
      });
    });

    getAllChallenge().then((challengeList) => {
      this.setState({ challengeList: challengeList.data });
    });

    getAllChallengeStatus().onSnapshot((item) => {
      this.setState({
        challengeStatusList: item.docs.map((item1) => {
          return item1.data();
        }),
      });
    });
  }

  componentWillUnmount() {}

  render() {
    const { joinChallenge } = this.props;
    const {
      myChallengeListId,
      challengeList,
      challengeStatusList,
    } = this.state;

    let showChallenge = challengeList.filter(
      (i) => i.id == "5f3fc139aec6ec00013b230e"
    )[0];

    if (showChallenge) {
      const sendShowChallenge = showChallenge;
      showChallenge = showChallenge.data;

      return (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1100);
              }}
            ></RefreshControl>
          }
        >
          <View style={styles.textBlock}>
            <Text style={styles.titleStyle}>Current Challenge</Text>
            <Text style={styles.challengeCountStyle}>(1 challenge)</Text>
          </View>

          <View style={styles.challengeLoop}>
            <View style={styles.challengeBox}>
              <View style={styles.leftBox}>
                <Image
                  style={styles.challengeIcon}
                  source={require("./assets/img/footprint.png")}
                />
                <Text style={styles.textStyleLeft}>Long Walking</Text>
                <Text style={styles.textStyleLeft}>96 / 100</Text>
                <Text style={styles.textStyleLeft}>Challengers</Text>
              </View>
              <View style={styles.rightBox}>
                <Text style={styles.challengeTitle}>
                  {showChallenge.ChallengeName}
                </Text>
                <Text style={styles.challengeDesc}>
                  <Text style={{ fontWeight: "bold" }}>Rule:</Text> {"\n"}
                  {showChallenge.WinCondition} {showChallenge.WinConditionValue}{" "}
                  {showChallenge.WinConditionUnit}
                </Text>
                <Text style={styles.challengeDesc}>
                  <Text style={{ fontWeight: "bold" }}>Reward:</Text> {"\n"}
                  {showChallenge.WinnerPrize}
                </Text>
              </View>
            </View>
            <FontAwesome.Button
              name="rocket"
              style={styles.joinButton}
              onPress={() => joinChallenge(sendShowChallenge)}
            >
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
                  source={require("./assets/img/footprint.png")}
                />
                <Text style={styles.textStyleLeft}>Long Walking</Text>
                <Text style={styles.textStyleLeft}>96 / 100</Text>
                <Text style={styles.textStyleLeft}>Challengers</Text>
              </View>
              <View style={styles.rightBox}>
                <Text style={styles.challengeTitle}>
                  True Walking Challenge
                </Text>
                <Text style={styles.challengeDesc}>
                  <Text style={{ fontWeight: "bold" }}>Rule:</Text> {"\n"}First
                  100,000 steps
                </Text>
                <Text style={styles.challengeDesc}>
                  <Text style={{ fontWeight: "bold" }}>Reward:</Text> {"\n"}
                  5,000THB GoEat Coupon
                </Text>
              </View>
            </View>
            <FontAwesome.Button name="rocket" style={styles.waitJoinButton}>
              <Text style={styles.joinText}>JOIN</Text>
            </FontAwesome.Button>
          </View>

          <View style={styles.waitChallengeLoop}>
            <View style={styles.challengeBox}>
              <View style={styles.leftBox}>
                <Image
                  style={styles.challengeIcon}
                  source={require("./assets/img/footprint.png")}
                />
                <Text style={styles.textStyleLeft}>Long Walking</Text>
                <Text style={styles.textStyleLeft}>96 / 100</Text>
                <Text style={styles.textStyleLeft}>Challengers</Text>
              </View>
              <View style={styles.rightBox}>
                <Text style={styles.challengeTitle}>
                  True Walking Challenge
                </Text>
                <Text style={styles.challengeDesc}>
                  <Text style={{ fontWeight: "bold" }}>Rule:</Text> {"\n"}First
                  100,000 steps
                </Text>
                <Text style={styles.challengeDesc}>
                  <Text style={{ fontWeight: "bold" }}>Reward:</Text> {"\n"}
                  5,000THB GoEat Coupon
                </Text>
              </View>
            </View>
            <FontAwesome.Button name="rocket" style={styles.waitJoinButton}>
              <Text style={styles.joinText}>JOIN</Text>
            </FontAwesome.Button>
          </View>

          <View style={styles.waitChallengeLoop}>
            <View style={styles.challengeBox}>
              <View style={styles.leftBox}>
                <Image
                  style={styles.challengeIcon}
                  source={require("./assets/img/footprint.png")}
                />
                <Text style={styles.textStyleLeft}>Long Walking</Text>
                <Text style={styles.textStyleLeft}>96 / 100</Text>
                <Text style={styles.textStyleLeft}>Challengers</Text>
              </View>
              <View style={styles.rightBox}>
                <Text style={styles.challengeTitle}>
                  True Walking Challenge
                </Text>
                <Text style={styles.challengeDesc}>
                  <Text style={{ fontWeight: "bold" }}>Rule:</Text> {"\n"}First
                  100,000 steps
                </Text>
                <Text style={styles.challengeDesc}>
                  <Text style={{ fontWeight: "bold" }}>Reward:</Text> {"\n"}
                  5,000THB GoEat Coupon
                </Text>
              </View>
            </View>
            <FontAwesome.Button name="rocket" style={styles.waitJoinButton}>
              <Text style={styles.joinText}>JOIN</Text>
            </FontAwesome.Button>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View>
          <Spinner
            overlayColor="rgba(0, 0, 0, 0.7)"
            visible={this.state.isLoading}
            textContent={"Loading..."}
            textStyle={{ color: "#fff" }}
          />
        </View>
      );
    }
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 3,
  },
  leftBox: {
    alignSelf: "flex-start",
    width: "35%",
    padding: 15,
    paddingRight: 15,
    backgroundColor: "white",
    textAlign: "center",
  },
  rightBox: {
    alignSelf: "flex-end",
    height: "100%",
    width: "65%",
    padding: 15,
    paddingRight: 15,
    backgroundColor: Constant.COLOR_GREY,
  },
  waitChallengeLoop: {
    opacity: 0.7,
  },
  joinButton: {
    backgroundColor: Constant.COLOR_RED,
    justifyContent: "center",
  },
  waitJoinButton: {
    backgroundColor: "grey",
    justifyContent: "center",
  },
  joinText: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    color: Constant.COLOR_WHITE,
  },
  challengeTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    color: Constant.COLOR_RED,
  },
  challengeDesc: {
    marginTop: 5,
    marginBottom: 5,
    color: Constant.COLOR_WHITE,
  },
  challengeDescLast: {
    marginBottom: 15,
  },
  textStyleLeft: {
    color: Constant.COLOR_GREY,
    fontWeight: "500",
    fontSize: 13,
    textAlign: "center",
  },
  challengeIcon: {
    marginBottom: 15,
    width: 50,
    height: 50,
    margin: "auto",
    alignSelf: "center",
  },
  textStyle: {
    color: Constant.COLOR_GREY,
    fontWeight: "500",
    fontSize: 13,
  },
  textBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
  },
  titleStyle: {
    color: Constant.COLOR_GREY,
    fontSize: 24,
    fontWeight: "700",
    alignSelf: "flex-start",
  },
  challengeCountStyle: {
    color: Constant.COLOR_GREY,
    alignSelf: "flex-end",
    fontSize: 11,
    fontWeight: "700",
    marginLeft: "auto",
  },
});
