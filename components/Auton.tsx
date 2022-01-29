import React, { FC, useEffect, useRef, useState } from "react";
import { useAuton, usePreGame } from '../Stores';
import Header from "./Header";
import {db} from '../firebase';
import BottomSheet from "@gorhom/bottom-sheet";
import QRCodeBottomSheet from "./QRCode";
import { ScrollView, View, Alert } from "react-native";
import { Input, Text, Toggle } from "@ui-kitten/components";
import Counter from "./Counter";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from "react-navigation";
import Stopwatch from "./Stopwatch";
interface AutonProps {
  navigation: any; // NavigationScreenProp<NavigationState, NavigationParams>;
  fields: any[];
}

const Auton: FC<AutonProps> = ({ navigation, fields }) => {
  const teams = usePreGame((state) => state.teams);
  const alliance = usePreGame((state) => state.alliance);
  const regional = usePreGame((state) => state.regional);
  const autonFields = useAuton((state) => state.autonFields);
  const setAutonFields = useAuton((state) => state.setAutonFields);
  const initializeAutonFields = () =>{
    const tempAuton: any[] = [];
    fields?.map((value) => {
        if(value['type']=="string") tempAuton.push("");
        else if(value['type']=="counter") tempAuton.push(0);
        else if(value['type']=="boolean") tempAuton.push(false);
        //else tempAuton.push(0);

    })
    return tempAuton;
  }
  useEffect(() =>{
      if(autonFields.length < fields.length) setAutonFields(initializeAutonFields());
      // Alert.alert(JSON.stringify(autonFields)); 
    //}
  }, [])
  const sheetRef = useRef<BottomSheet>(null);
  // Alert.alert(navigation);
  return (
    <>
      <Header
        matchInfo={{ teams, alliance, regional }}
        title={"Auton"}
        toggleQRCode={() => sheetRef.current?.snapTo(1)}
        navigation = {navigation}
      />
      <ScrollView
         contentContainerStyle={{
           display: "flex",
           flexDirection: "column",
           padding: "10%",
           width: '100%',
           height: '100%',
           justifyContent: 'center',
           alignItems: 'center'
           // backgroundColor: 'red'
         }}
         keyboardDismissMode="on-drag"
      >
        {fields?.map((field, index) => {
          if(field['type'] == 'counter' || field['type']=='rating') {
            return(
              <Counter 
                rating={field['type']=="rating"}
                name={field['name']}  onChange={(val) => {
                const temp: any[] = [...autonFields];
                temp[index] = val;
                setAutonFields(temp);
              }} value={autonFields[index]} />
            )
          }
          else if(field['type']=='boolean'){
            return(
              <Toggle checked = {autonFields[index]} onChange={(val) => {
                const temp: any[] = [...autonFields];
                temp[index] = val;
                setAutonFields(temp);
              }}
              style = {{
                padding: 4
              }}
              >
                {field['name']}
              </Toggle>
            )
          }
          else if(field['type']=='timer'){
            return (
              <Stopwatch name={field['name']} onChange={setAutonFields} fieldIndex={index} postFields={autonFields} ></Stopwatch>
            )
          }
          else{
            return(
              <Input
                multiline={true}
                textStyle={{ minHeight: 64 }}
                placeholder={field.name+"..."}
                label={field['name']}
                value={autonFields[index]}
                onChangeText={(val) => { 
                  const temp: any[] = [...autonFields];
                  temp[index] = val;
                  setAutonFields(temp);
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

export default Auton;