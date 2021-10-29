import { Button, Text } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import { View } from "react-native";

interface Props {
  onChange: (time: number) => void;
}

const Stopwatch: React.FC<Props> = ({ onChange }) => {
  const [msecs, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any = undefined;
    if (isRunning) {
      interval = setInterval(() => {
        let newMs = msecs + 25;
        setTime(newMs);
        onChange(newMs);
      }, 25);
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
        {`${msecs} ms`}
      </Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {isRunning ? (
          <Button
            onPress={handleStartStop}
            status="danger"
            style={{ margin: "1%" }}
            appearance="outline"
          >
            Stop
          </Button>
        ) : (
          <Button
            onPress={handleStartStop}
            status="success"
            style={{ margin: "1%" }}
            appearance="outline"
          >
            Start
          </Button>
        )}
        <Button
          onPress={handleReset}
          status="warning"
          style={{ margin: "1%" }}
          appearance="outline"
        >
          Reset
        </Button>
      </View>
    </View>
  );
};

export default Stopwatch;
