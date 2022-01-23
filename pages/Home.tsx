import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Layout, Text } from "@ui-kitten/components";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuton, usePostGame, usePreGame, useTeleop } from "../Stores";
import { Navigate } from "react-router-dom";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const setPreGame = usePreGame((state) => state.set);
  const pregame = usePreGame((state) => state);
  const setAuton = useAuton((state) => state.set);
  const setTeleop = useTeleop((state) => state.set);
  const setPostGame = usePostGame((state) => state.set);

  useEffect(() => {
    (async () => {
      try {
        console.log("hello");
        const [pregameStr, autonStr, teleopStr, endgameStr] = await Promise.all(
          [
            AsyncStorage.getItem("@scout_pregame"),
            AsyncStorage.getItem("@scout_auton"),
            AsyncStorage.getItem("@scout_teleop"),
            AsyncStorage.getItem("@scout_postgame"),
          ]
        );
        const pregameData = JSON.parse(pregameStr || "");
        const autonData = JSON.parse(autonStr || "");
        const teleopData = JSON.parse(teleopStr || "");
        const endgameData = JSON.parse(endgameStr || "");/*
        const pregameData = JSON.parse("");
        const autonData = JSON.parse("");
        const teleopData = JSON.parse("");
        const endgameData = JSON.parse("");*/

        setPreGame(pregameData);
        setAuton(autonData);
        setTeleop(teleopData);
        setPostGame(endgameData);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const clearData = () => {
    const preEmpty = {
      matchNum: "",
      alliance: "",
      regional: "",
      minfo: "",
      teamNum: "",
      teams: ["", "", ""],
    };

    const autonEmpty = {
      preloads: 0,
      initLineCrosses: false,
      autonUpper: 0,
      autonInner: 0,
      autonUpperMissed: 0,
      autonBottom: 0,
      autonBottomMissed: 0,
    };

    const teleopEmpty = {
      teleopUpper: 0,
      teleopInner: 0,
      teleopUpperMissed: 0,
      teleopBottom: 0,
      teleopBottomMissed: 0,
      cycles: 0,
      trench: false,
      defense: false,
      rotation: false,
      stuck: false,
      disabled: false,
    };

    const endEmpty = {
      climbTime: 0,
      hangFail: false,
      levelFail: false,
      attemptHang: false,
      attemptLevel: false,
      buddy: false,
      comments: "",
    };

    const pregameData = JSON.stringify(preEmpty);
    const autonData = JSON.stringify(autonEmpty);
    const teleopData = JSON.stringify(teleopEmpty);
    const endgameData = JSON.stringify(endEmpty);

    // console.log("im stupid" + pregameData);

    AsyncStorage.setItem("@scout_pregame", JSON.stringify(pregameData));
    AsyncStorage.setItem("@scout_auton", JSON.stringify(autonData));
    AsyncStorage.setItem("@scout_teleop", JSON.stringify(teleopData));
    AsyncStorage.setItem("@scout_postgame", JSON.stringify(endgameData));
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.childContainer}>
        <StatusBar style="auto" />
        <View>
          <Text category="h1" style={{}}>
            Scout App
          </Text>
          <Divider style={{ width: 40 }} />
        </View>
        <View>
          <Button
            onPress={() => {
              clearData();
              navigation.navigate("QRScanner");
            }}
            style={styles.button}
            size="giant"
          >
            Scout New Match
          </Button>
          <Button 
            onPress={() =>{
              navigation.navigate("Login");
            }}
            style={styles.button}
            size="giant"
          >
            Login
          </Button>
          <Button
            onPress={() => {
              console.log(pregame);
              navigation.navigate("Match");
            }}
            style={[styles.button, { shadowOpacity: 0 }]}
            appearance="outline"
            size="giant"
          >
            Continue Scouting
          </Button>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  bgimage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  childContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
    position: "relative",
    resizeMode: "cover",
    backgroundColor: "#fffe",
  },
  button: {
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
  settings: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default Home;
