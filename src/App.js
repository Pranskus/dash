import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import CandlestickChart from "./components/CandlestickChart";
import CoinlibWidget from "./components/CoinlibWidget";
import CryptoConverterWidget from "./components/CryptoConverterWidget";

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

  useEffect(() => {
    fetchCryptoList();
  }, []);

  useEffect(() => {
    if (selectedCrypto) {
      fetchHistoricalData(selectedCrypto);
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
            {/* Sidebar */}
            <div
              style={{
                width: "250px",
                borderRadius: "10px",

                alignSelf: "flex-start",
              }}
            >
              <Sidebar
                cryptoList={currentCoins}
                selectedCrypto={selectedCrypto}
                onCryptoChange={handleCryptoChange}
                currentPage={currentPage}
                totalPages={Math.ceil(cryptoList.length / coinsPerPage)}
                onPageChange={handlePageChange}
                currentValue={currentValue}
                percentageChange={percentageChange}
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
                    chartType={chartType}
                    onChartTypeChange={handleChartTypeChange}
                    timeInterval={timeInterval}
                    onTimeIntervalChange={handleTimeIntervalChange}
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
