import React, { FC, useEffect, useState } from "react";
import { Settings, StyleSheet, View, SafeAreaView, Animated } from "react-native";
import { Easing } from 'react-native-reanimated';
import { Layout, Button, Text, IndexPath } from "@ui-kitten/components";
import { BlurView } from 'expo-blur';
import { MatchProps } from "./Match";
import Header from "../components/Header"
import Counter from "../components/Counter";
import { ScrollView } from "react-native-gesture-handler";
import {Dimensions} from 'react-native';

const Auton: FC<MatchProps> = ({ data, matchInfo, onChange, settings }) => {
  const [headerBackgroundColor] = useState( new Animated.Value( 0 ) );
  const interpolateHeaderBackgroundColor = headerBackgroundColor.interpolate({ 
    inputRange: [0,255], 
    outputRange: [ '#fff0', '#aaf2']
  })
  const [autonInner, setAutonInner] = useState<number>(
    data ? (data.autonInner ? data.autonInner : 0) : 0
  );
  const [autonUpper, setAutonUpper] = useState<number>(
    data ? (data.autonUpper ? data.autonUpper : 0) : 0
  );
  const [autonBottom, setAutonBottom] = useState<number>(
    data ? (data.autonBottom ? data.autonBottom : 0) : 0
  );

  const handleSave = () => {
    onChange({
      ...data,
      autonInner,
      autonUpper,
      autonBottom,
    });
  };

  const [ matchInfoState, setMatchInfoState ] = useState( matchInfo )

  useEffect( () => {
    setMatchInfoState( matchInfo );
  }, [matchInfo])


  return (
    <Layout style={styles.container} level="1">
      <View>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          onScroll = {( e ) => {
            if( e.nativeEvent.contentOffset.y > 0 )
              Animated.timing( headerBackgroundColor, {
                toValue: 255,
                duration: 150,
                useNativeDriver: false
              }).start()
            else
              Animated.timing( headerBackgroundColor, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false
              }).start()
          }}
          style = {{zIndex: 0}}
        >
          <View style = {styles.section}>
            <Text category = "h4" style = {{paddingTop: 120}}>Succesful Shots</Text>

            <Counter
              value={autonBottom}
              onChange={setAutonBottom}
              name="Auton Bottom"
              haptic = { settings.haptic }
            />
            <Counter
              value={autonUpper}
              onChange={setAutonUpper}
              name="Auton Upper"
              haptic={settings.haptic}
            />
            <Counter
              value={autonInner}
              onChange={setAutonInner}
              name="Auton Inner"
              haptic={settings.haptic}
            />
            {/* <Text>{JSON.stringify(matchInfo)}</Text> */}
          </View>

          <View style = {styles.section}>
            <Text category = "h4">Missed Shots</Text>

            <Counter
              value={ 0 }
              onChange={ () => {} }
              name="Auton Bottom"
              haptic = { settings.haptic }
            />
            <Counter value={0} onChange={() => {}} name="Auton Upper" haptic = { settings.haptic }/>
            <Counter value={0} onChange={()=>{}} name="Auton Inner" haptic = { settings.haptic } />
            {/* <Text>{JSON.stringify(matchInfo)}</Text> */}
          </View>
          <Button onPress={handleSave} style = {{marginBottom: 50, marginTop: 30}}>Finish Auton</Button>
        </ScrollView>
      </View>
      <Header title = "Auton" matchInfo = {matchInfoState} backgroundColor = {interpolateHeaderBackgroundColor}/>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  dropdown: {
    width: "70%",
  },
  section:
  {
    marginTop: 35
  }, 
});

export default Auton;
