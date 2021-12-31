import React, { useContext } from "react";
import Chart from "react-apexcharts";
import Spinner from "../generalComponents/Spinner";
import { ChartContext } from "./ChartContext";
import { Helper } from "../scripts/paramInit";

function ResultsChart() {
  const { dataState, labelState, loadingState } = useContext(ChartContext);
  // eslint-disable-next-line
  const [data, setData] = dataState;
  // eslint-disable-next-line
  const [labels, setLabels] = labelState;
  // eslint-disable-next-line
  const [isLoading, setLoading] = loadingState;

  const details = {
    options: {
      chart: {
        id: "mychart",
        fontFamily: "sofia-pro",
        foreColor: "#2B1E6B",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: labels,
        min: 0,
        max: 1,
        tickAmount: 5,
        labels: {
          formatter: function (val) {
            return Math.round(val * 100) + "%";
          },
        },
      },
      fill: {
        colors: ["#2B1E6B"],
      },
    },
    series: [
      {
        name: "confidence",
        data: data,
      },
    ],
  };

  const helper = new Helper();
  const branding = helper.initializeParam("branding", "true");

  const wrapperStyle = {
    marginBottom: branding === "false" ? "22px" : "0px",
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (isLoading) {
    return (
      <div id="chart" style={wrapperStyle}>
        <Spinner></Spinner>
      </div>
    );
  } else {
    return (
      <div id="chart" style={wrapperStyle}>
        <Chart
          options={details.options}
          series={details.series}
          type="bar"
          width="100%"
          height={150 + labels.length * 15}
        ></Chart>
      </div>
    );
  }
}

export default ResultsChart;
