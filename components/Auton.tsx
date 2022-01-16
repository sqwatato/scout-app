import React, { FC, useEffect, useRef, useState } from "react";
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
  /*const teams = usePreGame((state) => state.teams);
  const alliance = usePreGame((state) => state.alliance);
  const regional = usePreGame((state) => state.regional);*/
  //const [autonFields, setAutonFields] = useState<any[]>();
  const fetchData = () =>{
    db.collection('years').doc('2022').collection('scouting').doc('auton').get()
    .then((fields)=>{
      //setAutonFields(Object.keys(fields.data() || {}).map(field => ({name: field, type: (fields.data() || {})[field]})).sort((a,b)=> a['name'].localeCompare(b['name'])));
    })
  }
  /*useEffect(() => {
    //fetchData();
  }, [])*/

  const sheetRef = useRef<BottomSheet>(null);
  return (
    <>
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

export default Auton;