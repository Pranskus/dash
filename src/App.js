import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import CandlestickChart from "./components/CandlestickChart";
import CoinlibWidget from "./components/CoinlibWidget";
import CryptoConverterWidget from "./components/CryptoConverterWidget";

// Define the update interval in milliseconds
const UPDATE_INTERVAL = 10000; // 60 seconds

const App = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [timeInterval, setTimeInterval] = useState("30");
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("candlestick");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentValue, setCurrentValue] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const coinsPerPage = 5;
  const [priceHistory, setPriceHistory] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const fetchCryptoList = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
          },
        }
      );
      setCryptoList(response.data);
    } catch (error) {
      console.error("Error fetching crypto list:", error);
    }
  };

  const fetchHistoricalData = useCallback(
    async (cryptoId) => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${cryptoId}/ohlc`,
          {
            params: {
              vs_currency: "usd",
              days: timeInterval,
            },
          }
        );

        const formattedData = response.data.map((item) => ({
          time: item[0] / 1000, // Convert milliseconds to seconds
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
        }));

        setChartData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching historical data:", error);
        setLoading(false);
      }
    },
    [timeInterval]
  );

  const fetchPriceHistory = async (cryptoId) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`,
        {
          params: {
            vs_currency: "usd",
            days: 7,
            interval: "daily",
          },
        }
      );
      const formattedData = response.data.prices.map(([time, price]) => ({
        time: time / 1000,
        value: price,
      }));
      setPriceHistory(formattedData);
    } catch (error) {
      console.error("Error fetching price history:", error);
    }
  };

  const fetchCurrentPrice = useCallback(async () => {
    if (selectedCrypto) {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price`,
          {
            params: {
              ids: selectedCrypto,
              vs_currencies: "usd",
              include_24hr_change: "true",
            },
          }
        );
        const data = response.data[selectedCrypto];
        setCurrentValue(data.usd);
        setPercentageChange(data.usd_24h_change);
        setLastUpdated(Date.now());
      } catch (error) {
        console.error("Error fetching current price:", error);
      }
    }
  }, [selectedCrypto]);

  useEffect(() => {
    fetchCryptoList();
  }, []);

  useEffect(() => {
    if (selectedCrypto) {
      fetchHistoricalData(selectedCrypto);
      fetchPriceHistory(selectedCrypto);
      const selectedCryptoData = cryptoList.find(
        (crypto) => crypto.id === selectedCrypto
      );
      if (selectedCryptoData) {
        setCurrentValue(selectedCryptoData.current_price);
        setPercentageChange(selectedCryptoData.price_change_percentage_24h);
      }
    }
  }, [selectedCrypto, fetchHistoricalData, cryptoList]);

  const handleCryptoChange = (cryptoId) => {
    setSelectedCrypto(cryptoId);
  };

  const handleTimeIntervalChange = (interval) => {
    setTimeInterval(interval);
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = cryptoList.slice(indexOfFirstCoin, indexOfLastCoin);

  // Find the selected crypto data
  const selectedCryptoData = cryptoList.find(
    (crypto) => crypto.id === selectedCrypto
  );

  // Updated useEffect for real-time updates
  useEffect(() => {
    fetchCurrentPrice(); // Fetch immediately when component mounts or selectedCrypto changes
    const interval = setInterval(fetchCurrentPrice, UPDATE_INTERVAL);

    return () => clearInterval(interval); // Clean up on unmount
  }, [fetchCurrentPrice]);

  return (
    <div
      style={{
        backgroundColor: "#131722",
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* CoinlibWidget at the top, full width */}
      <CoinlibWidget />

      <div
        style={{
          padding: "20px",
          display: "flex",
          gap: "20px",
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Merged Sidebar */}
            <div
              style={{
                width: "250px",
                alignSelf: "flex-start",
              }}
            >
              <Sidebar
                cryptoList={cryptoList}
                selectedCrypto={selectedCrypto}
                onCryptoChange={handleCryptoChange}
                currentValue={currentValue}
                percentageChange={percentageChange}
                priceHistory={priceHistory}
                lastUpdated={lastUpdated}
              />
            </div>

            {/* Main content area */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                }}
              >
                {/* Chart */}
                <div
                  style={{
                    flex: 3,
                    backgroundColor: "#1e2130",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    maxWidth: "70%",
                    height: "350px",
                  }}
                >
                  <CandlestickChart
                    data={chartData}
                    timeInterval={timeInterval}
                    onTimeIntervalChange={handleTimeIntervalChange}
                    selectedCrypto={selectedCrypto}
                    coinLogo={selectedCryptoData?.image}
                  />
                </div>

                {/* Crypto Converter Widget */}
                <div
                  style={{
                    flex: 1,
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <CryptoConverterWidget />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
