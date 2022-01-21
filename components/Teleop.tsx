import React, { FC, useEffect, useRef } from "react";
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
  const teleopFields = useTeleop((state) => state.teleopFields);
  const setTeleopFields = useTeleop((state) => state.setTeleopFields);
  useEffect(() =>{
    if(teleopFields.length<fields.length) setTeleopFields(initializeTeleopFields());
  }, [])
  const initializeTeleopFields = () =>{
    const tempTeleop: any[] = [];
    fields?.map((value)=>{
        if(value['type']=="string") tempTeleop.push("");
        if(value['type']=="counter") tempTeleop.push(0);
        if(value['type']=="boolean") tempTeleop.push(false);
    })
    return tempTeleop;
  }

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
        {fields?.map((field, index) => {
          if(field['type'] == 'counter') {
            return(
              <Counter
              name={field['name']} onChange={(val) => {
                const temp: any[] = [...teleopFields];
                temp[index] = val;
                setTeleopFields(temp);
              }} value={teleopFields[index]}/>
            )
          }
          else if(field['type']=='boolean'){
            return(
              <Toggle checked = {teleopFields[index]} onChange={(val) => {
                const temp: any[] = [...teleopFields];
                temp[index] = val;
                setTeleopFields(temp);
              }} style = {{marginTop: "3%"}}>{field['name']}</Toggle>
            )
          }
        })}
      </ScrollView>
      <QRCodeBottomSheet sheetRef={sheetRef} navigation={navigation} />
    </>
  );
};

export default Teleop;