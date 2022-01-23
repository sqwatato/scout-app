import React, { FC, useEffect, useRef } from "react";
import Header from "./Header";
import { usePreGame, useTeleop } from "../Stores";
import BottomSheet from "@gorhom/bottom-sheet";
import QRCodeBottomSheet from "./QRCode";
import { ScrollView, View, Alert } from "react-native";
import Counter from "./Counter";
import { Input, Text, Toggle } from "@ui-kitten/components";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from "react-navigation";
import Stopwatch from "./Stopwatch";

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
    if(teleopFields.length==0){
      setTeleopFields(initializeTeleopFields());      
    }
  }, [])
  const initializeTeleopFields = () =>{
    const tempTeleop: any[] = [];
    fields?.map((value) => {
        if(value['type']=="string") tempTeleop.push("");
        else if(value['type']=="counter") tempTeleop.push(0);
        else if(value['type']=="boolean") tempTeleop.push(false);
        else tempTeleop.push(0);

    });
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
          if(field['type'] == 'counter' || field['type']=='rating') {
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
          else if(field['type']=='timer'){
            return (
              <Stopwatch name={field['name']} onChange={setTeleopFields} fieldIndex={index} postFields={teleopFields} ></Stopwatch>
            )
          }
          else{
            return(
              <Input
                multiline={true}
                textStyle={{ minHeight: 64 }}
                placeholder={field.name+"..."}
                label={field['name']}
                value={teleopFields[index]}
                onChangeText={(val) => { 
                  const temp: any[] = [...teleopFields];
                  temp[index] = val;
                  setTeleopFields(temp);
                }}
              />
            )
          }
        })}
      </ScrollView>
      <QRCodeBottomSheet sheetRef={sheetRef} navigation={navigation} />
    </>
  );
};

export default Teleop;