import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import QRCodeBottomSheet from "./QRCode";

interface HeaderProps {
  title: string;
  matchInfo: {
    teams: [string | number, string | number, string | number];
    alliance: string;
    regional: string;
  };
  toggleQRCode?: () => any;
}

const Header: FC<HeaderProps> = ({ title, matchInfo, toggleQRCode }) => {
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
