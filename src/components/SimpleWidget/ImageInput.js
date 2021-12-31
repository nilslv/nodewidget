import React, { useContext, useEffect } from "react";
import { ChartContext } from "./ChartContext";
import { LevityConnector } from "../scripts/levityConnector";

function ImageInput({ sampleImage }) {
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
    padding: "10px 20px 10px 0",
  };
  const previewStyle = {
    borderRadius: "10px",
    border: "solid 3px #d3cfdd",
    width: "100%",
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: "url(" + sampleImage + ")",
  };
  const buttonStyle = {
    backgroundColor: "#d3cfdd",
    color: "#2b1e6b",
  };

  // run once to get the sample text classified after the component is rendered
  useEffect(() => {
    enableImageUploadAndUpdate();
    async function fetchResultsAndUpdate() {
      const results = await connector.classifyURLFromLevity(sampleImage);
      setData(LevityConnector.getTop5Confidences(results));
      setLabels(LevityConnector.getTop5Labels(results));
      setLoading(false);
    }
    fetchResultsAndUpdate();
    // eslint-disable-next-line
  }, []);

  const updateChart = async (dataurl) => {
    // get back results from Levity API
    const results = await connector.classifyFileFromLevity(dataurl);
    setData(LevityConnector.getTop5Confidences(results));
    setLabels(LevityConnector.getTop5Labels(results));
    setLoading(false);
  };

  const enableImageUploadAndUpdate = () => {
    // get image field
    let preview = document.getElementById("imagePreview");
    // route alternative button to image upload
    document
      .getElementById("classifyimg")
      .addEventListener("click", function () {
        document.getElementById("imgup").click();
      });
    // set new preview and tigger update
    document
      .getElementById("imgup")
      .addEventListener("change", async function () {
        if (this.files && this.files[0]) {
          setLoading(true);
          var reader = new FileReader();
          reader.onload = function (e) {
            preview.style.backgroundImage = "url(" + e.target.result + ")";
            updateChart(reader.result);
          };
          reader.readAsDataURL(this.files[0]);
        }
      });
  };

  return (
    <div id="imgWrapper" style={wrapperStyle}>
      <div id="imagePreview" style={previewStyle}></div>
      <input
        type="file"
        id="imgup"
        name="imgup"
        accept="image/*"
        style={{ display: "none" }}
      ></input>
      <button className="button" id="classifyimg" style={buttonStyle}>
        Select different image
      </button>
    </div>
  );
}

export default ImageInput;
