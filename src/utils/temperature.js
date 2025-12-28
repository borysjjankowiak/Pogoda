export const formatTemp = (tempK, unit) => {
  const k = Number(tempK);
  if (Number.isNaN(k)) return { value: "-", symbol: "" };
  if (unit === "K") return { value: Math.round(k), symbol: "K" };
  const c = k - 273.15;
  if (unit === "F") return { value: Math.round(c * (9 / 5) + 32), symbol: "°F" };
  return { value: Math.round(c), symbol: "°C" };
};
