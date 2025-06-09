import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { getHistoricalRates } from "../utils/getHistoricalRates";

export default function CurrencyChart({ base = "usd", target = "eur" }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getHistoricalRates(base, target).then(setData);
  }, [base, target]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Line type="monotone" dataKey="rate" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
