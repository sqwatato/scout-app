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
}

const Auton: FC<AutonProps> = ({ navigation }) => {
  /*const teams = usePreGame((state) => state.teams);
  const alliance = usePreGame((state) => state.alliance);
  const regional = usePreGame((state) => state.regional);*/
  const [autonFields, setAutonFields] = useState<any[]>();
  useEffect(() => {
    const fetchData = async () => {
      const fields = await db.collection('years').doc('2022').collection('scouting').doc('auton').get();
      // setAutonFields(fields.data());
      setAutonFields(Object.keys(fields.data() || {}).map(field => ({name: field, type: (fields.data() || {})[field]})))
      // Alert.alert(JSON.stringify(fields.data()));
    }
    fetchData();
  }, [])

  const renderFields = () => {
    Alert.alert("Called");
    for(let key in autonFields) {
      if(autonFields.hasOwnProperty(key)) {
        return (
          <View>
            {key + " -> " + autonFields[key]}
          </View>
        )
      }
    }
  }

  const sheetRef = useRef<BottomSheet>(null);
  return (
    <>
      <View
        // contentContainerStyle={{
        //   display: "flex",
        //   flexDirection: "column",
        //   padding: "10%",
        //   // backgroundColor: 'red'
        // }}
        // keyboardDismissMode="on-drag"
        style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <Text>{autonFields?.length}</Text>
        {/* {autonFields?.map(field => <Text>{field['name'] + " -> " + field['type']}</Text>)}  */}
        {autonFields?.map((field) => {
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
      </View>
      <QRCodeBottomSheet sheetRef={sheetRef} navigation={navigation} />
    </>
  );
};

export default Auton;
/*

          if(field['type']==="counter"){
            <Counter
            name={field['name']}
            onChange={() => Alert.alert("Change")}
            value={0}/>
          }
          if(field['type'] == 'boolean') {
            <Toggle checked = {false} onChange={() => Alert.alert("Stuff")} style = {{marginTop: "3%"}}/>
          }
        })*/