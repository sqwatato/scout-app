import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MatchProps } from "./Match";

const PostGame: FC<MatchProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text>Post Game!</Text>
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

export default PostGame;
