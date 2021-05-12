import { Button, Text } from "@ui-kitten/components";
import React, { FC, useEffect, useRef, useState } from "react";
import { View } from "react-native";

export interface StopwatchProps {
  onMSecChange: (msecs: number) => void;
}

const Stopwatch: FC<StopwatchProps> = ({ onMSecChange }) => {
  const [mins, setMins] = useState(0);
  const [msecs, setMsecs] = useState(0);
  const [totalMSecs, setTotalMsecs] = useState(0);
  let count = 0;
  const [secs, setSecs] = useState(0);
  const countRef = useRef(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const mins = Math.floor(totalMSecs / 60000);
    const secs = Math.floor((totalMSecs - mins * 60000) / 1000);
    const msecs = Math.floor(totalMSecs - mins * 60000 - secs * 1000);
    setMins(mins);
    setSecs(secs);
    setMsecs(msecs);
    onMSecChange(totalMSecs);

    // return clearInterval(countRef.current);
  }, [totalMSecs]);

  const start = () => {
    setPaused(false);
    countRef.current = setInterval(() => {
      count += 100;
      setTotalMsecs(count);
    }, 100);
  };
  const pause = () => {
    setPaused(true);
    clearInterval(countRef.current);
  };
  const reset = () => {
    setTotalMsecs(0);
    count = 0;
  };

  return (
    <View>
      <Text category = "h5" style = {{ marginVertical: 10, fontWeight: "400", fontSize: 40 }}>{`${mins < 10 ? 0 : ""}${mins}:${secs < 10 ? 0 : ""}${secs}.${
        msecs / 100
      }`}</Text>
      <Button onPress={paused ? start : pause}  status = {paused ? "success" : "danger" } style = {{ marginBottom: 10 }}> 
        { paused ? "Start" : "Stop" }
      </Button>
      <Button onPress={reset} disabled={ ( !paused || msecs == 0 ) } appearance = "outline">
        Reset
      </Button>
    </View>
  );
};

export default Stopwatch;
