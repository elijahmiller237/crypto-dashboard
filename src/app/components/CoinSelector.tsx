import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { CoinOption } from "../types";
import _ from "lodash";
import { useCoinOptions } from "../hooks/useCoinOptions";

type CoinSelectorProps = {
  value: CoinOption | null;
  onChange: (val: CoinOption | null) => void;
};

const CoinSelector = ({ value, onChange }: CoinSelectorProps) => {
  const [options, setOptions] = useState<CoinOption[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { getMatchingCoinOptions } = useCoinOptions();

  const handleInputChange = _.debounce(
    (val: string) => setInputValue(val),
    500
  );

  useEffect(() => {
    setIsLoading(true);
    setOptions([]);
    getMatchingCoinOptions(inputValue)
      .then((coinOptions) => {
        setOptions(coinOptions);
      })
      .finally(() => setIsLoading(false));
  }, [inputValue, getMatchingCoinOptions]);

  return (
    <Autocomplete
      includeInputInList
      filterSelectedOptions
      autoComplete
      filterOptions={(x) => x}
      options={options}
      getOptionLabel={(option) => `${option.name} (${option.symbol})`}
      value={value}
      loading={isLoading}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select a coin"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      onInputChange={(event, newInputValue) => {
        handleInputChange(newInputValue);
      }}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      renderOption={(props, option) => {
        return (
          <li key={option.id} {..._.omit(props, "key")}>
            {`${option.name} (${option.symbol})`}
          </li>
        );
      }}
      isOptionEqualToValue={(option, val) => option.id === val.id}
    />
  );
};

export default CoinSelector;
