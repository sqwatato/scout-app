import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import React, { FC, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { usePreGame } from "../Stores";
import PreGame from "../components/Pregame";
import Auton from "../components/Auton";
import Teleop from "../components/Teleop";
import EndGame from "../components/Endgame";

const Tab = createBottomTabNavigator();

type RootStackParamList = {
  data: { data: string };
};

type DataProp = RouteProp<RootStackParamList, "data">;

interface MatchProps {
  route: DataProp;
}

const Match: FC<MatchProps> = ({ route }) => {
  const setMinfo = usePreGame((state) => state.set);

  useEffect(() => {
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
  }, []);

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
        <Tab.Screen name="PreGame" component={PreGame} />
        <Tab.Screen name="Auton" component={Auton} />
        <Tab.Screen name="Teleop" component={Teleop} />
        <Tab.Screen name="EndGame" component={EndGame} />
      </Tab.Navigator>
    </>
  );
};

export default Match;
