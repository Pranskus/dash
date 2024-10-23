import React, { useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";

const CandlestickChart = ({
  data,
  timeInterval,
  onTimeIntervalChange,
  selectedCrypto,
  coinLogo,
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

    candlestickSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartRef.current.remove();
    };
  }, [data, selectedCrypto]);

  const buttonStyle = {
    background: "none",
    border: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "12px",
    padding: "2px 5px",
    cursor: "pointer",
  };

  return (
    <div style={{ width: "100%", height: "350px", position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {coinLogo && (
            <img
              src={coinLogo}
              alt={`${selectedCrypto} logo`}
              style={{
                width: "32px",
                height: "32px",
                marginRight: "10px",
              }}
            />
          )}
          <h2
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "16px",
              margin: 0,
            }}
          >
            {selectedCrypto.toUpperCase()}
          </h2>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          {["1D", "5D", "1M", "6M", "1Y", "5Y"].map((interval, index) => (
            <button
              key={interval}
              onClick={() =>
                onTimeIntervalChange(
                  ["1", "7", "30", "180", "365", "1825"][index]
                )
              }
              style={{
                ...buttonStyle,
                color:
                  timeInterval === ["1", "7", "30", "180", "365", "1825"][index]
                    ? "#00C26F"
                    : "white",
              }}
            >
              {interval}
            </button>
          ))}
        </div>
      </div>
      <div
        ref={chartContainerRef}
        style={{ width: "100%", height: "calc(100% - 60px)" }}
      />
    </div>
  );
};

export default CandlestickChart;
