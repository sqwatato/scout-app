import { enableScreens } from "react-native-screens";
import React from "react";
import { StyleSheet, View } from "react-native";
import Home from "./pages/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import QRScanner from "./pages/QRScanner";
import Match from "./pages/Match";

console.warn = () => {};
console.log = () => {};
console.error = () => {};

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="QRScanner"
            component={QRScanner}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Match"
            component={Match}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
