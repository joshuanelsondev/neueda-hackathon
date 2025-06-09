// utils/getHistoricalRates.js

export async function getHistoricalRates(base = "usd", target = "eur", days = 30) {
  const today = new Date();
  const rates = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10); // Format: YYYY-MM-DD

    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${dateStr}/v1/currencies/${base}.json`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch for ${dateStr}`);
      }

      const data = await res.json();

      // Handle edge case where target currency might be missing
      if (data[base] && data[base][target]) {
        rates.unshift({ date: data.date, rate: data[base][target] });
      } else {
        console.warn(`Missing rate for ${base.toUpperCase()} → ${target.toUpperCase()} on ${dateStr}`);
      }
    } catch (error) {
      console.warn(`Failed to fetch rate for ${dateStr}:`, error.message);
      // You could optionally push a null value or skip entirely
    }
  }

  return rates;
}
