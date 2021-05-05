import { Text } from "@ui-kitten/components";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  headerTitle?: string;
  headerPadding?: number;
};
const Section: FC<Props> = ({ children, headerTitle, headerPadding }) => (
  <View style={styles.section}>
    <Text category="h4" style={{ paddingTop: headerPadding }}>
      {headerTitle}
    </Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginVertical: 20,
  },
});

export default Section;
