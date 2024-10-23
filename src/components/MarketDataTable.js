import React from "react";

const MarketDataTable = ({ cryptoData, selectedCrypto }) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <h2>{selectedCrypto.toUpperCase()} Market Data</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Current Price (USD)</th>
            <th>Market Cap (USD)</th>
            <th>24h Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData
            .filter((crypto) => crypto.id === selectedCrypto)
            .map((crypto) => (
              <tr key={crypto.id}>
                <td>{crypto.name}</td>
                <td>${crypto.current_price.toLocaleString()}</td>
                <td>${crypto.market_cap.toLocaleString()}</td>
                <td
                  style={{
                    color:
                      crypto.price_change_percentage_24h > 0 ? "green" : "red",
                  }}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketDataTable;
