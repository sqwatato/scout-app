import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Layout, Text } from "@ui-kitten/components";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Home: React.FC<Props> = ({ navigation }) => {
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
              navigation.navigate("QRScanner");
            }}
            style={styles.button}
            size="giant"
          >
            Scout New Match
          </Button>
          {/* <Button
            onPress={() => {
              navigation.navigate("Match", { data: "1@MVHS:b[115,115,115]" });
            }}
            style={[styles.button, { shadowOpacity: 0 }]}
            appearance="outline"
            size="giant"
          >
            Continue Scouting
          </Button> */}
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
