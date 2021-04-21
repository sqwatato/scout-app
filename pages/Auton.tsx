import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

const Auton: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Auton!</Text>
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

export default Auton;
