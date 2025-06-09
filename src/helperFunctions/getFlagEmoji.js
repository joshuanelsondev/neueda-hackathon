// Helper for flag emoji (works for most countries)
function getFlagEmoji(country) {
  const code =
    {
      USA: "US",
      UK: "GB",
      SouthKorea: "KR",
      NewZealand: "NZ",
      SaudiArabia: "SA",
      UAE: "AE",
      Czechia: "CZ",
      SouthAfrica: "ZA",
      Bangladesh: "BD",
      Switzerland: "CH",
      Netherlands: "NL",
      Philippines: "PH",
      Vietnam: "VN",
      Japan: "JP",
      Spain: "ES",
      Germany: "DE",
      Italy: "IT",
      Egypt: "EG",
      Argentina: "AR",
      Russia: "RU",
      France: "FR",
      India: "IN",
      China: "CN",
      Mexico: "MX",
      Sweden: "SE",
      Norway: "NO",
      Denmark: "DK",
      Hungary: "HU",
      Poland: "PL",
      Turkey: "TR",
      Brazil: "BR",
      Nigeria: "NG",
      Pakistan: "PK",
      Malaysia: "MY",
      Singapore: "SG",
      Thailand: "TH",
      Indonesia: "ID",
      Belgium: "BE",
    }[country] || country.slice(0, 2).toUpperCase();
  return code.replace(/./g, (char) =>
    String.fromCodePoint(127397 + char.charCodeAt())
  );
}

export default getFlagEmoji;
