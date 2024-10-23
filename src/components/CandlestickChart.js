import React, { useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";

const CandlestickChart = ({
  data,
  chartType,
  onChartTypeChange,
  timeInterval,
  onTimeIntervalChange,
}) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { type: "solid", color: "#1e222d" },
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: { color: "rgba(197, 203, 206, 0.2)" },
        horzLines: { color: "rgba(197, 203, 206, 0.2)" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candlestickSeries = chartRef.current.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    const lineSeries = chartRef.current.addLineSeries({
      color: "#2962FF",
      lineWidth: 2,
    });

    if (chartType === "candlestick") {
      candlestickSeries.setData(data);
      lineSeries.setData([]);
    } else {
      const lineData = data.map((item) => ({
        time: item.time,
        value: (item.close + item.open) / 2,
      }));
      lineSeries.setData(lineData);
      candlestickSeries.setData([]);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartRef.current.remove();
    };
  }, [data, chartType]);

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <div ref={chartContainerRef} style={{ width: "100%", height: "550px" }} />
      <div
        style={{
          marginTop: "5px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <button
            onClick={() => onChartTypeChange("candlestick")}
            style={{ marginRight: "5px", padding: "2px 5px", fontSize: "12px" }}
          >
            Candlestick
          </button>
          <button
            onClick={() => onChartTypeChange("line")}
            style={{ padding: "2px 5px", fontSize: "12px" }}
          >
            Line
          </button>
        </div>
        <div>
          {["1D", "5D", "1M", "6M", "1Y", "5Y"].map((interval, index) => (
            <button
              key={interval}
              onClick={() =>
                onTimeIntervalChange(
                  ["1", "7", "30", "180", "365", "1825"][index]
                )
              }
              style={{
                padding: "2px 5px",
                fontSize: "12px",
                marginLeft: "2px",
              }}
            >
              {interval}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandlestickChart;
