import React, { FC } from "react";
import { StyleSheet, Animated, Button, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { BlurView } from "expo-blur";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";

interface Props {
  title: string;
  matchInfo: any;
  backgroundColor?: any;
  toggleQRCode?: () => any;
  haptic: boolean
}

const Header: FC<Props> = ({
  title,
  matchInfo,
  backgroundColor,
  toggleQRCode,
  haptic
}) => {
  return (
    <BlurView intensity={100} tint="light" style={styles.header}>
      <Animated.View
        style={[
          {
            backgroundColor: backgroundColor ? backgroundColor : "transparent",
            justifyContent: "flex-end",
            paddingHorizontal: 25,
            paddingBottom: 15,
            position: "relative",
          },
          StyleSheet.absoluteFillObject,
        ]}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text category="h1">{title}</Text>
            <Text category="s1">
              Team: {matchInfo && matchInfo.teams[0]}, &nbsp;
              {matchInfo && matchInfo.alliance}@
              {matchInfo && matchInfo.regional}{" "}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              toggleQRCode();
              ( haptic &&
              Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Heavy ) )
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
