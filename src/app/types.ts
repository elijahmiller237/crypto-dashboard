export type CoinOption = {
  id: number;
  rank: number;
  name: string;
  symbol: string;
  slug: string;
};

export type CurrencyExchangeOption = {
  name: string;
  rate: number;
};

export type CoinQuote = {
  id: number;
  name: string;
  symbol: string;
  quote: Record<string, { price: number }>;
};
