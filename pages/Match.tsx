import React, { FC, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Auton, Teleop, PostGame } from "./";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

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

  useEffect(() => {
    const matchInfo: string = route.params.data;
    // const matchInfo: string = "3@CASF:b[2,7,1]";

    let stuff = matchInfo.split(/[:@\[\,\]]/).slice(0, -1);

    setMatchInfo({
      regional: stuff[1],
      matchNum: parseInt(stuff[0]),
      alliance: stuff[2],
      teams: [parseInt(stuff[3]), parseInt(stuff[4]), parseInt(stuff[5])],
    });
  }, []);

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
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Auton"
        component={() => (
          <Auton
            matchInfo={matchInfo}
            data={data}
            onChange={(data) => setData(data)}
          />
        )}
      />
      <Tab.Screen
        name="Teleop"
        component={() => (
          <Teleop
            matchInfo={matchInfo}
            data={data}
            onChange={(data) => setData(data)}
          />
        )}
      />
      <Tab.Screen
        name="PostGame"
        component={() => (
          <PostGame
            matchInfo={matchInfo}
            data={data}
            onChange={(data) => setData(data)}
          />
        )}
      />
    </Tab.Navigator>
  );
};
export default Match;
export type MatchProps = {
  matchInfo: MInfo;
  onChange: (data: any) => void;
  data: {};
};
