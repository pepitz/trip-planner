import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { IDateSelectorProps } from 'types';

const DateSelector = ({ date, setDate, setDateValid, minDate }: IDateSelectorProps) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date"
        views={['day']}
        format="dd/MM/yyyy"
        disablePast
        minDate={minDate}
        value={date}
        onAccept={() => setDateValid(true)}
        onChange={(newValue, context) => {
          if (newValue && context.validationError === null) {
            setDate(newValue);
          }
        }}
        onError={() => {
          setDateValid(false);
        }}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
