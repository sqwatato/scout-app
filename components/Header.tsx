import React, { FC } from "react";
import { StyleSheet, Animated } from "react-native";
import { Text } from "@ui-kitten/components";
import { BlurView } from "expo-blur";
import { Dimensions } from "react-native";

interface Props {
  title: string;
  matchInfo: any;
  backgroundColor?: any;
}

const Header: FC<Props> = ({ title, matchInfo, backgroundColor }) => {
  return (
    <BlurView intensity={100} tint="light" style={styles.header}>
      <Animated.View
        style={[
          {
            backgroundColor: backgroundColor ? backgroundColor : "transparent",
            justifyContent: "flex-end",
            paddingHorizontal: 25,
            paddingBottom: 15,
          },
          StyleSheet.absoluteFillObject,
        ]}
      >
        <Text category="h1">{title}</Text>
        <Text category="s1">
          Team: {matchInfo && matchInfo.teams[0]}, &nbsp;
          {matchInfo && matchInfo.alliance}@{matchInfo && matchInfo.regional}{" "}
        </Text>
      </Animated.View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    zIndex: 10,
    width: Dimensions.get("window").width,
    height: 130,
  },
});

export default Header;
