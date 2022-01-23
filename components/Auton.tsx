import React, { FC, useEffect, useRef, useState } from "react";
import { useAuton, usePreGame } from '../Stores';
import Header from "./Header";
import {db} from '../firebase';
import BottomSheet from "@gorhom/bottom-sheet";
import QRCodeBottomSheet from "./QRCode";
import { ScrollView, View, Alert } from "react-native";
import { Text, Toggle } from "@ui-kitten/components";
import Counter from "./Counter";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from "react-navigation";
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
    fields?.map((value)=>{
        if(value['type']=="string") tempAuton.push("");
        else if(value['type']=="counter") tempAuton.push(0);
        else if(value['type']=="boolean") tempAuton.push(false);
        //else tempAuton.push(0);

    })
    return tempAuton;
  }
  useEffect(() =>{
      if(autonFields.length<fields.length) setAutonFields(initializeAutonFields());
      // Alert.alert(JSON.stringify(autonFields)); 
    //}
  }, [])
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
           width: '100%',
           height: '100%',
           justifyContent: 'center',
           alignItems: 'center'
           // backgroundColor: 'red'
         }}
         keyboardDismissMode="on-drag"
      >
        {/* {autonFields?.map(field => <Text>{field['name'] + " -> " + field['type']}</Text>)}  */}
        {fields?.map((field, index) => {
          if(field['type'] == 'counter') {
            return(
              <Counter name={field['name']}  onChange={(val) => {
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
              }}>{field['name']}</Toggle>
            )
          }
        })}
      </ScrollView>
      <QRCodeBottomSheet sheetRef={sheetRef} navigation={navigation} />
    </>
  );
};

export default Auton;