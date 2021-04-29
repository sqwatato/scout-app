import React, { createContext, FC, useContext, useState } from "react";
import { MatchData } from "../pages/Match";

let data: MatchData | undefined = undefined;
let setData: React.Dispatch<React.SetStateAction<MatchData>> = (
  newData: MatchData | undefined
) => (data = newData);
const DataContext = createContext({
  data,
  setData,
});

const useData = () => {
  return useContext(DataContext);
};

const DataProvider: FC = ({ children }) => {
  const [data, setData] = useState<MatchData>();

  const value = {
    data,
    setData,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { useData, DataProvider };
