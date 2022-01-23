import { Button, Text } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import { View } from "react-native";

interface Props {
  onChange: (temporary: any[]) => void;
  postFields: any[];
  fieldIndex: number;
}

const Stopwatch: React.FC<Props> = ({ onChange, postFields, fieldIndex }) => {
  const [secs, setTime] = useState(postFields[fieldIndex]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any = undefined;
    if (isRunning) {
      interval = setInterval(() => {
        let newMs = secs + 1;
        setTime(newMs);
        const temp: any[] = postFields;
        temp[fieldIndex] = secs;
        onChange(temp);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secs]);

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
      <Text category = "h5" style={{ marginVertical: 10, fontWeight: "400", fontSize: 20, paddingRight: 5}}>Climb Time:</Text>
      <Text
        category="h6"
        style={{ marginVertical: 10, fontWeight: "200", fontSize: 20 }}
      >
        {`${secs} s`}
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
