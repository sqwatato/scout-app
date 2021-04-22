import { Button } from "@ui-kitten/components";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { FC, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";

import { Ionicons } from "@expo/vector-icons";
import { TouchableNativeFeedback, TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from 'expo-haptics';
import { SettingContext } from '../context/SettingContext'


interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const QRScanner: FC<Props> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<string>("");
  const [scanning, setScanning] = useState<boolean>(false);

  const { settings, getSettingState } = React.useContext(SettingContext) as SettingContextType;

  const [haptic, setHaptic] = useState( getSettingState( "Haptic Feedback" ) );

  const handleBarCodeScanned = ({ type, data }) => {
    setScanning(false);

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.navigate("Match", { data });

    // setScannedData(data);
  };
  

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setScanning(true)
    })();
  });

  useEffect( () => {
    setHaptic( getSettingState("Haptic Feedback") );
  }, [getSettingState("Haptic Feedback")])

  return (
    <View style={styles.container}>
      <Text>{scannedData}</Text>
      {hasPermission && scanning && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {/* <View style={styles.buttonContainer}>
        {hasPermission && !scanning && (
          <View>
            <Button onPress={() => setScanning(true)}>Tap to Scan</Button>
          </View>
        )}
        {scanning && (
          <View>
            <Button onPress={() => setScanning(false)}>Cancel</Button>
          </View>
        )}
      </View> */}
      <SafeAreaView style={styles.backButtonContainer}>
        <TouchableOpacity 
          onPress = {() => {
              (haptic && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium) );
              navigation.goBack();
            } 
        }>
          <Ionicons name = "chevron-back-outline" size = {35} color = {"white"}/>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
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
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  backButtonContainer: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  button: {
    marginBottom: 2,
  },
});

export default QRScanner;
