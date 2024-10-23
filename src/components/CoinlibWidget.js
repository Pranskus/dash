import React from "react";

const CoinlibWidget = () => {
  return (
    <div
      style={{
        height: "36px",
        backgroundColor: "#1D2330",
        overflow: "hidden",
        boxSizing: "border-box",
        border: "1px solid #282E3B",
        borderRadius: "4px",
        textAlign: "right",
        lineHeight: "14px",
        blockSize: "36px",
        fontSize: "12px",
        fontFeatureSettings: "normal",
        textSizeAdjust: "100%",
        boxShadow: "inset 0 -20px 0 0 #262B38",
        padding: "0px",
        margin: "0px",
        width: "100%",
      }}
    >
      <div
        style={{ height: "36px", padding: "0px", margin: "0px", width: "100%" }}
      >
        <iframe
          src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=no"
          width="100%"
          height="36px"
          scrolling="auto"
          marginWidth="0"
          marginHeight="0"
          frameBorder="0"
          border="0"
          style={{ border: 0, margin: 0, padding: 0 }}
          title="Coinlib Widget"
        />
      </div>
    </div>
  );
};

export default CoinlibWidget;
