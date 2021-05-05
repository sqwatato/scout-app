import React, { createContext, FC, useContext, useState } from "react";
import { MatchData } from "../pages/Match";

let data: MatchData = {
  alliance: "",
  attemptHang: false,
  attemptLevel: false,
  autonInner: 0,
  autonUpper: 0,
  autonBottom: 0,
  autonInnerMissed: 0,
  autonUpperMissed: 0,
  autonBottomMissed: 0,
  comments: "",
  defense: false,
  stuck: false,
  disabled: false,
  hangFail: false,
  levelFail: false,
  matchNum: 0,
  minfo: "",
  regional: "",
  teamNum: 0,
  teleopInner: 0,
  teleopUpper: 0,
  teleopBottom: 0,
  cycles: 0,
  rotationDisabled: false,
  crossedInitLine: false,
  soloClimb: false,
  start: 1,
  preloads: 0,
  positionDisabled: false,
  trench: false,
};
let setData: React.Dispatch<React.SetStateAction<MatchData>> = (
  newData: MatchData
) => (data = newData);
const DataContext = createContext({
  data,
  setData,
});

const useData = () => {
  return useContext(DataContext);
};

const DataProvider: FC = ({ children }) => {
  const [data, setData] = useState<MatchData>({
    alliance: "",
    attemptHang: false,
    attemptLevel: false,
    autonInner: 0,
    autonUpper: 0,
    autonBottom: 0,
    autonInnerMissed: 0,
    autonUpperMissed: 0,
    autonBottomMissed: 0,
    comments: "",
    defense: false,
    stuck: false,
    disabled: false,
    hangFail: false,
    levelFail: false,
    matchNum: 0,
    minfo: "",
    regional: "",
    teamNum: 0,
    teleopInner: 0,
    teleopUpper: 0,
    teleopBottom: 0,
    cycles: 0,
    rotationDisabled: false,
    crossedInitLine: false,
    soloClimb: false,
    start: 1,
    preloads: 0,
    positionDisabled: false,
    trench: false,
  });

  const value = {
    data,
    setData,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { useData, DataProvider };
