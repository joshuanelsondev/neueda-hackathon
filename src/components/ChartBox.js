import React, { useState } from "react";
import CurrencyChart from "./CurrencyChart";

export default function ChartBox({ base, target }) {
  const [days, setDays] = useState(7); // Local to ChartBox

  return (
    <div className="chart-box">
      <h3>Exchange Rate Trend (Last {days} Days)</h3>

      <CurrencyChart base={base} target={target} days={days} />

      <div className="chart-range-buttons">
        <button
          className={days === 7 ? "active" : ""}
          onClick={() => setDays(7)}
        >
          7 Days
        </button>
        <button
          className={days === 30 ? "active" : ""}
          onClick={() => setDays(30)}
        >
          30 Days
        </button>
      </div>
    </div>
  );
}
