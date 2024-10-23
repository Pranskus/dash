import React, { useEffect } from "react";

const CryptoConverterWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <iframe
        id="iframe-widget"
        src="https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=false&amount=0.1&amountFiat=1500&backgroundColor=2B2B35&darkMode=true&from=btc&fromFiat=eur&horizontal=false&isFiat&lang=en-US&link_id=6a2b4ae0f4576a&locales=true&logo=false&primaryColor=00C26F&to=eth&toFiat=eth&toTheMoon=true"
        style={{
          height: "500px",
          width: "300px",
          border: "none",
          borderRadius: "0.3rem",
        }}
        title="ChangeNOW Crypto Converter"
      ></iframe>
    </div>
  );
};

export default CryptoConverterWidget;
