import React, { FC, useEffect, useState } from "react";
import { Settings, StyleSheet, View, SafeAreaView, Animated } from "react-native";
import { Easing } from 'react-native-reanimated';
import {
  Layout,
  Card,
  Button,
  Text,
  Select,
  SelectItem,
  IndexPath,
  Divider,
 
} from "@ui-kitten/components";
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
              value={0}
              onChange={ () => {} }
              name="Sample Counter"
              haptic = { settings.haptic }
            />
          </View>
          <Button  style = {{marginBottom: 50, marginTop: 30}}>Finish Teleop</Button>
        </ScrollView>
      </View>
      <Header title = "Post Game" matchInfo = {matchInfoState} backgroundColor = {interpolateHeaderBackgroundColor}/>
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
