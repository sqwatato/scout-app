import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
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

const Auton: FC<MatchProps> = ({ data, matchInfo, onChange }) => {
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
      />
      <Counter value={autonUpper} onChange={setAutonUpper} name="Auton Upper" />
      <Counter value={autonInner} onChange={setAutonInner} name="Auton Inner" />
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
  },
  dropdown: {
    width: "70%",
  },
});

export default Auton;
