import React, { FC, useState } from "react";
import { Settings, StyleSheet, View } from "react-native";
import { Layout, Button, Text, IndexPath } from "@ui-kitten/components";
import { MatchProps } from "./Match";
import Counter from "../components/Counter";

const Auton: FC<MatchProps> = ({ data, matchInfo, onChange, settings }) => {
  const [autonInner, setAutonInner] = useState<number>(
    data ? (data.autonInner ? data.autonInner : 0) : 0
  );
  const [autonUpper, setAutonUpper] = useState<number>(
    data ? (data.autonUpper ? data.autonUpper : 0) : 0
  );
  const [autonBottom, setAutonBottom] = useState<number>(
    data ? (data.autonBottom ? data.autonBottom : 0) : 0
  );

  const handleSave = () => {
    onChange({
      ...data,
      autonInner,
      autonUpper,
      autonBottom,
    });
  };

  return (
    <Layout style={styles.container} level="1">
      <Text category="h1">Auton!</Text>
      <Counter
        value={autonBottom}
        onChange={setAutonBottom}
        name="Auton Bottom"
        haptic={settings.haptic}
      />
      <Counter
        value={autonUpper}
        onChange={setAutonUpper}
        name="Auton Upper"
        haptic={settings.haptic}
      />
      <Counter
        value={autonInner}
        onChange={setAutonInner}
        name="Auton Inner"
        haptic={settings.haptic}
      />
      <Button onPress={handleSave}>Save Auton Data</Button>
      <Text>{JSON.stringify(matchInfo)}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 25,
  },
  dropdown: {
    width: "70%",
  },
});

export default Auton;
