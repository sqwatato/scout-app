import React, { FC, useState, useEffect } from "react";
import { MatchData } from "../pages/Match";
import Counter from "./Counter";

type CounterProps = {
  data: MatchData;
  dataTitle: string;
  onDataChange: (data: MatchData) => void;
  haptic: boolean;
  name: string;
};

const MatchStatefulCounter: FC<CounterProps> = ({
  data,
  dataTitle,
  onDataChange,
  haptic,
  name,
}) => {
  const [value, setValue] = useState<number>(
    data ? (data[dataTitle] ? data[dataTitle] : 0) : 0
  );

  useEffect(() => {
    setValue(data ? (data[dataTitle] ? data[dataTitle] : 0) : 0);
  }, [data[dataTitle]]);

  const handleChange = (value: number) => {
    let dataCopy = { ...data };
    dataCopy[dataTitle] = value;
    onDataChange(dataCopy);
  };
  return (
    <Counter
      value={value}
      onChange={(val) => handleChange(val)}
      name={name}
      haptic={haptic}
    />
  );
};

export default MatchStatefulCounter;
