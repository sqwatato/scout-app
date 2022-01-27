import React, { FC, useEffect, useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
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
          <Text style = {{
            fontWeight: '800',
            fontSize: 16,
            color: '#0782F9'
          }}>
            Logout
          </Text>
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
          <Text style = {{
            fontWeight: '700',
            fontSize: 16,
            color: '#0782F9'
          }}>
            Login
          </Text>
          </TouchableOpacity>}
          <TouchableOpacity
              onPress = {() => navigation?.navigate("Home")}
              style = {{
                  marginTop: 10,
                  justifyContent: 'center',
              }}
          >
              <Text style = {{
                  fontWeight: '700',
                  fontSize: 16,
                  color: '#0782F9'
              }}>
                  Home
              </Text>
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
