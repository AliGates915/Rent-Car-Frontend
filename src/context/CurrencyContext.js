/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState, useMemo } from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("PKR");

  // Exchange rates for conversion
  const exchangeRates = {
    USD: 1 / 280, // Assuming PKR to USD
    PKR: 1,       // PKR is the base
    GBP: 0.81 / 280, // Assuming PKR to GBP
    EUR: 0.92 / 280, // Assuming PKR to EUR
  };

  // Mapping currency to symbols
  const currencySymbols = {
    USD: "$",
    PKR: "₨",
    GBP: "£",
    EUR: "€",
  };

  // Convert price to the selected currency
  const convertPrice = (priceInPKR) =>
    (priceInPKR * exchangeRates[currency]).toFixed(0);

  const value = useMemo(
    () => ({ currency, setCurrency, convertPrice, currencySymbols }),
    [convertPrice, currency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
