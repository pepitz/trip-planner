import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { FormControl, FormHelperText } from '@mui/material';

import { IDateSelectorProps } from 'types';
import * as CONSTANTS from 'constants/index';
import { addDays } from 'date-fns';

const DateSelector = ({ date, setDate, isDateValid }: IDateSelectorProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControl required variant="outlined" error={!isDateValid}>
        <DatePicker
          label="Date*"
          views={['day']}
          format="dd/MM/yyyy"
          disablePast
          minDate={addDays(new Date(), 1)}
          value={date}
          onChange={(newValue) => {
            newValue && setDate(newValue);
          }}
        />
        <FormHelperText>
          {!isDateValid ? CONSTANTS.MESSAGE_DATE : ''}
        </FormHelperText>
      </FormControl>
    </LocalizationProvider>
  );
};

export default DateSelector;
