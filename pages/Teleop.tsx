import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Card, Button, Text } from "@ui-kitten/components";
import { MatchProps } from "./Match";

const Teleop: FC<MatchProps> = ({ data }) => {
  return (
    <Layout style={styles.container}>
      <Text category="h1">Teleop!</Text>
    </Layout>
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
