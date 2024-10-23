import React from "react";

const CryptoSelector = ({ cryptoList, selectedCrypto, onCryptoChange }) => {
  return (
    <select
      value={selectedCrypto}
      onChange={(e) => onCryptoChange(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#3a3f50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      {cryptoList.map((crypto) => (
        <option key={crypto.id} value={crypto.id}>
          {crypto.name} ({crypto.symbol.toUpperCase()})
        </option>
      ))}
    </select>
  );
};

export default CryptoSelector;
