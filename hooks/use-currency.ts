import { useState, useEffect } from "react";

export type CurrencyCode = "ZAR" | "USD" | "GBP" | "EUR";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  flag: string;
  countryName: string;
  /** Starter once-off price */
  starterPrice: number;
  /** Growth once-off price */
  growthPrice: number;
  /** Starter "was" (crossed out) price */
  starterWas: number;
  /** Growth "was" (crossed out) price */
  growthWas: number;
  /** Starter monthly retainer add-on */
  starterRetainer: number;
  /** Growth monthly retainer add-on */
  growthRetainer: number;
  /** Format a number as a price string with this currency */
  format: (amount: number) => string;
}

const CURRENCY_CONFIGS: Record<CurrencyCode, Omit<CurrencyConfig, "format">> = {
  ZAR: {
    code: "ZAR",
    symbol: "R",
    flag: "🇿🇦",
    countryName: "South Africa",
    starterPrice: 600,
    growthPrice: 2000,
    starterWas: 1500,
    growthWas: 4500,
    starterRetainer: 199,
    growthRetainer: 299,
  },
  USD: {
    code: "USD",
    symbol: "$",
    flag: "🇺🇸",
    countryName: "United States",
    starterPrice: 100,
    growthPrice: 220,
    starterWas: 250,
    growthWas: 500,
    starterRetainer: 20,
    growthRetainer: 35,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    flag: "🇬🇧",
    countryName: "United Kingdom",
    starterPrice: 100,
    growthPrice: 200,
    starterWas: 240,
    growthWas: 460,
    starterRetainer: 18,
    growthRetainer: 30,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    flag: "🌍",
    countryName: "International",
    starterPrice: 100,
    growthPrice: 210,
    starterWas: 250,
    growthWas: 480,
    starterRetainer: 19,
    growthRetainer: 32,
  },
};

function getCurrencyForCountry(countryCode: string): CurrencyCode {
  if (countryCode === "ZA") return "ZAR";
  if (countryCode === "GB" || countryCode === "UK") return "GBP";
  if (countryCode === "US") return "USD";
  // EU countries
  const euCountries = [
    "AT","BE","BG","CY","CZ","DE","DK","EE","ES","FI","FR","GR","HR",
    "HU","IE","IT","LT","LU","LV","MT","NL","PL","PT","RO","SE","SI","SK",
  ];
  if (euCountries.includes(countryCode)) return "EUR";
  // Default everything else to EUR (international pricing)
  return "EUR";
}

function buildConfig(code: CurrencyCode): CurrencyConfig {
  const base = CURRENCY_CONFIGS[code];
  const format = (amount: number): string => {
    if (code === "ZAR") {
      return `R${amount.toLocaleString("en-ZA")}`;
    }
    return `${base.symbol}${amount.toLocaleString("en")}`;
  };
  return { ...base, format };
}

export const ALL_CURRENCIES: CurrencyCode[] = ["ZAR", "USD", "GBP", "EUR"];

export function useCurrency() {
  const [currency, setCurrency] = useState<CurrencyConfig>(buildConfig("ZAR"));
  const [isLoading, setIsLoading] = useState(true);
  const [detectedCountry, setDetectedCountry] = useState<string>("ZA");

  useEffect(() => {
    // Check if user has manually overridden the currency
    const stored = localStorage.getItem("revero_currency_override") as CurrencyCode | null;
    if (stored && CURRENCY_CONFIGS[stored]) {
      setCurrency(buildConfig(stored));
      setIsLoading(false);
      return;
    }

    // Auto-detect via IP geolocation (free service, no API key needed)
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data: { country_code?: string }) => {
        const countryCode = data.country_code ?? "ZA";
        setDetectedCountry(countryCode);
        const code = getCurrencyForCountry(countryCode);
        setCurrency(buildConfig(code));
      })
      .catch(() => {
        // Fallback to ZAR if detection fails
        setCurrency(buildConfig("ZAR"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const overrideCurrency = (code: CurrencyCode) => {
    localStorage.setItem("revero_currency_override", code);
    setCurrency(buildConfig(code));
  };

  const resetToAuto = () => {
    localStorage.removeItem("revero_currency_override");
    const code = getCurrencyForCountry(detectedCountry);
    setCurrency(buildConfig(code));
  };

  return { currency, isLoading, overrideCurrency, resetToAuto };
}
