import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";

import { db } from "../firebase";
import { Layout, Card, Button, Text } from "@ui-kitten/components";

/*
Since this app is using React Native, you can not use the normal HTML elements.
Instead, React Native provides alternatives.
Learn more [here](https://reactnative.dev/docs/components-and-apis)

div -> View
img -> Image
input -> TextInput
*/

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<string>("");

  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);

  const [scanning, setScanning] = useState<boolean>(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScanning(false);
    Alert.alert(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
  };

  useEffect(() => {
    (async () => {
      try {
        // In the app, we will be only setting data
        // Just for the demo, we will fetch a document
        const query = await db
          .collection("regional")
          .doc("CAVE")
          .collection("matches")
          .doc("1")
          .collection("blue")
          .doc("7650")
          .get();
        setData(JSON.stringify(query.data()["data"]));
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })();
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  return (
    <Layout style={styles.container}>
      <Text category="h1">Home Page</Text>
      <StatusBar style="auto" />
      {loading ? (
        <Text>loading...</Text>
      ) : (
        <Card>
          <Text category="c1">{data}</Text>
        </Card>
      )}
      <Button
        style={styles.button}
        onPress={() => navigation.navigate("Settings")}
      >
        Go To Settings?
      </Button>

      {hasPermission && (
        <View>
          {scanned && (
            <Button onPress={() => setScanned(false)} style={styles.button}>
              Tap to Scan Again
            </Button>
          )}
          <Button
            onPress={() => {
              setScanned(false);
              setScanning(!scanning);
              console.log("scan");
            }}
          >
            Tap to Scan
          </Button>
        </View>
      )}
      {hasPermission && scanning && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <Button
        onPress={() => navigation.navigate("Match")}
        style={styles.button}
      >
        Go To Match
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 2,
  },
});

export default Home;
