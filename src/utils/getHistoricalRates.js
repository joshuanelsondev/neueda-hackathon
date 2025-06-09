// utils/getHistoricalRates.js
export async function getHistoricalRates(base = "usd", target = "eur", days = 30) {
  const today = new Date();
  const rates = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD

    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${dateStr}/v1/currencies/${base}.json`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      rates.unshift({ date: data.date, rate: data[base][target] });
    } catch (error) {
      console.warn(`Missing data for ${dateStr}`);
    }
  }

  return rates;
}
