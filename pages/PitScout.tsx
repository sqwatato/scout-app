import React, { FC } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import PitScoutForm from '../components/PitScoutForm';
import PitScoutCamera from '../components/PitScoutCamera';

const Stack = createNativeStackNavigator();

const PitScout: FC<any> = ({ navigation }) => {
    return (
        <>
            <TouchableOpacity
                onPress={() => navigation?.goBack()}
                style={{
                    marginTop: 25,
                    marginLeft: 20,
                }}
            >
                <Text
                    style={{
                        fontWeight: "700",
                        fontSize: 24,
                    }}
                >
                    ←
                </Text>
            </TouchableOpacity>
            <Stack.Navigator initialRouteName='PitScoutForm'>
                <Stack.Screen
                    component={PitScoutForm}
                    name='PitScoutForm'
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    component={PitScoutCamera}
                    name='PitScoutCamera'
                />
            </Stack.Navigator>
        </>
    );
}

export default PitScout;