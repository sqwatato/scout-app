import React, { FC, useEffect, useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';
import QRCodeBottomSheet from "./QRCode";
import { auth } from '../firebase';
import { Navigator } from 'react-router-dom';
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

interface HeaderProps {
  title: string;
  matchInfo: {
    teams: [string | number, string | number, string | number];
    alliance: string;
    regional: string;
  };
  toggleQRCode?: () => any;
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Header: FC<HeaderProps> = ({ title, matchInfo, toggleQRCode, navigation }) => {

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
        if(user) setLoggedIn(true);
        else setLoggedIn(false);
    });
  })

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 25,
          paddingBottom: 15,
          paddingTop: "7%",
          backgroundColor: "#e0e0e0",
        }}
      >
        <View>
          <Text category="h1">{title}</Text>
          <Text category="s1">
            Team: {matchInfo && matchInfo.teams[0]}, &nbsp;
            {matchInfo && matchInfo.alliance}@{matchInfo && matchInfo.regional}{" "}
          </Text>
        </View>
        {loggedIn ? <TouchableOpacity 
          onPress = { () => {
            auth.signOut().then(() => {
              Alert.alert("Signed out!");
              Toast.show({
                type: 'info',
                text1: 'Alert',
                text2: 'Signed out!'
              })
            }).catch((err) => {
              Alert.alert("Error signing out: " + err.message);
            });
          }}
          style={{
            marginTop: 10,
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="exit-outline" size={28} color={'#0782F9'} />
        </TouchableOpacity> : 
          <TouchableOpacity 
          onPress = { () => {
            navigation?.navigate("Login");
          }}
          style={{
            marginTop: 10,
            marginRight: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="enter-outline" size={28} color={'#0782F9'} />
          </TouchableOpacity>}
          <TouchableOpacity
              onPress = {() => navigation?.navigate("Home")}
              style = {{
                  marginTop: 10,
                  justifyContent: 'center',
              }}
          >
              {/* <Text style = {{
                  fontWeight: '900',
                  fontSize: 24,
                  color: '#0782F9'
              }}>
                  ⌂
              </Text> */}
              <Ionicons name="home-outline" size={28} color={'#0782F9'} />
          </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toggleQRCode && toggleQRCode();
          }}
          style={{
            marginTop: 10,
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text category="c1" style={{}}>
            Create
          </Text>
          <Ionicons name="qr-code-outline" size={30} color={"black"} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Header;
