import React from "react";
import CryptoSelector from "./CryptoSelector";
import SmallPriceGraph from "./SmallPriceGraph";

const Sidebar = ({
  cryptoList,
  selectedCrypto,
  onCryptoChange,
  currentValue,
  percentageChange,
  priceHistory,
  lastUpdated,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: "#2a2e39",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Current Value Display */}
      <div>
        <h2>Current Value</h2>
        <h1 style={{ fontSize: "2em", margin: "10px 0" }}>
          ${currentValue.toFixed(2)}
        </h1>
        <p style={{ color: percentageChange >= 0 ? "#4CAF50" : "#ef5350" }}>
          {percentageChange >= 0 ? "▲" : "▼"}{" "}
          {Math.abs(percentageChange).toFixed(2)}%
        </p>
        <p style={{ fontSize: "0.8em", color: "#888" }}>
          Last updated: {new Date(lastUpdated).toLocaleTimeString()}
        </p>
        {priceHistory && priceHistory.length > 0 && (
          <SmallPriceGraph data={priceHistory} />
        )}
      </div>

      {/* Cryptocurrency Selector */}
      <div>
        <h3 style={{ marginTop: 0, marginBottom: "15px" }}>
          Select Cryptocurrency
        </h3>
        <CryptoSelector
          cryptoList={cryptoList}
          selectedCrypto={selectedCrypto}
          onCryptoChange={onCryptoChange}
        />
      </div>
    </div>
  );
};

export default Sidebar;
