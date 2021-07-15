import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { ChartContext } from "./ChartContext";

function ResultsChart() {
  const { dataState, labelState } = useContext(ChartContext);
  // eslint-disable-next-line
  const [data, setData] = dataState;
  // eslint-disable-next-line
  const [labels, setLabels] = labelState;

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
        name: "series-1",
        data: data,
      },
    ],
  };

  const wrapperStyle = {
    marginBottom: "30px",
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  };

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

export default ResultsChart;
