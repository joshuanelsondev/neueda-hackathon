import React, { useState } from "react";
import "./App.css";

// Map countries to their currency codes
const countryCurrency = {
  USA: "USD",
  UK: "GBP",
  France: "EUR",
  Japan: "JPY",
  India: "INR",
  Canada: "CAD",
  Australia: "AUD",
  // Add more as needed
};

function App() {
  const [fromCountry, setFromCountry] = useState("USA");
  const [toCountry, setToCountry] = useState("France");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Replace with your actual API key from https://www.exchangerate-api.com/
  const API_KEY = process.env.REACT_APP_EXCHANGE_API_KEY;
  console.log("API KEY: ", API_KEY);

  const handleConvert = async () => {
    setError("");
    setResult(null);
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount.");
      return;
    }
    if (fromCountry === toCountry) {
      setResult(amount);
      return;
    }
    setLoading(true);
    const fromCurrency = countryCurrency[fromCountry];
    const toCurrency = countryCurrency[toCountry];
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      const data = await res.json();
      if (data.result === "success") {
        setResult(data.conversion_result);
      } else {
        setError("Conversion failed. Please check your API key or try again.");
      }
    } catch (err) {
      setError("Error fetching conversion rate.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Currency Converter</h2>
        <div style={{ margin: "1em 0" }}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ marginRight: 10 }}
          />
          <select
            value={fromCountry}
            onChange={(e) => setFromCountry(e.target.value)}
          >
            {Object.keys(countryCurrency).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <span style={{ margin: "0 10px" }}>to</span>
          <select
            value={toCountry}
            onChange={(e) => setToCountry(e.target.value)}
          >
            {Object.keys(countryCurrency).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleConvert} disabled={loading}>
          {loading ? "Converting..." : "Convert"}
        </button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        {result !== null && !error && (
          <div style={{ marginTop: 20 }}>
            <strong>
              {amount} {countryCurrency[fromCountry]} = {result}{" "}
              {countryCurrency[toCountry]}
            </strong>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
