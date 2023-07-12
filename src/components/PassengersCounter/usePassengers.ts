import { useEffect } from 'react';

import * as CONSTANTS from 'constants/index';
import { IPassengersProps, TUsePassengersCounter } from 'types';

const usePassengers = ({
  numberPassengers,
  setNumberPassengers,
  isPassengersValid,
  setPassengersValid,
  setErrorMsgPassengers,
  maxCount,
  minCount,
}: IPassengersProps & {
  setErrorMsgPassengers: React.Dispatch<React.SetStateAction<string>>;
  maxCount: number;
  minCount: number;
}): TUsePassengersCounter => {
  const handlePassengersValidation = (
    setPassengersValid: React.Dispatch<React.SetStateAction<boolean>>,
    passengersCount: number
  ): void => {
    if (passengersCount === 0) {
      setPassengersValid(false);
    } else {
      setPassengersValid(true);
    }
  };

  const handleDecrement = () => {
    let updatedCount = numberPassengers - 1;

    if (updatedCount >= minCount) {
      setNumberPassengers(updatedCount);
    }

    if (updatedCount === minCount) {
      setPassengersValid(false);
    }

    if (updatedCount > minCount) {
      setPassengersValid(true);
    }
  };

  const handleIncrement = () => {
    let updatedCount = numberPassengers + 1;
    if (!maxCount || updatedCount <= maxCount) {
      setNumberPassengers(updatedCount);
    }

    if (updatedCount <= maxCount) {
      setPassengersValid(true);
    }
  };

  useEffect(() => {
    if (isPassengersValid) {
      setErrorMsgPassengers('');
    } else {
      setErrorMsgPassengers(CONSTANTS.MESSAGE_NO_PASSENGERS_SELECTED);
    }
  }, [numberPassengers, isPassengersValid, setErrorMsgPassengers]);

  return {
    handleDecrement,
    handleIncrement,
    handlePassengersValidation,
  };
};

export default usePassengers;
