import React, { useState, createContext } from "react";

export const ChartContext = createContext();

export const ChartProvider = (props) => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  return (
    <ChartContext.Provider
      value={{
        dataState: [data, setData],
        labelState: [labels, setLabels],
      }}
    >
      {props.children}
    </ChartContext.Provider>
  );
};
