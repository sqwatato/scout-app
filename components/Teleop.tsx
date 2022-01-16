import React, { FC, useRef } from "react";
import Header from "./Header";
import { usePreGame, useTeleop } from "../Stores";
import BottomSheet from "@gorhom/bottom-sheet";
import QRCodeBottomSheet from "./QRCode";
import { ScrollView, View } from "react-native";
import Counter from "./Counter";
import { Text, Toggle } from "@ui-kitten/components";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from "react-navigation";

interface TeleopProps {
  navigation: any; // NavigationScreenProp<NavigationState, NavigationParams>;
}

const Teleop: FC<TeleopProps> = ({ navigation }) => {
  const teams = usePreGame((state) => state.teams);
  const alliance = usePreGame((state) => state.alliance);
  const regional = usePreGame((state) => state.regional);
  const sheetRef = useRef<BottomSheet>(null);

  const cycles = useTeleop((state) => state.cycles);
  const setCycles = useTeleop((state) => state.setCycles);

  const trench = useTeleop((state) => state.trench);
  const defense = useTeleop((state) => state.defense);
  const rotation = useTeleop((state) => state.rotation);
  const stuck = useTeleop((state) => state.stuck);
  const disabled = useTeleop((state) => state.disabled);
  const setTrench = useTeleop((state) => state.setTrench);
  const setDefense = useTeleop((state) => state.setDefense);
  const setRotation = useTeleop((state) => state.setRotation);
  const setStuck = useTeleop((state) => state.setStuck);
  const setDisabled = useTeleop((state) => state.setDisabled);

  const teleopBottom = useTeleop((state) => state.teleopBottom);
  const setTeleopBottom = useTeleop((state) => state.setTeleopBottom);
  const teleopUpper = useTeleop((state) => state.teleopUpper);
  const setTeleopUpper = useTeleop((state) => state.setTeleopUpper);
  const teleopInner = useTeleop((state) => state.teleopInner);
  const setTeleopInner = useTeleop((state) => state.setTeleopInner);

  const teleopBottomMissed = useTeleop((state) => state.teleopBottomMissed);
  const setTeleopBottomMissed = useTeleop(
    (state) => state.setTeleopBottomMissed
  );
  const teleopUpperMissed = useTeleop((state) => state.teleopUpperMissed);
  const setTeleopUpperMissed = useTeleop((state) => state.setTeleopUpperMissed);

  return (
    <>
      <Header
        matchInfo={{ teams, alliance, regional }}
        title={"Teleop"}
        toggleQRCode={() => sheetRef.current?.snapTo(1)}
      />
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          padding: "10%",
        }}
        keyboardDismissMode="on-drag"
      >
        <View>
          <Text category="h4">Teleop Made Shots</Text>
          <Counter
            name="Bottom Port"
            onChange={(val) => setTeleopBottom(val)}
            value={teleopBottom}
          />
          <Counter
            name="Upper Port"
            onChange={(val) => setTeleopUpper(val)}
            value={teleopUpper}
          />
          <Counter
            name="Inner Port"
            onChange={(val) => setTeleopInner(val)}
            value={teleopInner}
          />
        </View>
        <View style={{ marginTop: "3%" }}>
          <Text category="h4">Teleop Missed Shots</Text>
          <Counter
            name="Bottom Port"
            onChange={(val) => setTeleopBottomMissed(val)}
            value={teleopBottomMissed}
          />
          <Counter
            name="Upper Port"
            onChange={(val) => setTeleopUpperMissed(val)}
            value={teleopUpperMissed}
          />
        </View>
        <View style={{ marginTop: "5%" }}>
          <Counter
            name="Cycles"
            onChange={(val) => setCycles(val)}
            value={cycles}
          />
        </View>
        <View style={{ display: "flex", alignItems: "flex-start" }}>
          <Toggle
            checked={trench}
            onChange={setTrench}
            style={{ marginTop: "3%" }}
          >
            Trench Run
          </Toggle>
          <Toggle
            checked={defense}
            onChange={setDefense}
            style={{ marginTop: "3%" }}
          >
            Played Defense
          </Toggle>
          <Toggle
            checked={rotation}
            onChange={setRotation}
            style={{ marginTop: "3%" }}
          >
            Did Rotation
          </Toggle>
          <Toggle
            checked={stuck}
            onChange={setStuck}
            style={{ marginTop: "3%" }}
          >
            Got Stuck
          </Toggle>
          <Toggle
            checked={disabled}
            onChange={setDisabled}
            style={{ marginTop: "3%" }}
          >
            Got Disabled
          </Toggle>
        </View>
      </ScrollView>
      <QRCodeBottomSheet sheetRef={sheetRef} navigation={navigation} />
    </>
  );
};

export default Teleop;