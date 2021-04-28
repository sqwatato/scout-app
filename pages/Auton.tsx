import React, { FC, useEffect, useState } from "react";
import { Settings, StyleSheet, View, SafeAreaView, Animated } from "react-native";
import { Easing } from 'react-native-reanimated';
import { Layout, Button, Text, IndexPath } from "@ui-kitten/components";
import { BlurView } from 'expo-blur';
import { MatchProps } from "./Match";
import Header from "../components/Header";
import Counter from "../components/Counter";
import { ScrollView } from "react-native-gesture-handler";

const Auton: FC<MatchProps> = ({ data, matchInfo, onChange, settings }) => {
  const [headerBackgroundColor] = useState(new Animated.Value(0));
  const interpolateHeaderBackgroundColor = headerBackgroundColor.interpolate({
    inputRange: [0, 255],
    outputRange: ["#fff0", "#aaf2"],
  });
  const [autonInner, setAutonInner] = useState<number>(
    data ? (data.autonInner ? data.autonInner : 0) : 0
  );
  const [autonUpper, setAutonUpper] = useState<number>(
    data ? (data.autonUpper ? data.autonUpper : 0) : 0
  );
  const [autonBottom, setAutonBottom] = useState<number>(
    data ? (data.autonBottom ? data.autonBottom : 0) : 0
  );

  useEffect(() => {
    setAutonInner(data ? (data.autonInner ? data.autonInner : 0) : 0);
    setAutonUpper(data ? (data.autonUpper ? data.autonUpper : 0) : 0);
    setAutonBottom(data ? (data.autonBottom ? data.autonBottom : 0) : 0);
  }, [data]);

  const handleChange = (value: number, key: string) => {
    let dataCopy = { ...data };
    dataCopy[key] = value;
    onChange(dataCopy);
  };

  const [matchInfoState, setMatchInfoState] = useState(matchInfo);

  useEffect(() => {
    setMatchInfoState(matchInfo);
  }, [matchInfo]);

  return (
    <Layout style={styles.container} level="1">
      <View>
      <ScrollView 
          showsVerticalScrollIndicator={false}
          onScroll = {( e ) => {
            if( e.nativeEvent.contentOffset.y > 0 )
              Animated.timing( headerBackgroundColor, {
                toValue: 255,
                duration: 150,
                useNativeDriver: false
              }).start()
            else
              Animated.timing( headerBackgroundColor, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false
              }).start()
          }}
          style = {{zIndex: 0}}
        >
          <View style={styles.section}>
            <Text category="h4" style={{ paddingTop: 120 }}>
              Succesful Shots
            </Text>

            <Counter
              value={autonBottom}
              onChange={(val) => {handleChange(val, "autonBottom")}}
              name="Auton Bottom"
              haptic={settings.haptic}
            />
            <Counter
              value={autonUpper}
              onChange={(val) => handleChange(val, "autonUpper")}
              name="Auton Upper"
              haptic={settings.haptic}
            />
            <Counter
              value={autonInner}
              onChange={(val) => handleChange(val, "autonInner")}
              name="Auton Inner"
              haptic={settings.haptic}
            />
          </View>

          <View style={styles.section}>
            <Text category="h4">Missed Shots</Text>

            <Counter
              value={0}
              onChange={() => {}}
              name="Auton Bottom"
              haptic={settings.haptic}
            />
            <Counter
              value={0}
              onChange={() => {}}
              name="Auton Upper"
              haptic={settings.haptic}
            />
            <Counter
              value={0}
              onChange={() => {}}
              name="Auton Inner"
              haptic={settings.haptic}
            />
            {/* <Text>{JSON.stringify(matchInfo)}</Text> */}
          </View>
          <Button onPress = {() => {}}>Finish Auton</Button>
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
