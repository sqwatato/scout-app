import { Button, CheckBox, Text, Toggle } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { MatchData } from "../pages/Match";

type ToggleProps = {
  data: MatchData;
  onDataChange: (newData: MatchData) => void;
  dataTitle: string;
  name: string;
};

const MatchStatefulToggle: FC<ToggleProps> = ({
  data,
  onDataChange,
  dataTitle,
  name,
}) => {
  //   const [value, setValue] = useState<boolean>(
  //     data ? (data[dataTitle] ? data[dataTitle] : false) : false
  //   );

  //   useEffect(() => {
  //     setValue(data ? (data[dataTitle] ? data[dataTitle] : false) : false);
  //     console.log(data ? (data[dataTitle] ? data[dataTitle] : false) : false);
  //   }, [data]);

  //   const handleChange = (newVal: boolean) => {
  //     let dataCopy = { ...data };
  //     dataCopy[dataTitle] = newVal;
  //     onDataChange(dataCopy);
  //   };
  return <CheckBox>{name}</CheckBox>;
};

export default MatchStatefulToggle;
