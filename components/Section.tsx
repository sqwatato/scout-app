import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

const Section: FC = ({ children }) => (
  <View style={styles.section}>{children}</View>
);

const styles = StyleSheet.create({
  section: {
    marginVertical: 20,
  },
});

export default Section;
