import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import CustomIcon from 'components/CustomIcon/CustomIcon';

import icons from 'enums/icons';
import * as CONSTANTS from 'constants/index';

import { IPassengersProps } from 'types';
import usePassengers from './usePassengers';

const PassengersCounter = ({
  numberPassengers,
  setNumberPassengers,
  isPassengersValid,
  setPassengersValid,
}: IPassengersProps) => {
  const maxCount = 10;
  const minCount = 0;
  const [errorMsgPassengers, setErrorMsgPassengers] = useState('');

  const { handleDecrement, handleIncrement, handlePassengersValidation } =
    usePassengers({
      numberPassengers,
      setNumberPassengers,
      isPassengersValid,
      setPassengersValid,
      setErrorMsgPassengers,
      maxCount,
      minCount,
    });

  return (
    <Box component="section" className="passengers-box">
      <FormControl
        sx={{ m: 1, width: 'auto' }}
        variant="outlined"
        error={isPassengersValid === false}
      >
        <InputLabel htmlFor="passengers">{CONSTANTS.PASSENGERS}</InputLabel>
        <OutlinedInput
          id="passengers"
          type="number"
          value={numberPassengers}
          onBlur={() =>
            handlePassengersValidation(setPassengersValid, numberPassengers)
          }
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                onClick={handleDecrement}
                edge="end"
                disabled={numberPassengers === minCount}
              >
                <CustomIcon
                  width={22}
                  heigt={22}
                  viewBox="0 0 22 22"
                  icon={icons.minus_squared}
                ></CustomIcon>
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleIncrement}
                edge="end"
                disabled={numberPassengers === maxCount}
              >
                <CustomIcon
                  width={22}
                  heigt={22}
                  viewBox="0 0 22 22"
                  icon={icons.plus_squared}
                ></CustomIcon>
              </IconButton>
            </InputAdornment>
          }
          label="Passengers"
        />
        <FormHelperText>{errorMsgPassengers}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default PassengersCounter;
