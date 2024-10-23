import React, { useState, useEffect } from "react";

const CryptoSelector = ({ cryptoList, selectedCrypto, onCryptoChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState(cryptoList);

  const selectedCryptoData = cryptoList.find(
    (crypto) => crypto.id === selectedCrypto
  );

  useEffect(() => {
    const filtered = cryptoList.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  }, [searchTerm, cryptoList]);

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "90%",
          padding: "10px",
          backgroundColor: "#3a3f50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={selectedCryptoData.image}
            alt={`${selectedCryptoData.name} logo`}
            style={{
              width: "20px",
              height: "20px",
              marginRight: "10px",
            }}
          />
          {selectedCryptoData.name} ({selectedCryptoData.symbol.toUpperCase()})
        </div>
        <span style={{ marginLeft: "10px" }}>▼</span>
      </div>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#3a3f50",
            borderRadius: "5px",
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              borderBottom: "1px solid #4a4f60",
              backgroundColor: "#2a2e39",
              color: "white",
              fontSize: "14px",
            }}
          />
          {filteredList.map((crypto) => (
            <div
              key={crypto.id}
              onClick={() => {
                onCryptoChange(crypto.id);
                setIsOpen(false);
                setSearchTerm("");
              }}
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "#4a4f60",
                },
              }}
            >
              <img
                src={crypto.image}
                alt={`${crypto.name} logo`}
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                }}
              />
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoSelector;
