import { Button, Layout, Text } from "@ui-kitten/components";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  name: string | undefined;
  onChange: (newVal: number) => void | undefined;
  value: number;
}

const Counter: FC<Props> = ({ name, onChange, value }) => {
  return (
    <View style={styles.container}>
      <Text category="h6" style={styles.child}>{`${name}: `}</Text>
      <Text>{value}</Text>

      <View style={styles.buttonContainer}>
        <Button
          style={[styles.button, styles.child]}
          onPress={() => onChange(value + 1)}
        >
          +
        </Button>
        <Button
          style={[styles.button, styles.child]}
          onPress={() => onChange(value - 1)}
        >
          -
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: "60%",
    height: "25%",
    fontSize: 5,
  },
  child: {
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    right: 40,
    alignItems: "center",
    position: "absolute",
  },
});

export default Counter;
