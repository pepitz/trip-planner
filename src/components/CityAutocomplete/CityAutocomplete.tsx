import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { getCities } from 'api/cities';

import {
  Box,
  Autocomplete,
  TextField,
  CircularProgress,
  AutocompleteInputChangeReason,
  IconButton,
} from '@mui/material';
import { getRequiredMessage } from 'utils/helpers';
import { ICityAutocompleteProps } from 'types';
import * as CONSTANTS from 'constants/index';
import CustomIcon from 'components/CustomIcon/CustomIcon';
import icons from 'enums/icons';

const CityAutocomplete = ({
  index,
  name,
  label,
  value,
  setValue,
  canBeDeleted,
  handleDelete,
  selectedCities,
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

  useEffect(() => {}, []);

  return (
    <Box className="travelCities__control">
      <Autocomplete
        sx={{ flex: 1 }}
        readOnly={isServerError}
        options={optionsCities}
        getOptionDisabled={(option) => {
          return selectedCities.includes(option);
        }}
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
      {canBeDeleted ? (
        <IconButton
          sx={{ marginTop: '-5vh' }}
          onClick={() => handleDelete(index)}
          disabled={false}
          disableRipple
        >
          <CustomIcon
            width={14}
            heigt={14}
            viewBox="0 0 14 14"
            icon={icons.delete}
          ></CustomIcon>
        </IconButton>
      ) : (
        <Box sx={{ width: '3rem' }}></Box>
      )}
    </Box>
  );
};

export default CityAutocomplete;
