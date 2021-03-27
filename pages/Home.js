import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

/*
Since this app is using React Native, you can not use the normal HTML elements.
Instead, React Native provides alternatives.
Learn more [here](https://reactnative.dev/docs/components-and-apis)

div -> View
img -> Image
input -> TextInput
*/
export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <StatusBar style="auto" />
      <Button
        title="Go To Settings?"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
