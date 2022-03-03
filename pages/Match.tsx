import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationState, RouteProp } from "@react-navigation/native";
import React, { FC, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { usePreGame, useAuton, useTeleop, usePostGame } from "../Stores";
import PreGame from "../components/Pregame";
import Auton from "../components/Auton";
import Teleop from "../components/Teleop";
import EndGame from "../components/Endgame";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebase";

const Tab = createBottomTabNavigator();

type RootStackParamList = {
  data: { data: string };
};

type DataProp = RouteProp<RootStackParamList, "data">;

interface MatchProps {
  route: DataProp;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Match: FC<MatchProps> = ({ route, navigation }) => {
  const setMinfo = usePreGame((state) => state.set);
  const [autonFields, setAutonFields] = useState<any[]>();
  const [endgameFields, setEndGameFields] = useState<any[]>();
  const [teleopFields, setTeleopFields] = useState<any[]>();
  const setAutonValues = useAuton(state => state.setAutonFields);
  const setTeleopValues = useTeleop(state => state.setTeleopFields);
  const setPostGameValues = usePostGame(state => state.setPostGameFields);

  const clearData = () => {
    AsyncStorage.setItem("@scout_pregame", "");
    AsyncStorage.setItem("@scout_auton", "");
    AsyncStorage.setItem("@scout_teleop", "");
    AsyncStorage.setItem("@scout_postgame", "");
    setAutonValues([]);
    setTeleopValues([]);
    setPostGameValues([]);
  }

  useEffect(() => {
    fetchData();
    if (route?.params?.data) {
      clearData();
      const matchInfo: string = route.params.data;
      // regex expression to make 1@mv:r[115, 254, 118] into [1, mv, 115, 254, 118]
      const [matchNum, regional, alliance, team1, team2, team3] = matchInfo
        .split(/[:@\[\,\]]/)
        .slice(0, -1);

      const teams: [string, string, string] = [team1, team2, team3];

      setMinfo({
        matchNum,
        regional,
        alliance,
        minfo: matchInfo,
        teamNum: team1,
        teams,
      });
    }
    //("Match use effect");
  }, []);
  const fetchData = () => {
    db.collection('years').doc('2022').collection('scouting').get()
      .then((fields) => {
        setAutonFields(Object.keys(fields.docs[0].data() || {}).map(field => ({ name: field, type: (fields.docs[0].data() || {})[field] })).sort((a, b) => a['name'].localeCompare(b['name'])));
        setEndGameFields(Object.keys(fields.docs[1].data() || {}).map(field => ({ name: field, type: (fields.docs[1].data() || {})[field] })).sort((a, b) => a['name'].localeCompare(b['name'])));
        setTeleopFields(Object.keys(fields.docs[2].data() || {}).map(field => ({ name: field, type: (fields.docs[2].data() || {})[field] })).sort((a, b) => a['name'].localeCompare(b['name'])));
      }, (err) => { return [] });
  }

  const AutonComponent = () => <Auton navigation={navigation} fields={autonFields ? autonFields : [{}]} />;
  const EndGameComponent = () => <EndGame navigation={navigation} fields={endgameFields ? endgameFields : [{}]} />;
  const TeleopComponent = () => <Teleop navigation={navigation} fields={teleopFields ? teleopFields : [{}]} />;
  const PreGameComponent = () => <PreGame navigation={navigation} />;

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName:
              | "car"
              | "car-outline"
              | "game-controller"
              | "game-controller-outline"
              | "alarm"
              | "alarm-outline"
              | "checkmark-done"
              | "checkmark-done-outline";

            if (route.name === "PreGame")
              iconName = focused ? "checkmark-done" : "checkmark-done-outline";
            else if (route.name === "Auton") {
              iconName = focused ? "car" : "car-outline";
            } else if (route.name === "Teleop") {
              iconName = focused
                ? "game-controller"
                : "game-controller-outline";
            } else {
              iconName = focused ? "alarm" : "alarm-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#598BFF",
          inactiveTintColor: "gray",
          style: { height: 90 },
        }}
      >
        <Tab.Screen name="PreGame" component={PreGameComponent} />
        <Tab.Screen name="Auton" component={AutonComponent} />
        <Tab.Screen name="Teleop" component={TeleopComponent} />
        <Tab.Screen name="EndGame" component={EndGameComponent} />
      </Tab.Navigator>
    </>
  );
};

export default Match;


