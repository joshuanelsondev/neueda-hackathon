import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { getHistoricalRates } from "../utils/getHistoricalRates";

export default function CurrencyChart({ base = "usd", target = "eur", days = 7 }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    setLoading(true);
    getHistoricalRates(base, target, days).then((rates) => {
        setData(rates);
        setLoading(false);
    });
    }, [base, target, days]);

  return loading ? (
    <p>Loading chart...</p>
    ) : (
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
