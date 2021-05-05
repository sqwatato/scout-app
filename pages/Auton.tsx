import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Animated, Platform } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { MatchProps } from "./Match";
import Header from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import ShotsInput from "../components/ShotsInput";
import MatchStatefulToggle from "../components/MatchStatefulToggle";
import Section from "../components/Section";
import MatchStatefulRadio from "../components/MatchStatefulRadio";
import MatchStatefulCounter from "../components/MatchStatefulCounter";

const Auton: FC<MatchProps> = ({ matchInfo, settings }) => {
  const [headerBackgroundColor] = useState(new Animated.Value(0));
  const interpolateHeaderBackgroundColor = headerBackgroundColor.interpolate({
    inputRange: [0, 255],
    outputRange: ["#fff0", Platform.OS === "ios" ? "#aaf2" : "#aaf9"],
  });

  const [matchInfoState, setMatchInfoState] = useState(matchInfo);

  useEffect(() => {
    setMatchInfoState(matchInfo);
  }, [matchInfo]);

  return (
    <Layout style={styles.container} level="1">
      <View>
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={{ zIndex: 0 }}
        >
          <Section headerTitle="Crossing" headerPadding={120}>
            <MatchStatefulToggle
              dataTitle="crossedInitLine"
              name="Crossed Initiation Line"
            />
          </Section>
          <Section headerTitle="Starting Location">
            <MatchStatefulRadio
              dataTitle="start"
              values={[1, 2, 3]}
              options={["Location 1", "Location 2", "Location 3"]}
            />
          </Section>
          <Section headerTitle="Preloads">
            <MatchStatefulCounter
              name="Preloads"
              dataTitle="preloads"
              haptic={settings.haptic}
            />
          </Section>
          <ShotsInput auton settings={settings} />
        </ScrollView>
      </View>
      <Header
        title="Auton"
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

export default Auton;
