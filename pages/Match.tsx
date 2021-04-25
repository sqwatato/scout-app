import React, { FC, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Auton, Teleop, PostGame } from "./";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { SettingContext } from '../context/SettingContext'

const Tab = createBottomTabNavigator()

type RootStackParamList = {
  data: { data: string };
};

type DataProp = RouteProp<RootStackParamList, "data">;

type MInfo = {
  regional: string;
  matchNum: number;
  alliance: string;
  teams: [number, number, number];
};

type Props = {
  route: DataProp;
};



const Match: FC<Props> = ({ route }) => {
  const [data, setData] = useState();
  const [matchInfo, setMatchInfo] = useState<MInfo>();

  const { settings, getSettingState } = React.useContext(SettingContext) as SettingContextType;

  const [haptic, setHaptic] = useState( getSettingState( "Haptic Feedback" ) );

  useEffect( () => {
    setHaptic( getSettingState("Haptic Feedback") );
  }, [getSettingState("Haptic Feedback")])

  useEffect(() => {
    const matchInfo: string = route.params.data;
    console.log( matchInfo );
    let stuff = matchInfo.split(/[:@\[\,\]]/).slice(0, -1);

    setMatchInfo({
      regional: stuff[1],
      matchNum: parseInt(stuff[0]),
      alliance: stuff[2],
      teams: [parseInt(stuff[3]), parseInt(stuff[4]), parseInt(stuff[5])],
    });
  }, []);

  
  const AutonComponent = props =>
  (
    <Auton
    matchInfo={matchInfo}
    data={data}
    onChange={(data) => setData(data)}
    settings = {{
      haptic: haptic
    }}
    />
  )

  const TeleopComponent = props =>
  (
    <Teleop
    matchInfo={matchInfo}
    data={data}
    onChange={(data) => setData(data)}
    settings = {{
      haptic: haptic
    }}
    />
  )

  const PostGameComponent = props =>
  (
    <PostGame
    matchInfo={matchInfo}
    data={data}
    onChange={(data) => setData(data)}
    settings = {{
      haptic: haptic
    }}
    />
  )

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName:
            | "car"
            | "car-outline"
            | "game-controller"
            | "game-controller-outline"
            | "alarm"
            | "alarm-outline";

          if (route.name === "Auton") {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "Teleop") {
            iconName = focused ? "game-controller" : "game-controller-outline";
          } else if (route.name === "PostGame") {
            iconName = focused ? "alarm" : "alarm-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "purple",
        inactiveTintColor: "gray",
        style:{height:90}
      }}
    >
      <Tab.Screen
        name="Auton"
        component={AutonComponent}
      />
      <Tab.Screen name="Teleop" component = {TeleopComponent}/>
      <Tab.Screen
        name="PostGame"
        component={PostGameComponent}
      />
    </Tab.Navigator>
  );
};
export default Match;
export type MatchProps = {
  matchInfo: MInfo;
  onChange: (data: any) => void;
  data: {};
  settings?
};
