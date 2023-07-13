import { useEffect, useState } from 'react';

import { ICityAutocompleteProps } from 'types';
import * as CONSTANTS from 'constants/index';

const useCityAutocomplete = () => {
  const [cities, setCities] = useState<ICityAutocompleteProps[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [hasValidCities, setHasValidCities] = useState(false);

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
        selectedCities: [] as string[],
      },
      {
        index: 1,
        name: CONSTANTS.DESTINATION,
        label: CONSTANTS.CITY_DESTINATION,
        value: '',
        setValue: setCities,
        canBeDeleted: false,
        handleDelete: handleRemoveCity,
        selectedCities: [] as string[],
      },
    ];
    setCities(initialCities);
  }, []);

  useEffect(() => {
    const formCityValues = cities.map((field) => {
      return { id: { name: field.name, value: field.value } };
    });
    const everyCityHasValue = formCityValues.every((field) =>
      Boolean(field.id.value)
    );
    if (everyCityHasValue) {
      setHasValidCities(true);
    } else {
      setHasValidCities(false);
    }

    if (cities.length > 0) {
      const filteredValues = formCityValues
        .filter((field) => Boolean(field.id.value))
        .map((city) => city.id.value);
      setSelectedCities(filteredValues);
    }
  }, [cities]);

  return {
    cities,
    handleAddCity,
    hasValidCities,
    selectedCities,
  };
};

export default useCityAutocomplete;
