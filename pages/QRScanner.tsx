import { Button } from "@ui-kitten/components";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { FC, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const QRScanner: FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<string>("");
  const [scanning, setScanning] = useState<boolean>(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanning(false);
    Alert.alert(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    setScannedData(data);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  });

  return (
    <View style={styles.container}>
      <Text>{scannedData}</Text>
      {hasPermission && scanning && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <View style={styles.buttonContainer}>
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
      </View>
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
  button: {
    margin: 2,
  },
});

export default QRScanner;
