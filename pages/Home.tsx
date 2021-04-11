import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View } from 'react-native';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import { db } from '../firebase';

/*
Since this app is using React Native, you can not use the normal HTML elements.
Instead, React Native provides alternatives.
Learn more [here](https://reactnative.dev/docs/components-and-apis)

div -> View
img -> Image
input -> TextInput
*/

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Home: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        // In the app, we will be only setting data
        // Just for the demo, we will fetch a document
        const query = await db
          .collection('regional')
          .doc('CAVE')
          .collection('matches')
          .doc('1')
          .collection('blue')
          .doc('7650')
          .get();
        setData(JSON.stringify(query.data()['data']));
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <StatusBar style="auto" />
      {loading ? (
        <Text>loading...</Text>
      ) : (
        <>
          <Text>{data}</Text>
        </>
      )}
      <Button
        title="Go To Settings?"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
