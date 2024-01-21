import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { CurrencyExchangeOption } from "../types";
import { useCurrencyExchangeOptions } from "../hooks/useCurrencyExchangeOptions";
import { useMemo } from "react";

type CurrencySelectorProps = {
  value: CurrencyExchangeOption;
  onChange: (val: CurrencyExchangeOption) => void;
};

const CurrencySelector = ({ value, onChange }: CurrencySelectorProps) => {
  const { getOptionByName, optionsList } = useCurrencyExchangeOptions();

  const menuOptions = useMemo(
    () =>
      optionsList.map((option, idx) => (
        <MenuItem key={idx} value={option.name}>
          {option.name}
        </MenuItem>
      )),
    [optionsList]
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="currency-selector-label">Select Currency</InputLabel>
      <Select
        label="Select Currency"
        labelId="currency-selector-label"
        id="currency-select"
        value={value.name}
        onChange={(e) =>
          onChange(getOptionByName(e.target.value) ?? { name: "", rate: 0 })
        }
      >
        {menuOptions}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
