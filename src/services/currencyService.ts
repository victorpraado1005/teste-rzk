// import { Currency } from "./Currency";

// type CurrencyResponse = Array<Currency>

export async function getCurrencys() {
  const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
  if (response.ok) {
    return response.json();
  }
}