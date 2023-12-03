import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationState, RouteProp } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { usePreGame, useAuton, useTeleop, usePostGame } from "../Stores";
import PreGame from "../components/Pregame";
import Auton from "../components/Auton";
import Teleop from "../components/Teleop";
import EndGame from "../components/Endgame";
import { Alert } from 'react-native';
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
        hardCode();
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

    const getData = (field: any) => {
        if (typeof field === 'object') {
            return ({
                name: Object.keys(field)[0].trim(),
                type: Object.values(field)[0]
            });
        }
        const [name, type] = field.trim().split(':');
        if (typeof type === 'string') {
            return ({
                name: name.trim(),
                type: type.trim(),
            });
        }
    }

    const hardCode = () =>{
        const autonStuff = ["Mobility: boolean", "Auton Upper Cone: counter", "Auton Upper Cone Missed: counter", "Auton Mid Cone: counter", "Auton Mid Cone Missed: counter", "Auton Lower Cone: counter", "Auton Lower Cone Missed: counter", "Auton Upper Cube: counter", "Auton Upper Cube Missed: counter", "Auton Mid Cube: counter", "Auton Mid Cube Missed: counter", "Auton Lower Cube: counter", "Auton Lower Cube Missed: counter", "Auton Did Charge: boolean", "Auton Docked: boolean", "Auton Engaged: boolean", "Auton Charge Time: timer"]
        setAutonFields(autonStuff.map((field: any) => getData(field)));
        const teleopStuff = ["Teleop Upper Cone: counter", "Teleop Upper Cone Missed: counter", "Teleop Mid Cone: counter", "Teleop Mid Cone Missed: counter", "Teleop Lower Cone: counter", "Teleop Lower Cone Missed: counter", "Teleop Upper Cube: counter", "Teleop Upper Cube Missed: counter", "Teleop Mid Cube: counter", "Teleop Mid Cube Missed: counter", "Teleop Lower Cube: counter", "Teleop Lower Cube Missed: counter", "Played Defense: boolean"]
        setTeleopFields(teleopStuff.map((field: any) => getData(field)));
        const endgameStuff = ["Parked: boolean", "Endgame Did Charge: boolean", "Endgame Docked: boolean", "Endgame Engaged: boolean", "Tipped: boolean", "Comments: text"]
        setEndGameFields(endgameStuff.map((field: any) => getData(field)));
    }
    const fetchData = async () => {
        const scoutingDocs = db.collection('years').doc(`${new Date().getFullYear()}`).collection('scouting');
        await scoutingDocs.doc('auton').get().then((autonData) => {
            setAutonFields(Object.values(autonData.data()?.autonFields || {}).map((field: any) => getData(field)));
        });
        await scoutingDocs.doc('endgame').get().then((endgameData) => {
            setEndGameFields(Object.values(endgameData.data()?.endgameFields || {}).map((field: any) => getData(field)));
        });
        await scoutingDocs.doc('teleop').get().then((teleopFields) => {
            setTeleopFields(Object.values(teleopFields.data()?.teleopFields || {}).map((field: any) => getData(field)));
        });
    }

    const AutonComponent = useCallback(() => <Auton navigation={navigation} fields={autonFields ? autonFields : []} />, [autonFields]);
    const EndGameComponent = useCallback(() => <EndGame navigation={navigation} fields={endgameFields ? endgameFields : []} />, [endgameFields]);
    const TeleopComponent = useCallback(() => <Teleop navigation={navigation} fields={teleopFields ? teleopFields : []} />, [teleopFields]);
    const PreGameComponent = useCallback(() => <PreGame navigation={navigation} />, []);

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
                    headerShown: false,
                    activeTintColor: "#598BFF",
                    inactiveTintColor: "gray",
                    style: { height: 90 }
                })}
            >
                <Tab.Screen name="PreGame" component={PreGameComponent} />
                <Tab.Screen name="Auton" component={AutonComponent}/>
                <Tab.Screen name="Teleop" component={TeleopComponent} />
                <Tab.Screen name="EndGame" component={EndGameComponent} />
            </Tab.Navigator>
        </>
    );
};

export default Match;


