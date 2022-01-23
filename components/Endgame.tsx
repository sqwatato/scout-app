import React, { FC, useEffect, useRef, useState } from "react";
import Header from "./Header";
import { usePostGame, usePreGame} from "../Stores";
import BottomSheet from "@gorhom/bottom-sheet";
import QRCodeBottomSheet from "./QRCode";
import { Alert, ScrollView, View } from "react-native";
// import { Stopwatch } from "react-native-stopwatch-timer";
import { Button, IndexPath, Input, Select, SelectItem, Text, Toggle } from "@ui-kitten/components";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from "react-navigation";
import Stopwatch from "./Stopwatch";
import Counter from "./Counter";

interface EndGameProps {
  navigation: any; //NavigationScreenProp<NavigationState, NavigationParams>;
  fields: any[];
}
const EndGame: FC<EndGameProps> = ({ navigation, fields }) => {
  const sheetRef = useRef<BottomSheet>(null);
  const teams = usePreGame((state) => state.teams);
  const alliance = usePreGame((state) => state.alliance);
  const regional = usePreGame((state) => state.regional);
  const postGameFields = usePostGame((state) => state.postGameFields);
  const setPostGameFields = usePostGame((state) => state.setPostGameFields);
  useEffect(() =>{
    if(postGameFields.length<fields.length) setPostGameFields(initializePostGameFields());
    //Alert.alert(JSON.stringify(postGameFields));
  }, [])
  const initializePostGameFields = () =>{
    setPostGameFields([]);
    const tempPostGame: any[] = [];
    fields?.map((value)=>{
        if(value['type']=="counter") tempPostGame.push(0);
        else if(value['type']=="boolean") tempPostGame.push(false);
        else if(value['type'] == 'text' || value['type'] == 'timer') tempPostGame.push("");
        else {
          tempPostGame.push(value['type']);
        }
    },)
    return tempPostGame;
  }
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
        }}
        keyboardDismissMode="on-drag"
      >
      {fields?.map((field, index) => {
          if(field['type'] == 'counter') {
            return(
              <Counter
              name={field['name']}
              onChange={(val) => {
                const temp: any[] = [...postGameFields];
                temp[index] = val;
                setPostGameFields(temp);
              }}
              value={postGameFields[index]}/>
            )
          }
          else if(field['type']=='boolean'){
            return(
              <Toggle checked = {postGameFields[index]} onChange={(val) => {
                const temp: any[] = [...postGameFields];
                temp[index] = val;
                setPostGameFields(temp);
              }} style = {{marginTop: "3%"}}>{field['name']}</Toggle>
            )
          }
          else if(field['type']=='text') {
            return(
              <Input
                multiline={true}
                textStyle={{ minHeight: 64 }}
                placeholder={field.name+"..."}
                label={field['name']}
                value={postGameFields[index]}
                onChangeText={(val) => { 
                  const temp: any[] = [...postGameFields];
                  temp[index] = val;
                  setPostGameFields(temp);
                }}
              />
            )
          }
          else if(field['type']=='timer'){
            return (
              <Stopwatch onChange={setPostGameFields} fieldIndex={index} postFields={postGameFields} ></Stopwatch>
            )
          }
          
      })}
        
      </ScrollView>
      <QRCodeBottomSheet sheetRef={sheetRef} navigation={navigation} />
    </>
  );
};

export default EndGame;
/*else {
            return (
              <Select
                selectedIndex={alliance === "b" ? new IndexPath(0) : new IndexPath(1)}
                onSelect={(index) =>
                  //Handle logic later
                }
                label="Alliance"
                style={{ marginBottom: "3%" }}
                value={alliance === "b" ? "Blue" : "Red"}
              >
                {
                  () => { 
                    return(
                      <SelectItem title = "Red" />
                  )}}
              </Select>
            )
          }*/