import React, { useContext, useEffect } from "react";
import { ChartContext } from "./ChartContext";
import { LevityConnector } from "./scripts/levityConnector";

function TextInput({ sampleText }) {
  const { dataState, labelState, loadingState } = useContext(ChartContext);
  // eslint-disable-next-line
  const [data, setData] = dataState;
  // eslint-disable-next-line
  const [labels, setLabels] = labelState;
  // eslint-disable-next-line
  const [isLoading, setLoading] = loadingState;
  const connector = new LevityConnector();

  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    //backgroundColor: "grey",
  };

  // run once to get the sample text classified after the component is rendered
  useEffect(() => {
    async function fetchResults() {
      const results = await connector.classifyTextFromLevity(sampleText);
      setData(LevityConnector.getTop5Confidences(results));
      setLabels(LevityConnector.getTop5Labels(results));
      setLoading(false);
    }
    fetchResults();
    // eslint-disable-next-line
  }, []);

  const updateChart = async (text) => {
    const results = await connector.classifyTextFromLevity(text);
    setData(LevityConnector.getTop5Confidences(results));
    setLabels(LevityConnector.getTop5Labels(results));
    setLoading(false);
  };

  const triggerUpdate = () => {
    setLoading(true);
    updateChart(document.getElementById("textinput").value);
  };

  return (
    <div style={wrapperStyle}>
      <textarea id="textinput" placeholder={sampleText}></textarea>
      <button id="classifytxt" onClick={triggerUpdate}>
        Classify Text
      </button>
    </div>
  );
}

export default TextInput;
