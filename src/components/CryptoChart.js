import React from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  CandlestickController,
  CandlestickElement,
  Tooltip
);

const CryptoChart = ({
  chartType,
  lineChartData,
  candlestickChartData,
  selectedCrypto,
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "d MMM",
          },
        },
        adapters: {
          date: {
            locale: enUS,
          },
        },
        ticks: {
          source: "data",
          autoSkip: true,
          maxRotation: 0,
          font: {
            size: 12,
          },
        },
      },
      y: {
        position: "right",
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => {
            const point = context.raw;
            if (point.o !== undefined) {
              return [
                `Open: $${point.o.toLocaleString()}`,
                `High: $${point.h.toLocaleString()}`,
                `Low: $${point.l.toLocaleString()}`,
                `Close: $${point.c.toLocaleString()}`,
              ];
            }
            return `${context.dataset.label}: $${point.y.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        height: "400px",
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Chart
        type={chartType === "line" ? "line" : "candlestick"}
        data={chartType === "line" ? lineChartData : candlestickChartData}
        options={options}
      />
    </div>
  );
};

export default CryptoChart;
