import React, { useState, createContext } from "react";

export const ChartContext = createContext();

export const ChartProvider = (props) => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [isLoading, setLoading] = useState(true);

  return (
    <ChartContext.Provider
      value={{
        dataState: [data, setData],
        labelState: [labels, setLabels],
        loadingState: [isLoading, setLoading],
      }}
    >
      {props.children}
    </ChartContext.Provider>
  );
};
