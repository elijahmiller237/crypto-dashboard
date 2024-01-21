import { useCallback, useEffect, useState } from "react";
import { CurrencyExchangeOption } from "../types";
import { getCurrencyExchangeOptions } from "../helpers";

export const useCurrencyExchangeOptions = (): {
  getOptionByName: (name: string) => CurrencyExchangeOption | null;
  optionsList: CurrencyExchangeOption[];
} => {
  const [optionsList, setOptionsList] = useState<CurrencyExchangeOption[]>([]);

  const getOptionByName = useCallback(
    (name: string): CurrencyExchangeOption | null =>
      optionsList.find((option) => option.name === name) ?? null,
    [optionsList]
  );

  useEffect(() => {
    getCurrencyExchangeOptions().then((options) => setOptionsList(options));
  }, []);

  return { getOptionByName, optionsList };
};
