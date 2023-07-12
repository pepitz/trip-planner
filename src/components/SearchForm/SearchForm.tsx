import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';

import TimeLine from 'components/TravelLine/TravelLine';
import CityAutocomplete from 'components/CityAutocomplete/CityAutocomplete';
import useCityAutocomplete from 'components/CityAutocomplete/useCityAutocomplete';

import AddDestinationButton from 'components/AddDestinationButton/AddDestinationButton';
import PassengersCounter from 'components/PassengersCounter/PassengersCounter';

import DateSelector from 'components/DateSelector/DateSelector';
import useDateSelector from 'components/DateSelector/useDateSelector';
import './SearchForm.scss';

const SearchForm = () => {
  const { cities, handleAddCity, hasValidCities } = useCityAutocomplete();
  const [numberPassengers, setNumberPassengers] = useState(0);
  const [isPassengersValid, setPassengersValid] = useState(true);
  const { date, setDate, isDateValid } = useDateSelector();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = () => console.log('paint data');

  useEffect(() => {
    if (hasValidCities && isPassengersValid && isDateValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [hasValidCities, isPassengersValid, isDateValid]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        width: '55vw',
        padding: '4rem 8rem',
        border: '1px solid transparent',
        borderRadius: '1.6rem',
        boxShadow: (theme) => `1px 4px 10px ${theme.others.gray}`,
        background: (theme) => theme.others.white,
      }}
    >
      <form onSubmit={handleSubmit} className="form">
        <Box component="section" className="form--fields">
          <Box component="section" className="path__container">
            <Box component="article" className="path__container--cities">
              <Box component="aside" className="timeline">
                <TimeLine stops={cities} />
              </Box>
              <Box component="article" className="travelCities">
                {cities.length > 0
                  ? cities.map(
                      ({
                        index,
                        name,
                        label,
                        value,
                        setValue,
                        canBeDeleted,
                        handleDelete,
                      }) => {
                        return (
                          <CityAutocomplete
                            key={index}
                            index={index}
                            name={name}
                            label={label}
                            value={value}
                            setValue={setValue}
                            canBeDeleted={canBeDeleted}
                            handleDelete={handleDelete}
                          />
                        );
                      }
                    )
                  : null}
              </Box>
            </Box>

            <AddDestinationButton handleAddCity={handleAddCity} />
          </Box>

          <Box component="section" className="passengers__container">
            <Box className="passengers">
              <PassengersCounter
                numberPassengers={numberPassengers}
                setNumberPassengers={setNumberPassengers}
                setPassengersValid={setPassengersValid}
                isPassengersValid={isPassengersValid}
              />
            </Box>
          </Box>
          <Box className="datepicker">
            <DateSelector
              date={date}
              setDate={setDate}
              isDateValid={isDateValid}
            />
          </Box>
        </Box>
      </form>
      <Box component="section" className="form--submit">
        <Button id="submit-form-button" type="submit" disabled={!isFormValid}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default SearchForm;
