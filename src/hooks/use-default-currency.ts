import { regionToCurrency } from "~/lib/currencies";

type Region = keyof typeof regionToCurrency;
type Currency = (typeof regionToCurrency)[Region];

export const useDefaultCurrency = (): Currency => {
  const locale = navigator.languages.find((lang) => lang.includes("-")) ?? "uk-UA";
  return regionToCurrency[(new Intl.Locale(locale).region as Region) ?? "US"];
};
