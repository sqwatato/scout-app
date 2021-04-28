import React, { FC, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Auton from "./Auton";
import Teleop from "./Teleop";
import PostGame from "./PostGame";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { SettingContext } from "../context/SettingContext";
import Counter from "../components/Counter";

const Tab = createBottomTabNavigator();

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
  const [data, setData] = useState<MatchData>();
  const [matchInfo, setMatchInfo] = useState<MInfo>();

  const { settings, getSettingState } = React.useContext(
    SettingContext
  ) as SettingContextType;

  const [haptic, setHaptic] = useState(getSettingState("Haptic Feedback"));

  useEffect(() => {
    setHaptic(getSettingState("Haptic Feedback"));
  }, [getSettingState("Haptic Feedback")]);

  useEffect(() => {
    const matchInfo: string = route.params.data;

    const matchStrs: string[] = matchInfo.split(/[:@\[\,\]]/).slice(0, -1);

    const regional: string = matchStrs[1];
    const matchNum: number = parseInt(matchStrs[0]);
    const alliance: string = matchStrs[2];
    const teams: [number, number, number] = [
      parseInt(matchStrs[3]),
      parseInt(matchStrs[4]),
      parseInt(matchStrs[5]),
    ];

    setMatchInfo({
      regional,
      matchNum,
      alliance,
      teams,
    });

    setData({
      ...data,
      regional,
      matchNum,
      alliance,
    });
  }, []);

  const AutonComponent = () => (
    <Auton
      matchInfo={matchInfo}
      data={data}
      onChange={(data) => setData(data)}
      settings={{
        haptic: haptic,
      }}
    />
  );

  const TeleopComponent = () => (
    <Teleop
      matchInfo={matchInfo}
      data={data}
      onChange={(data) => setData(data)}
      settings={{
        haptic: haptic,
      }}
    />
  );

  const PostGameComponent = () => (
    <PostGame
      matchInfo={matchInfo}
      data={data}
      onChange={(data) => setData(data)}
      settings={{
        haptic: haptic,
      }}
    />
  );

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
        style: { height: 90 },
      }}
    >
      <Tab.Screen name="Auton" component={AutonComponent} />
      <Tab.Screen name="Teleop" component={TeleopComponent} />
      <Tab.Screen name="PostGame" component={PostGameComponent} />
    </Tab.Navigator>
  );
};
type RootStackParamList = {
  data: { data: string };
};

type DataProp = RouteProp<RootStackParamList, "data">;

export default Match;

export type MatchData = {
  alliance: string;
  attemptHang: boolean;
  autonInner: number;
  autonUpper: number;
  autonBottom: number;
  autonInnerMissed: number;
  autonUpperMissed: number;
  autonBottomMissed: number;
  comments: string;
  defense: boolean;
  disabled: boolean;
  hangFail: boolean;
  matchNum: number;
  minfo: string;
  regional: string;
  teamNum: number;
  teleopInner: number;
  teleopUpper: number;
  teleopBottom: number;
};

export type MatchProps = {
  matchInfo: MInfo;
  onChange: (data: MatchData) => void;
  data: MatchData;
  settings?;
};
