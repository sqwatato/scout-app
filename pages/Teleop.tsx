import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Animated, Platform } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { MatchProps } from "./Match";
import Header from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import ShotsInput from "../components/ShotsInput";
import MatchStatefulCounter from "../components/MatchStatefulCounter";
import MatchStatefulToggle from "../components/MatchStatefulToggle";

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
          <View style={styles.section}>
            <ShotsInput auton={false} settings={settings} />
            <View style={styles.section}>
              <Text category="h4">Cycles</Text>
              <MatchStatefulCounter
                name="Cycles"
                dataTitle="cycles"
                haptic={settings.haptic}
              />
            </View>
            <View style={styles.section}>
              <Text category="h4">Rotation Disabled</Text>
              <MatchStatefulToggle
                dataTitle="rotationDisabled"
                name="Rotation Disabled"
              />
            </View>
          </View>
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
