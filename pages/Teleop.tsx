import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const Teleop: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Teleop!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Teleop;
