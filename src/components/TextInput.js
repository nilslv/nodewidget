import React, { useContext, useEffect } from "react";
import { ChartContext } from "./ChartContext";
import { LevityConnector } from "./scripts/levityConnector";

function TextInput({ sampleText }) {
  const { dataState, labelState } = useContext(ChartContext);
  // eslint-disable-next-line
  const [data, setData] = dataState;
  const [labels, setLabels] = labelState;
  const connector = new LevityConnector();

  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  };

  // TODO get data from Levity application

  // run once to get the sample text classified after the component is rendered
  useEffect(() => {
    async function fetchResults() {
      const results = await connector.classifyTextFromLevity(sampleText);
      setData(LevityConnector.getTop5Confidences(results));
      const test = LevityConnector.getTop5Labels(results);
      setLabels(test);
    }
    fetchResults();
    // eslint-disable-next-line
  }, []);

  const updateChart = async (text) => {
    console.log(`should be sending text: ${text} to classify`);
    // get back results from Levity API
    const results = await connector.classifyTextFromLevity(text);
    const unorderedData = LevityConnector.getTop5Confidences(results);
    const unorderedLabels = LevityConnector.getTop5Labels(results);

    // order data according to existing labels
    let orderedData = [];
    for (let i = 0; i < unorderedData.length; i++) {
      let label = unorderedLabels[i];
      orderedData[labels.indexOf(label)] = unorderedData[i];
    }
    setData(orderedData);
  };

  const triggerUpdate = () => {
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
