import React from "react";

const CryptoSelector = ({
  cryptoList,
  selectedCrypto,
  onCryptoChange,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "15px",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {cryptoList.map((crypto) => (
          <button
            key={crypto.id}
            onClick={() => onCryptoChange(crypto.id)}
            style={{
              padding: "10px",
              backgroundColor:
                selectedCrypto === crypto.id ? "#4CAF50" : "#3a3f50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {crypto.name} ({crypto.symbol.toUpperCase()})
          </button>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ padding: "5px 10px", cursor: "pointer" }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ padding: "5px 10px", cursor: "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CryptoSelector;
