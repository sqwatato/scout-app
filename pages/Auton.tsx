import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Layout, Button, Text } from "@ui-kitten/components";
import { MatchData, MatchProps } from "./Match";
import Header from "../components/Header";
import Counter from "../components/Counter";
import { ScrollView } from "react-native-gesture-handler";
import MatchStatefulCounter from "../components/MatchStatefulCounter";

const Auton: FC<MatchProps> = ({ data, matchInfo, onChange, settings }) => {
  const [headerBackgroundColor] = useState(new Animated.Value(0));
  const interpolateHeaderBackgroundColor = headerBackgroundColor.interpolate({
    inputRange: [0, 255],
    outputRange: ["#fff0", "#aaf2"],
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
            <Text category="h4" style={{ paddingTop: 120 }}>
              Succesful Shots
            </Text>

            <MatchStatefulCounter
              onDataChange={onChange}
              data={data}
              dataTitle={"autonBottom"}
              name="Auton Bottom"
              haptic={settings.haptic}
            />
            <MatchStatefulCounter
              onDataChange={onChange}
              data={data}
              dataTitle={"autonUpper"}
              name="Auton Upper"
              haptic={settings.haptic}
            />
            <MatchStatefulCounter
              onDataChange={onChange}
              data={data}
              dataTitle={"autonInner"}
              name="Auton Inner"
              haptic={settings.haptic}
            />
          </View>

          <View style={styles.section}>
            <Text category="h4">Missed Shots</Text>

            <MatchStatefulCounter
              onDataChange={onChange}
              data={data}
              dataTitle={"autonBottomMissed"}
              name="Auton Bottom"
              haptic={settings.haptic}
            />
            <MatchStatefulCounter
              onDataChange={onChange}
              data={data}
              dataTitle={"autonUpperMissed"}
              name="Auton Upper"
              haptic={settings.haptic}
            />
            <MatchStatefulCounter
              onDataChange={onChange}
              data={data}
              dataTitle={"autonInnerMissed"}
              name="Auton Inner"
              haptic={settings.haptic}
            />
          </View>
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
    marginTop: 35,
  },
});

export default Auton;
