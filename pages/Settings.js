import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Settings Page</Text>
      <StatusBar style="auto" />
      <Button title="Go To Home?" onPress={() => navigation.navigate('Home')} />
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
