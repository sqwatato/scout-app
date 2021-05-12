import { CheckBox, Text, Toggle } from "@ui-kitten/components";
import React, { useState } from "react";
import { FC } from "react";
import { useData } from "../context/DataContext";

type ToggleProps = {
  dataTitle: string;
  name: string;
};

const MatchStatefulToggle: FC<ToggleProps> = ({ dataTitle, name }) => {
  const { data, setData } = useData();
  const [value, setValue] = useState<boolean>(
    data ? (data[dataTitle] ? data[dataTitle] : false) : false
  );

  const handleChange = (newVal: boolean) => {
    setValue(newVal);
    let dataCopy = data;
    dataCopy[dataTitle] = newVal;
    setData(dataCopy);
  };
  return (
    <CheckBox checked={value} onChange={handleChange} style = {{ marginTop: 12}}>
      {props => <Text {...props} style = {{ fontSize: 16, fontWeight: "500", marginLeft: 15 }}>{name}</Text>}
    </CheckBox>
  );
};

export default MatchStatefulToggle;
