import { Button, Layout, Text } from "@ui-kitten/components";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import * as Haptics from "expo-haptics";

interface Props {
  name: string | undefined;
  onChange: (newVal: number) => void | undefined;
  value: number;
  haptic: boolean;
}

const Counter: FC<Props> = ({ name, onChange, value, haptic }) => {
  return (
    <Layout style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={[styles.neg, styles.button]}
          onPressIn={() => {
            onChange(value - 1);
            haptic &&
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
              );
          }}
          appearance="outline"
        >
          -
        </Button>
        <View
          style={{
            height: "100%",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            paddingVertical: 6,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#dde",
          }}
        >
          <Text
            category="s1"
            style={{
              fontSize: 15,
            }}
          >{`${name}: `}</Text>
          <Text
            category="h6"
            style={{
              borderColor: "#dde",
              borderWidth: 1,
              padding: 6,
              paddingHorizontal: 10,
              borderRadius: 3,
              // fontSize: 30
            }}
          >
            {value}
          </Text>
        </View>
        <Button
          style={[styles.button, styles.pos]}
          onPressIn={() => {
            onChange(value + 1);
            haptic &&
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
          }}
          appearance="outline"
        >
          +
        </Button>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    // fontSize: 10
    height: "100%",
  },
  neg: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  pos: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
    height: 55,
    marginTop: 20,
  },
});

export default Counter;
