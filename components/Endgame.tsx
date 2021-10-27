import React, { FC, useRef, useState } from "react";
import Header from "./Header";
import { usePostGame, usePreGame } from "../Stores";
import BottomSheet from "@gorhom/bottom-sheet";
import QRCodeBottomSheet from "./QRCode";
import { ScrollView, View } from "react-native";
// import { Stopwatch } from "react-native-stopwatch-timer";
import { Button, Input, Text, Toggle } from "@ui-kitten/components";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from "react-navigation";
import Stopwatch from "./Stopwatch";

interface EndGameProps {
  navigation: any; //NavigationScreenProp<NavigationState, NavigationParams>;
}
const EndGame: FC<EndGameProps> = ({ navigation }) => {
  const teams = usePreGame((state) => state.teams);
  const alliance = usePreGame((state) => state.alliance);
  const regional = usePreGame((state) => state.regional);
  const sheetRef = useRef<BottomSheet>(null);

  const [stopwatchRunning, setStopwatchRunning] = useState<boolean>(false);
  const [stopwatchReset, setStopwatchReset] = useState<boolean>(false);

  const setClimbTime = usePostGame((state) => state.setClimbTime);

  const attemptHang = usePostGame((state) => state.attemptHang);
  const attemptLevel = usePostGame((state) => state.attemptLevel);
  const hangFail = usePostGame((state) => state.hangFail);
  const levelFail = usePostGame((state) => state.levelFail);
  const buddy = usePostGame((state) => state.buddy);
  const comments = usePostGame((state) => state.comments);

  const setAttemptHang = usePostGame((state) => state.setAttemptHang);
  const setAttemptLevel = usePostGame((state) => state.setAttemptLevel);
  const setHangFail = usePostGame((state) => state.setHangFail);
  const setLevelFail = usePostGame((state) => state.setLevelFail);
  const setBuddy = usePostGame((state) => state.setBuddy);
  const setComments = usePostGame((state) => state.setComments);

  let time = 0;
  return (
    <>
      <Header
        matchInfo={{ teams, alliance, regional }}
        title={"EndGame"}
        toggleQRCode={() => sheetRef.current?.snapTo(1)}
      />
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          padding: "10%",
          height: "100%",
        }}
        keyboardDismissMode="on-drag"
      >
        <Input
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder="Comments"
          label="Comments"
          value={comments}
          onChangeText={setComments}
        />
        <View style={{ marginTop: "5%" }}>
          <Text category="h4">Climb Time</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Stopwatch onChange={setClimbTime} />
            {/* <Stopwatch
              msecs
              start={stopwatchRunning}
              reset={stopwatchReset}
              options={{
                container: {
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50%",
                },
                text: { fontSize: 25 },
              }}
              getTime={(val: string) =>
                (time = parseInt(val.replaceAll(":", "")))
              }
            />
            <Button
              onPress={() => {
                if (stopwatchRunning) setClimbTime(time);
                setStopwatchRunning(!stopwatchRunning);
                setStopwatchReset(false);
              }}
            >
              {stopwatchRunning ? "Stop" : "Start"}
            </Button>
            <Button
              onPress={() => setStopwatchReset(true)}
              disabled={stopwatchRunning}
            >
              Reset
            </Button> */}
          </View>
        </View>
        <View
          style={{ display: "flex", alignItems: "flex-start", marginTop: "5%" }}
        >
          <Toggle
            checked={attemptHang}
            onChange={(newVal) => {
              setAttemptHang(newVal);
              if (!newVal) setHangFail(true);
            }}
            style={{ marginTop: "2%" }}
          >
            Attempt Hang
          </Toggle>
          <Toggle
            checked={hangFail}
            onChange={setHangFail}
            disabled={!attemptHang}
            style={{ marginTop: "2%" }}
          >
            Hang Fail
          </Toggle>
          <Toggle
            checked={attemptLevel}
            onChange={(newVal) => {
              setAttemptLevel(newVal);
              if (!newVal) {
                setLevelFail(true);
                setBuddy(false);
              }
            }}
            style={{ marginTop: "2%" }}
          >
            Attempt Level
          </Toggle>
          <Toggle
            checked={levelFail}
            onChange={setLevelFail}
            disabled={!attemptLevel}
            style={{ marginTop: "2%" }}
          >
            Level Fail
          </Toggle>
          <Toggle
            checked={buddy}
            onChange={setBuddy}
            disabled={!attemptLevel}
            style={{ marginTop: "2%" }}
          >
            Buddy Climb
          </Toggle>
        </View>

        <View style={{ marginTop: "50%" }}></View>
      </ScrollView>
      <QRCodeBottomSheet sheetRef={sheetRef} navigation={navigation} />
    </>
  );
};

export default EndGame;
