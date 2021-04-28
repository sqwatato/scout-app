import React, { FC, useEffect, useState, useRef } from "react";
import { StyleSheet, View, Animated, Platform } from "react-native";
import { Layout, Button, Text } from "@ui-kitten/components";
import { MatchData, MatchProps } from "./Match";
import Header from "../components/Header";
import Counter from "../components/Counter";
import { ScrollView } from "react-native-gesture-handler";
import MatchStatefulCounter from "../components/MatchStatefulCounter";
import ShotsInput from "../components/ShotsInput";

const Auton: FC<MatchProps> = ({ data, matchInfo, onChange, settings }) => {
  const [headerBackgroundColor] = useState(new Animated.Value(0));
  const interpolateHeaderBackgroundColor = headerBackgroundColor.interpolate({
    inputRange: [0, 255],
    outputRange: ["#fff0", Platform.OS === "ios" ? "#aaf2" : "#aaf9"],
  });

  const [scrollOffset, setOffset] = useState(0);

  const scrollRef = useRef({
    scrollOffset: 0,
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
          contentOffset={{ x: 0, y: scrollRef.current.scrollOffset }}
          showsVerticalScrollIndicator={false}
          onScroll={(e) => {
            scrollRef.current.scrollOffset = e.nativeEvent.contentOffset.y;
            if (e.nativeEvent.contentOffset.y > 0)
              Animated.timing(headerBackgroundColor, {
                toValue: 255,
                duration: 150,
                useNativeDriver: false,
              }).start();
            else
              Animated.timing(headerBackgroundColor, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false,
              }).start();
          }}
          style={{ zIndex: 0 }}
        >
          <ShotsInput
            auton
            data={data}
            onChange={onChange}
            settings={settings}
          />
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
