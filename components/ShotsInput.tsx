import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Layout, Button, Text } from "@ui-kitten/components";
import { MatchData, MatchProps } from "../pages/Match";
import Header from "../components/Header";
import Counter from "../components/Counter";
import { ScrollView } from "react-native-gesture-handler";
import MatchStatefulCounter from "../components/MatchStatefulCounter";

type Props = {
  data: MatchData;
  onChange: (data: MatchData) => void;
  settings?;
  auton: boolean;
};

const ShotsInput: FC<Props> = ({ data, onChange, settings, auton }) => {
  return (
    <View>
      <View style={styles.section}>
        <Text category="h4" style={{ paddingTop: 120 }}>
          Succesful Shots
        </Text>

        <MatchStatefulCounter
          onDataChange={onChange}
          data={data}
          dataTitle={`${auton ? "auton" : "teleop"}Bottom`}
          name={`${auton ? "Auton" : "Teleop"} Bottom`}
          haptic={settings.haptic}
        />
        <MatchStatefulCounter
          onDataChange={onChange}
          data={data}
          dataTitle={`${auton ? "auton" : "teleop"}Upper`}
          name={`${auton ? "Auton" : "Teleop"} Upper`}
          haptic={settings.haptic}
        />
        <MatchStatefulCounter
          onDataChange={onChange}
          data={data}
          dataTitle={`${auton ? "auton" : "teleop"}Inner`}
          name={`${auton ? "Auton" : "Teleop"} Inner`}
          haptic={settings.haptic}
        />
      </View>

      <View style={styles.section}>
        <Text category="h4">Missed Shots</Text>

        <MatchStatefulCounter
          onDataChange={onChange}
          data={data}
          dataTitle={`${auton ? "auton" : "teleop"}BottomMissed`}
          name={`${auton ? "Auton" : "Teleop"} Bottom`}
          haptic={settings.haptic}
        />
        <MatchStatefulCounter
          onDataChange={onChange}
          data={data}
          dataTitle={`${auton ? "auton" : "teleop"}UpperMissed`}
          name={`${auton ? "Auton" : "Teleop"} Upper`}
          haptic={settings.haptic}
        />
        <MatchStatefulCounter
          onDataChange={onChange}
          data={data}
          dataTitle={`${auton ? "auton" : "teleop"}InnerMissed`}
          name={`${auton ? "Auton" : "Teleop"} Inner`}
          haptic={settings.haptic}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  dropdown: {
    width: "70%",
  },
  section: {
    marginVertical: 20,
  },
});

export default ShotsInput;
