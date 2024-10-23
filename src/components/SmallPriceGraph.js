import React from "react";
import { ResponsiveContainer, AreaChart, Area, YAxis, Tooltip } from "recharts";

const SmallPriceGraph = ({ data }) => {
  // Determine if the price trend is positive
  const isPositive =
    data.length > 1 && data[data.length - 1].value > data[0].value;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <p style={{ color: "#fff", margin: 0 }}>
            ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "210px", height: "60px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={isPositive ? "#4CAF50" : "#ef5350"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={isPositive ? "#4CAF50" : "#ef5350"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <YAxis domain={["dataMin", "dataMax"]} hide={true} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={isPositive ? "#4CAF50" : "#ef5350"}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SmallPriceGraph;
