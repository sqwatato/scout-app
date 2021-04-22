import React, { FC, useState } from "react";
import { Settings, StyleSheet, View } from "react-native";
import {
  Layout,
  Card,
  Button,
  Text,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { MatchProps } from "./Match";
import Counter from "../components/Counter";

const Auton: FC<MatchProps> = ({ data, matchInfo, onChange, settings }) => {
  const [autonInner, setAutonInner] = useState<number>(0);
  const [autonUpper, setAutonUpper] = useState<number>(0);
  const [autonBottom, setAutonBottom] = useState<number>(0);

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [displayValue, setDisplayValue] = useState("Team 1");

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
        haptic = { settings.haptic }
      />
      <Counter value={autonUpper} onChange={setAutonUpper} name="Auton Upper" haptic = { settings.haptic }/>
      <Counter value={autonInner} onChange={setAutonInner} name="Auton Inner" haptic = { settings.haptic } />
      <Button onPress={handleSave}>Save Auton</Button>
      <Text>{JSON.stringify(matchInfo)}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 25
  },
  dropdown: {
    width: "70%",
  },
});

export default Auton;
