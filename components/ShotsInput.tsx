import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import MatchStatefulCounter from "../components/MatchStatefulCounter";
import Section from "./Section";

type Props = {
  settings?;
  auton: boolean;
  padding?: number;
};

const ShotsInput: FC<Props> = ({ settings, auton, padding }) => {
  return (
    <View>
      <Section headerPadding={padding} headerTitle="Successful Shots">
        <MatchStatefulCounter
          dataTitle={`${auton ? "auton" : "teleop"}Bottom`}
          name={`${auton ? "Auton" : "Teleop"} Bottom`}
          haptic={settings.haptic}
        />
        <MatchStatefulCounter
          dataTitle={`${auton ? "auton" : "teleop"}Upper`}
          name={`${auton ? "Auton" : "Teleop"} Upper`}
          haptic={settings.haptic}
        />
        <MatchStatefulCounter
          dataTitle={`${auton ? "auton" : "teleop"}Inner`}
          name={`${auton ? "Auton" : "Teleop"} Inner`}
          haptic={settings.haptic}
        />
      </Section>

      <Section headerTitle="Missed Shots">
        <MatchStatefulCounter
          dataTitle={`${auton ? "auton" : "teleop"}BottomMissed`}
          name={`${auton ? "Auton" : "Teleop"} Bottom`}
          haptic={settings.haptic}
        />
        <MatchStatefulCounter
          dataTitle={`${auton ? "auton" : "teleop"}UpperMissed`}
          name={`${auton ? "Auton" : "Teleop"} Upper`}
          haptic={settings.haptic}
        />
        <MatchStatefulCounter
          dataTitle={`${auton ? "auton" : "teleop"}InnerMissed`}
          name={`${auton ? "Auton" : "Teleop"} Inner`}
          haptic={settings.haptic}
        />
      </Section>
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
