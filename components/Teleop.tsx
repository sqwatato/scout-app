import React, { FC, useRef } from "react";
import Header from "./Header";
import { usePreGame, useTeleop } from "../Stores";
import BottomSheet from "@gorhom/bottom-sheet";
import QRCodeBottomSheet from "./QRCode";
import { ScrollView, View, Alert } from "react-native";
import Counter from "./Counter";
import { Text, Toggle } from "@ui-kitten/components";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from "react-navigation";

interface TeleopProps {
  navigation: any; // NavigationScreenProp<NavigationState, NavigationParams>;
  fields: any[];
}

const Teleop: FC<TeleopProps> = ({ navigation, fields }) => {
  const teams = usePreGame((state) => state.teams);
  const alliance = usePreGame((state) => state.alliance);
  const regional = usePreGame((state) => state.regional);
  const sheetRef = useRef<BottomSheet>(null);

  /*const cycles = useTeleop((state) => state.cycles);
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
  const setTeleopUpperMissed = useTeleop((state) => state.setTeleopUpperMissed);*/

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
        {fields?.map((field) => {
          if(field['type'] == 'counter') {
            return(
              <Counter
              name={field['name']}
              onChange={() => Alert.alert("Change")}
              value={0}/>
            )
          }
          else if(field['type']=='boolean'){
            return(
              <Toggle checked = {false} onChange={() => Alert.alert("Stuff")} style = {{marginTop: "3%"}}>{field['name']}</Toggle>
            )
          }
        })}
      </ScrollView>
      <QRCodeBottomSheet sheetRef={sheetRef} navigation={navigation} />
    </>
  );
};

export default Teleop;