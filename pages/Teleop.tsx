import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Animated, Platform } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { MatchProps } from "./Match";
import Header from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import ShotsInput from "../components/ShotsInput";
import MatchStatefulCounter from "../components/MatchStatefulCounter";
import MatchStatefulToggle from "../components/MatchStatefulToggle";
import Section from "../components/Section";

const Teleop: FC<MatchProps> = ({ matchInfo, settings }) => {
  const [headerBackgroundColor] = useState(new Animated.Value(0));
  const interpolateHeaderBackgroundColor = headerBackgroundColor.interpolate({
    inputRange: [0, 255],
    outputRange: ["#fff0", Platform.OS === "ios" ? "#aaf2" : "#abf9"],
  });

  const [matchInfoState, setMatchInfoState] = useState(matchInfo);

  useEffect(() => {
    setMatchInfoState(matchInfo);
  }, [matchInfo]);

  return (
    <Layout style={styles.container} level="1">
      <View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ zIndex: 0 }}>
          <Section>
            <ShotsInput auton={false} settings={settings} padding={120} />
            <Section headerTitle="Cycles">
              <MatchStatefulCounter
                name="Cycles"
                dataTitle="cycles"
                haptic={settings.haptic}
              />
            </Section>
            <Section headerTitle="Rotation Disabled">
              <MatchStatefulToggle
                dataTitle="rotationDisabled"
                name="Rotation Disabled"
              />
            </Section>
            <Section headerTitle="Position Disabled">
              <MatchStatefulToggle
                dataTitle="positionDisabled"
                name="Position Disabled"
              />
            </Section>
            <Section headerTitle="Trench">
              <MatchStatefulToggle dataTitle="trench" name="Trench" />
            </Section>
            <Section headerTitle="Defense">
              <MatchStatefulToggle dataTitle="defense" name="Defense" />
            </Section>
            <Section headerTitle="Stuck">
              <MatchStatefulToggle dataTitle="stuck" name="Stuck" />
            </Section>
            <Section headerTitle="Disabled">
              <MatchStatefulToggle dataTitle="disabled" name="Disabled" />
            </Section>
          </Section>
        </ScrollView>
      </View>
      <Header
        title="Teleop"
        matchInfo={matchInfoState}
        backgroundColor={interpolateHeaderBackgroundColor}
      />
    </Layout>
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

export default Teleop;
