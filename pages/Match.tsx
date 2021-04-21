import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Auton from "./Auton";
import Teleop from "./Teleop";
import PostGame from "./PostGame";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Match: FC = () => {
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
      <Tab.Screen name="Auton" component={Auton} />
      <Tab.Screen name="Teleop" component={Teleop} />
      <Tab.Screen name="PostGame" component={PostGame} />
    </Tab.Navigator>
  );
};

export default Match;
