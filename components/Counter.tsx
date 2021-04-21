import { Button, ButtonGroup, Divider, Layout, Text } from "@ui-kitten/components";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import * as Haptics from 'expo-haptics';

interface Props {
  name: string | undefined;
  onChange: (newVal: number) => void | undefined;
  value: number;
}


const Counter: FC<Props> = ({ name, onChange, value }) => {
  return (
    <Layout style={styles.container}>
      <Text category="s1" style={styles.child}>{`${name}: `}</Text>
      <Text category = "h6" style = {
        { 
          borderColor: "#ddf", 
          borderWidth: 1, 
          padding: 6, 
          paddingHorizontal: 10,
          borderRadius: 3
        }
      }>{value}</Text>

      <View style={styles.buttonContainer}>
        <ButtonGroup  appearance = "outline">
          <Button            
            style={[styles.button, styles.child]}
            onPress={() => { onChange(value + 1); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)} }
          >
            +
          </Button>
          <Button
            style={[styles.button, styles.child]}
            onPress={() => {onChange(value - 1); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)} }
          >
            -
          </Button>
        </ ButtonGroup>
        
      </View>
    </Layout>
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
    fontSize: 5,
  },
  child: {
  },
  buttonContainer: {
    flexDirection: "row",
    right: 0,
    alignItems: "center",
    position: "absolute",
  },
});

export default Counter;
