import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';

import TimeLine from 'components/TravelLine/TravelLine';
import CustomIcon from 'components/CustomIcon/CustomIcon';

import icons from 'enums/icons';
import * as CONSTANTS from 'constants/index';

import './SearchForm.scss';
import CityAutocomplete from 'components/common/CityAutocomplete';
import { ICityAutocompleteProps } from 'types';

const SearchForm = () => {
  const [cities, setCities] = useState<ICityAutocompleteProps[]>([]);

  const handleAddCity = () => {
    setCities((prevValue) => {
      const nextIndex = prevValue.length - 1;
      let updatedCitites = [...prevValue];

      let newCity = { ...updatedCitites[nextIndex] };
      newCity.index = nextIndex;
      newCity.name = `intermediate_${nextIndex}`;
      newCity.value = newCity.value ?? '';

      let final = updatedCitites.slice(0, updatedCitites.length - 1);
      final.push(newCity);

      let lastElementUpdate = { ...updatedCitites[updatedCitites.length - 1] };
      lastElementUpdate.index = final.length;
      lastElementUpdate.value = '';

      final.push(lastElementUpdate);
      return final;
    });
  };

  const handleRemoveCity = (index: number) => {
    // TO DO
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
        canBeDeleted: true,
        handleDelete: handleRemoveCity,
      },
    ];
    setCities(initialCities);
  }, []);

  useEffect(() => {
    if (cities.length > 1) {
      console.log('cities: ', cities);
    }
  }, [cities]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '40vh',
        width: '55vw',
        padding: '3rem 8rem',
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
                <TimeLine />
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
                          <Box className="travelCities__control" key={index}>
                            <CityAutocomplete
                              index={index}
                              name={name}
                              label={label}
                              value={value}
                              setValue={setValue}
                              canBeDeleted={canBeDeleted}
                              handleDelete={handleDelete}
                            />
                          </Box>
                        );
                      }
                    )
                  : null}
              </Box>
            </Box>

            <Box component="section" className="path__container--add-city">
              <IconButton onClick={handleAddCity}>
                <CustomIcon fill="transparent" icon={icons.plus_outlined} />
              </IconButton>
              <span>Add Destination</span>
            </Box>
          </Box>

          <Box component="section" className="passengers__container">
            <Box className="passengers">
              <Box component="h3" className="passengers-title">
                Passengers
              </Box>
              <Box component="section" className="passengers-box">
                <IconButton>
                  <CustomIcon
                    width={22}
                    heigt={22}
                    viewBox="0 0 22 22"
                    icon={icons.minus_squared}
                  ></CustomIcon>
                </IconButton>
                <input type="text" />
                <IconButton>
                  <CustomIcon
                    width={22}
                    heigt={22}
                    viewBox="0 0 22 22"
                    icon={icons.plus_squared}
                  ></CustomIcon>
                </IconButton>
              </Box>
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

        <Box component="section" className="form--submit">
          <button type="submit">Submit</button>
        </Box>
      </form>
    </Box>
  );
};

export default SearchForm;
