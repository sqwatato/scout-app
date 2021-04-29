import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Animated, Platform } from "react-native";
import {
  Layout,
  Button,
  Text,
  ButtonGroup,
  Radio,
  RadioGroup,
} from "@ui-kitten/components";
import { BlurView } from "expo-blur";
import { MatchProps } from "./Match";
import Header from "../components/Header";
import Counter from "../components/Counter";
import { ScrollView } from "react-native-gesture-handler";
import MatchStatefulToggle from "../components/MatchStatefulToggle";

const PostGame: FC<MatchProps> = ({ matchInfo, settings }) => {
  const [headerBackgroundColor] = useState(new Animated.Value(0));
  const interpolateHeaderBackgroundColor = headerBackgroundColor.interpolate({
    inputRange: [0, 255],
    outputRange: ["#fff0", Platform.OS === "ios" ? "#aaf2" : "#aaf9"],
  });

  const [matchInfoState, setMatchInfoState] = useState(matchInfo);
  const [hang, setHang] = useState<number>(0);
  useEffect(() => {
    setMatchInfoState(matchInfo);
  }, [matchInfo]);

  return (
    <Layout style={styles.container} level="1">
      <View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ zIndex: 0 }}>
          <View style={styles.section}>
            <ButtonGroup
              style={{ marginTop: 120, ...styles.startStopClimb }}
              appearance="outline"
            >
              <Button onPress={() => {}} style={styles.halfButton}>
                Start Climb
              </Button>
              <Button onPress={() => {}} style={styles.halfButton}>
                Change
              </Button>
            </ButtonGroup>

            <RadioGroupWrapper
              choices={["Success", "Fail", "Did not Attempt"]}
              title="Hang"
              onDataChange={(index: number) => {
                setHang(index);
              }}
            />

            <View style={{ flex: 5 }} />

            <View style={styles.section}>
              <View style={styles.buttonGroup}>
                <Button
                  style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  Button1
                </Button>
                <Button>Button2</Button>
                <Button
                  style={[
                    { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
                  ]}
                >
                  Button1
                </Button>
              </View>
            </View>
          </View>
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
  onDataChange: (index: number) => void;
};
const RadioGroupWrapper = ({
  choices,
  title,
  onDataChange,
}: WrapperOptions) => {
  const [selectedIndex, setSelectedIndex] = React.useState(2);

  return (
    <View>
      <Text category="h6">{title}</Text>

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
          <Radio>{choice}</Radio>
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
  section: {
    marginVertical: 20,
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
