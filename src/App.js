import React from "react";
import Widget from "./components/Widget";
import { ChartProvider } from "./components/ChartContext";
import "./App.css";
import "./Responsive.css";

function App() {
  return (
    <ChartProvider>
      <div>
        <Widget></Widget>
      </div>
    </ChartProvider>
  );
}

export default App;
