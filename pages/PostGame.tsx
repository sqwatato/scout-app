import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Animated, Platform } from "react-native";
import { Layout, Button, Text, Radio, RadioGroup } from "@ui-kitten/components";
import { MatchProps } from "./Match";
import Header from "../components/Header";
import { ScrollView } from "react-native-gesture-handler";
import { useData } from "../context/DataContext";
import MatchStatefulToggle from "../components/MatchStatefulToggle";
import Section from "../components/Section";

const PostGame: FC<MatchProps> = ({ matchInfo }) => {
  const [headerBackgroundColor] = useState(new Animated.Value(0));
  const interpolateHeaderBackgroundColor = headerBackgroundColor.interpolate({
    inputRange: [0, 255],
    outputRange: ["#fff0", Platform.OS === "ios" ? "#aaf2" : "#aaf9"],
  });

  const [matchInfoState, setMatchInfoState] = useState(matchInfo);
  const { data, setData } = useData();
  const defaultHang = data
    ? !data.attemptHang
      ? 2
      : data.hangFail
      ? 1
      : 0
    : 2;
  const defaultLevel = data
    ? !data.attemptLevel
      ? 2
      : data.levelFail
      ? 1
      : 0
    : 2;
  useEffect(() => {
    setMatchInfoState(matchInfo);
  }, [matchInfo]);

  return (
    <Layout style={styles.container} level="1">
      <View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ zIndex: 0 }}>
          <Section>
            {/* <ButtonGroup
              style={{ marginTop: 120, ...styles.startStopClimb }}
              appearance="outline"
            >
              <Button onPress={() => {}} style={styles.halfButton}>
                Start Climb
              </Button>
              <Button onPress={() => {}} style={styles.halfButton}>
                Change
              </Button>
            </ButtonGroup> */}

            <RadioGroupWrapper
              choices={["Success", "Fail", "Did not Attempt"]}
              title="Hang"
              titleStyle={{ marginTop: 120 }}
              defaultChoice={defaultHang}
              onDataChange={(index: number) => {
                if (index === 0)
                  setData({ ...data, attemptHang: true, hangFail: false });
                else if (index === 1)
                  setData({ ...data, attemptHang: true, hangFail: true });
                else setData({ ...data, attemptHang: false, hangFail: true });
              }}
            />
          </Section>
          <Section>
            <RadioGroupWrapper
              choices={["Success", "Fail", "Did not Attempt"]}
              title="Level"
              defaultChoice={defaultLevel}
              onDataChange={(index: number) => {
                if (index === 0)
                  setData({ ...data, attemptLevel: true, levelFail: false });
                else if (index === 1)
                  setData({ ...data, attemptLevel: true, levelFail: true });
                else setData({ ...data, attemptLevel: false, levelFail: true });
              }}
            />
          </Section>
          <Section>
            <Text category="h4">Solo Climb</Text>
            <MatchStatefulToggle dataTitle="soloClimb" name="Solo Climb" />
          </Section>
        </ScrollView>
      </View>
      <Header
        title="Post Game"
        matchInfo={matchInfoState}
        backgroundColor={interpolateHeaderBackgroundColor}
      />
    </Layout>
  );
};

type WrapperOptions = {
  choices: string[];
  title: string;
  titleStyle?: any;
  defaultChoice: number;
  onDataChange: (index: number) => void;
};
const RadioGroupWrapper = ({
  choices,
  title,
  onDataChange,
  titleStyle,
  defaultChoice,
}: WrapperOptions) => {
  const [selectedIndex, setSelectedIndex] = React.useState(defaultChoice);

  return (
    <View>
      <Text category="h4" style={titleStyle}>
        {title}
      </Text>

      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index);
          onDataChange(index);
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {choices.map((choice) => (
          <Radio key={choice}>{choice}</Radio>
        ))}
      </RadioGroup>
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
  startStopClimb: {
    flex: 1,
    alignItems: "center",
  },
  halfButton: {
    width: "50%",
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
});

export default PostGame;
