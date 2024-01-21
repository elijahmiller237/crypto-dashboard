import { exampleCurrencies } from "./exampleCurrencies";
import { CoinOption, CoinQuote, CurrencyExchangeOption } from "./types";
import axios from "axios";

export const getMatchingCoinOptions = async (
  searchStr: string
): Promise<CoinOption[]> => {
  const res = await axios.get<CoinOption[]>("/api/coin-options", {
    params: {
      searchStr: searchStr,
    },
  });

  return res.data;
};

export const getCurrencyExchangeOptions = async (): Promise<
  CurrencyExchangeOption[]
> => {
  return Promise.resolve(exampleCurrencies);
};

export const getCoinPriceUSDById = async (id: number): Promise<number> => {
  const res = await axios.get<CoinQuote>(`/api/coins/${id}`);
  const coinPrice = res.data.quote["USD"].price ?? 0.0;

  return coinPrice;
};
