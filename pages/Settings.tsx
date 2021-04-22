import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text as ReactText  } from 'react-native';
import { Button, ButtonGroup, Divider, Layout, Text, Toggle } from "@ui-kitten/components";

import { SettingContext } from "../context/SettingContext";

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { disableExpoCliLogging } from 'expo/build/logs/Logs';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}


interface SettingProps {
  setting: Setting
  updateSettings: ( id: number, isChecked: boolean) => void
}

const SettingComponent: React.FC<SettingProps> = ( {setting, updateSettings} ) =>
{
  return(
    <View style = { styles.setting }>
      <ReactText style = {{fontSize: 20, fontWeight: "300" }}>
        { setting.name }
      </ReactText>
      <Toggle 
        checked = {setting.state} 
        onChange = {( isChecked ) => updateSettings( setting.id, isChecked ) }
        style = {{
        }}
      />
    </View>
  )
}

const Settings: React.FC<Props> = ({ navigation }) => {

  const { settings, updateSettings } = React.useContext(SettingContext) as SettingContextType

  

  return (
    <Layout style={styles.container}>
      <StatusBar style="auto" />

      {settings.map( ( setting: Setting ) => (
        <SettingComponent key = {setting.id} setting = {setting} updateSettings = { updateSettings }/>
      ))}
      
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  setting:
  {
    paddingHorizontal: 30,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  }
});

export default Settings;
