import { Button, Text } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import { View } from "react-native";

interface Props {
  onChange: (time: number) => void;
}

const Stopwatch: React.FC<Props> = ({ onChange }) => {
  const [msecs, setTime] = useState(0);
  const [mins, setMin] = useState(0);
  const [secs, setSecs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any = undefined;
    if (isRunning) {
      interval = setInterval(() => {
        let newMs = msecs + 5;
        let newSecs = secs;
        let newMin = mins;
        if (newMs >= 1000) {
          newSecs++;
          newMs = 0;
        }
        if (newSecs >= 60) {
          newMin++;
          newSecs = 0;
        }
        setTime(newMs);
        setSecs(newSecs);
        setMin(newMin);
        onChange(newMs + 60 * 1000 * newMin + newSecs * 1000);
      }, 5);
    }
    return () => clearInterval(interval);
  }, [isRunning, msecs]);

  const handleReset = () => {
    setTime(0);
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Text
        category="h5"
        style={{ marginVertical: 10, fontWeight: "400", fontSize: 40 }}
      >
        {`${mins < 10 ? 0 : ""}${mins}:${secs < 10 ? 0 : ""}${secs}.${(
          "000" + msecs
        ).substr(-3)}`}
      </Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {isRunning ? (
          <Button onPress={handleStartStop}>Stop</Button>
        ) : (
          <Button onPress={handleStartStop}>Start</Button>
        )}
        <Button onPress={handleReset}>Reset</Button>
      </View>
    </View>
  );
};

export default Stopwatch;
