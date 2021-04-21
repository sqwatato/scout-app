import React from "react";

import { enableScreens } from "react-native-screens";

import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { ApplicationProvider } from "@ui-kitten/components";
import { Home, Settings, QRScanner, Match } from "./pages";

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="QRScanner" component={QRScanner} />
          <Stack.Screen name="Match" component={Match} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
