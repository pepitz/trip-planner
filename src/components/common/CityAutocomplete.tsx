import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { getCities } from 'api/cities';

import {
  Box,
  Autocomplete,
  TextField,
  CircularProgress,
  AutocompleteInputChangeReason,
} from '@mui/material';
import { getRequiredMessage } from 'utils/helpers';
import { ICityAutocompleteProps } from 'types';
import * as CONSTANTS from 'constants/index';

const CityAutocomplete = ({
  index,
  name,
  label,
  value,
  setValue,
  canBeDeleted,
  handleDelete,
}: ICityAutocompleteProps) => {
  const [optionsCities, setOptionsCitites] = useState<string[]>([]);

  const [isLoadingOptions, setLoadingOptions] = useState(false);
  const [errorMessage, setErrMessage] = useState('');
  const [isValid, setValid] = useState(true);
  const [isServerError, setServerError] = useState(false);

  const inputOptionsHandler = debounce(
    async (query: string, reason: AutocompleteInputChangeReason) => {
      if (reason === 'clear' || reason === 'reset') {
        setOptionsCitites([]);
        return;
      }
      if (query.length < 2) {
        setOptionsCitites([]);
        return;
      }

      setLoadingOptions(true);
      try {
        const result = await getCities(query);
        setOptionsCitites(result);
      } catch (error: any) {
        setServerError(true);
      } finally {
        setLoadingOptions(false);
      }
    },
    500
  );

  useEffect(() => {
    isValid ? setErrMessage('') : setErrMessage(getRequiredMessage(name));
  }, [isValid, name]);

  useEffect(() => {
    isServerError ? setErrMessage(CONSTANTS.MESSAGE_FAIL) : setErrMessage('');
  }, [isServerError]);

  return (
    <Box className="travelCities__control">
      <Autocomplete
        readOnly={isServerError}
        options={optionsCities}
        loading={isLoadingOptions}
        onBlur={() => {
          if (isServerError) {
            setServerError(false);
            setValid(true);
          }
        }}
        onChange={(event, value, reason) => {
          if (Boolean(value)) {
            setValid(true);
          }

          if (!Boolean(value)) {
            setValid(false);
          }
          setValue((prevState) => {
            let updatedCities = [...prevState];
            updatedCities[index].value = value ?? '';
            return updatedCities;
          });
        }}
        onInputChange={async (_, value, reason) => {
          return await inputOptionsHandler(value, reason);
        }}
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            required
            name={name}
            value={value}
            label={label}
            error={isValid === false || isServerError}
            helperText={errorMessage}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoadingOptions ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default CityAutocomplete;
