import React from "react";
import CryptoSelector from "./CryptoSelector";

const Sidebar = ({
  cryptoList,
  selectedCrypto,
  onCryptoChange,
  currentPage,
  totalPages,
  onPageChange,
  currentValue,
  percentageChange,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          backgroundColor: "#2a2e39",
          margin: 0,
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Current Value</h2>
        <h1 style={{ fontSize: "2em", margin: "10px 0" }}>
          ${currentValue.toFixed(2)}
        </h1>
        <p style={{ color: percentageChange >= 0 ? "#4CAF50" : "#ef5350" }}>
          {percentageChange >= 0 ? "▲" : "▼"}{" "}
          {Math.abs(percentageChange).toFixed(2)}%
        </p>
        <button
          style={{
            backgroundColor: "#3a3f50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          See Details
        </button>
      </div>
      <div
        style={{
          backgroundColor: "#2a2e39",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: "15px" }}>
          Select Cryptocurrency
        </h3>
        <CryptoSelector
          cryptoList={cryptoList}
          selectedCrypto={selectedCrypto}
          onCryptoChange={onCryptoChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Sidebar;
