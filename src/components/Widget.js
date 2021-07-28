import React from "react";
import Input from "./Input";
// eslint-disable-next-line
import ResultsChart from "./ResultsChart";
import Branding from "./Branding";
import "./stylesheets/Widget.css";

function Widget() {
  return (
    <div className="widget">
      <div className="left">
        <h3>Try it with your own example</h3>
        <Input></Input>
      </div>
      <div className="line"></div>
      <div className="right">
        <h3>Result</h3>
        <ResultsChart></ResultsChart>
        <Branding></Branding>
      </div>
    </div>
  );
}

export default Widget;
