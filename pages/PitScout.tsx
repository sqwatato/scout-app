import React, { FC } from 'react';
import { Text, View, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import PitScoutForm from '../components/PitScoutForm';
import PitScoutCamera from '../components/PitScoutCamera';

const Stack = createNativeStackNavigator();

const PitScout: FC<any> = () => {
    return (
        <Stack.Navigator initialRouteName='PitScoutForm'>
            <Stack.Screen
                component={PitScoutForm}
                name='PitScoutForm'
            />
            <Stack.Screen
                component={PitScoutCamera}
                name='PitScoutCamera'
            />
        </Stack.Navigator>
    );
}

export default PitScout;