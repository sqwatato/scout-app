import React, { FC, useState } from "react";
import { useData } from "../context/DataContext";
import Counter from "./Counter";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";

type CounterProps = {
  dataTitle: string;
  haptic: boolean;
  name: string;
};

const MatchStatefulCounter: FC<CounterProps> = ({
  dataTitle,
  haptic,
  name,
}) => {
  const { data, setData } = useData();
  const [value, setValue] = useState<number>(
    data ? (data[dataTitle] ? data[dataTitle] : 0) : 0
  );

  const handleChange = (value: number) => {
    setValue(value);

    let dataCopy = { ...data };
    dataCopy[dataTitle] = value;
    setData(dataCopy);
  };
  return <Stopwatch></Stopwatch>;
};

export default MatchStatefulCounter;
