import React, { FC, useState } from "react";
import { useData } from "../context/DataContext";
import Counter from "./Counter";
import { View } from "react-native";
import Stopwatch from "./Stopwatch";

type CounterProps = {
  dataTitle: string;
  name: string;
};

const MatchStatefulCounter: FC<CounterProps> = ({ dataTitle }) => {
  const { data, setData } = useData();
  const [value, setValue] = useState<number>(
    data ? (data[dataTitle] ? data[dataTitle] : 0) : 0
  );
  const [start, setStart] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

  const handleChange = (value: number) => {
    setValue(value);

    let dataCopy = { ...data };
    dataCopy[dataTitle] = value;
    setData(dataCopy);
  };
  return (
    <View>
      <Stopwatch onMSecChange={(time) => setValue(time)} />
    </View>
  );
};

export default MatchStatefulCounter;
