import React, { FC, useRef } from "react";
import Header from "./Header";
import { useAuton, usePreGame } from "../Stores";
import BottomSheet from "@gorhom/bottom-sheet";
import QRCodeBottomSheet from "./QRCode";
import { ScrollView, View } from "react-native";
import { Text, Toggle } from "@ui-kitten/components";
import Counter from "./Counter";

interface AutonProps {}
const Auton: FC<AutonProps> = ({}) => {
  const teams = usePreGame((state) => state.teams);
  const alliance = usePreGame((state) => state.alliance);
  const regional = usePreGame((state) => state.regional);

  const preloads = useAuton((state) => state.preloads);
  const setPreloads = useAuton((state) => state.setPreloads);

  const initLineCrosses = useAuton((state) => state.initLineCrosses);
  const setInitLineCrosses = useAuton((state) => state.setInitLineCrosses);

  const autonBottom = useAuton((state) => state.autonBottom);
  const setAutonBottom = useAuton((state) => state.setAutonBottom);
  const autonUpper = useAuton((state) => state.autonUpper);
  const setAutonUpper = useAuton((state) => state.setAutonUpper);
  const autonInner = useAuton((state) => state.autonInner);
  const setAutonInner = useAuton((state) => state.setAutonInner);

  const autonBottomMissed = useAuton((state) => state.autonBottomMissed);
  const setAutonBottomMissed = useAuton((state) => state.setAutonBottomMissed);
  const autonUpperMissed = useAuton((state) => state.autonUpperMissed);
  const setAutonUpperMissed = useAuton((state) => state.setAutonUpperMissed);

  const sheetRef = useRef<BottomSheet>(null);
  return (
    <>
      <Header
        matchInfo={{ teams, alliance, regional }}
        title={"Auton"}
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
          <Text category="h4">Auton Made Shots</Text>
          <Counter
            name="Bottom Port"
            onChange={(val) => setAutonBottom(val)}
            value={autonBottom}
          />
          <Counter
            name="Upper Port"
            onChange={(val) => setAutonUpper(val)}
            value={autonUpper}
          />
          <Counter
            name="Inner Port"
            onChange={(val) => setAutonInner(val)}
            value={autonInner}
          />
        </View>
        <View style={{ marginTop: "3%" }}>
          <Text category="h4">Auton Missed Shots</Text>
          <Counter
            name="Bottom Port"
            onChange={(val) => setAutonBottomMissed(val)}
            value={autonBottomMissed}
          />
          <Counter
            name="Upper Port"
            onChange={(val) => setAutonUpperMissed(val)}
            value={autonUpperMissed}
          />
        </View>
        <Toggle
          checked={initLineCrosses}
          onChange={setInitLineCrosses}
          style={{ marginTop: "3%" }}
        >
          Crossed Init Line
        </Toggle>
        <Counter
          name="Preloads"
          onChange={(val) => setPreloads(val)}
          value={preloads}
        />
      </ScrollView>
      <QRCodeBottomSheet sheetRef={sheetRef} />
    </>
  );
};

export default Auton;
