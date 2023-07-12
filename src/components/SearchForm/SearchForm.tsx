import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import * as CONSTANTS from 'constants/index';
import { ICityAutocompleteProps } from 'types';

import TimeLine from 'components/TravelLine/TravelLine';
import CityAutocomplete from 'components/common/CityAutocomplete';
import AddDestinationButton from 'components/AddDestinationButton/AddDestinationButton';
import PassengersCounter from 'components/PassengersCounter/PassengersCounter';

import './SearchForm.scss';

const SearchForm = () => {
  const [cities, setCities] = useState<ICityAutocompleteProps[]>([]);
  const [numberPassengers, setNumberPassengers] = useState(0);
  const [isPassengersValid, setPassengersValid] = useState(true);

  const handleAddCity = () => {
    setCities((prevValue) => {
      let updatedCities = [...prevValue];
      const lastIndex = updatedCities.length - 1;

      updatedCities[lastIndex].name = `intermediate_${lastIndex}`;
      updatedCities[lastIndex].canBeDeleted = true;

      const newRecord = { ...updatedCities[lastIndex] };
      newRecord.index += 1;
      newRecord.name = CONSTANTS.DESTINATION;
      newRecord.value = '';

      updatedCities.push(newRecord);
      return updatedCities;
    });
  };

  const handleRemoveCity = (index: number) => {
    setCities((prevFields) => {
      let updated = [...prevFields];
      updated = updated.filter((city) => city.index !== index);
      updated.forEach((city, idx, arr) => {
        if (city.name !== CONSTANTS.ORIGIN) {
          if (city.index === updated.length - 1) {
            city.name = CONSTANTS.DESTINATION;
            city.canBeDeleted = true;
          }
          if (idx === 1 && arr.length === 2) {
            city.name = CONSTANTS.DESTINATION;
            city.canBeDeleted = false;
          }
          city.index = idx;
        }
      });
      return updated;
    });
  };

  const handleSubmit = () => console.log('paint data');

  useEffect(() => {
    const initialCities = [
      {
        index: 0,
        name: CONSTANTS.ORIGIN,
        label: CONSTANTS.CITY_ORIGIN,
        value: '',
        setValue: setCities,
        canBeDeleted: false,
        handleDelete: handleRemoveCity,
      },
      {
        index: 1,
        name: CONSTANTS.DESTINATION,
        label: CONSTANTS.CITY_DESTINATION,
        value: '',
        setValue: setCities,
        canBeDeleted: false,
        handleDelete: handleRemoveCity,
      },
    ];
    setCities(initialCities);
  }, []);

  useEffect(() => {
    console.log('cities: ', cities);
  }, [cities]);

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
            <Box className="datepicker">
              <label>Date</label>
              <input
                type="date"
                id="start"
                name="trip-start"
                min="2018-07-07"
                max=""
              />
            </Box>
          </Box>
        </Box>
      </form>
      <Box component="section" className="form--submit">
        <button id="submit-form-button" type="submit">
          Submit
        </button>
      </Box>
    </Box>
  );
};

export default SearchForm;
