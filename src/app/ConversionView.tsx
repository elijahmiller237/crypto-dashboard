"use client";

import { useEffect, useMemo, useState } from "react";
import { CoinOption, CurrencyExchangeOption } from "./types";
import CoinSelector from "./components/CoinSelector";
import CurrencySelector from "./components/CurrencySelector";
import { getCoinPriceUSDById } from "./helpers";
import { OutlinedInput } from "@mui/material";
import _ from "lodash";

const ConversionView = () => {
  const [selectedCoin, setSelectedCoin] = useState<CoinOption | null>(null);
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyExchangeOption>({
      name: "US Dollar",
      rate: 1.0,
    });
  const [calculatedExchangeRate, setCalculatedExchangeRate] = useState(0.0);
  const [numCoins, setNumCoins] = useState(1.0);

  const handleNumCoinsChange = _.debounce(
    (val: number) => setNumCoins(val),
    400
  );

  useEffect(() => {
    if (selectedCoin == null) setCalculatedExchangeRate(0.0);
    else {
      getCoinPriceUSDById(selectedCoin.id).then((price) => {
        setCalculatedExchangeRate(price * selectedCurrency.rate);
      });
    }
  }, [selectedCoin, selectedCurrency]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        gap: "40px",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <OutlinedInput
          type="number"
          defaultValue={numCoins}
          inputProps={{ min: 0 }}
          onChange={(event) => handleNumCoinsChange(Number(event.target.value))}
        />
        <CoinSelector value={selectedCoin} onChange={setSelectedCoin} />
        <CurrencySelector
          value={selectedCurrency}
          onChange={setSelectedCurrency}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            fontWeight: "500",
          }}
        >
          {`${(calculatedExchangeRate * numCoins).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        </div>
        <div
          style={{ fontSize: "24px", color: "70757A", fontWeight: "400" }}
        >{`${selectedCurrency.name}s`}</div>
      </div>
    </div>
  );
};

export default ConversionView;
