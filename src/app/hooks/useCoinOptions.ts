import { useCallback, useEffect, useState } from "react";
import { CoinOption } from "../types";
import axios from "axios";

export const useCoinOptions = (): {
  getMatchingCoinOptions: (searchStr: string) => Promise<CoinOption[]>;
} => {
  const [coinOptions, setCoinOptions] = useState<CoinOption[] | null>(null);

  const getMatchingCoinOptions = useCallback(
    async (searchStr: string): Promise<CoinOption[]> =>
      Promise.resolve(
        coinOptions?.filter((option) =>
          option.name.toLowerCase().startsWith(searchStr.toLowerCase())
        ) ?? []
      ),
    [coinOptions]
  );

  useEffect(() => {
    axios.get<CoinOption[]>("/api/coin-options").then((options) => {
      const seenNames = new Set<string>();
      const seenIds = new Set<number>();
      setCoinOptions(
        options.data.filter((option) => {
          if (seenIds.has(option.id) || seenNames.has(option.name))
            return false;
          seenIds.add(option.id);
          seenNames.add(option.name);

          return true;
        })
      );
    });
  }, []);

  return { getMatchingCoinOptions };
};
