import React, { FC, useEffect, useRef, useState } from "react";
import Header from "./Header";
import { usePostGame, usePreGame} from "../Stores";
import BottomSheet from "@gorhom/bottom-sheet";
import QRCodeBottomSheet from "./QRCode";
import { Alert, ScrollView, View } from "react-native";
// import { Stopwatch } from "react-native-stopwatch-timer";
import { Button, Input, Text, Toggle } from "@ui-kitten/components";
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
  }, [])
  const initializePostGameFields = () =>{
    const tempPostGame: any[] = [];
    fields?.map((value)=>{
        if(value['type']=="string") tempPostGame.push("");
        if(value['type']=="counter") tempPostGame.push(0);
        if(value['type']=="boolean") tempPostGame.push(false);
    })
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
      })}
        
      </ScrollView>
      <QRCodeBottomSheet sheetRef={sheetRef} navigation={navigation} />
    </>
  );
};

export default EndGame;
/*<Header
        matchInfo={{ teams, alliance, regional }}
        title={"EndGame"}
        toggleQRCode={() => sheetRef.current?.snapTo(1)}
      />*/
/*
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
        */