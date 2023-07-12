import { useEffect, useState } from 'react';

const useDateSelector = () => {
  const [date, setDate] = useState(new Date());
  const [isDateValid, setDateValid] = useState(false);

  useEffect(() => {
    const selectedTimestamp = date.getTime();
    const today = Date.now();

    if (selectedTimestamp > today) {
      setDateValid(true);
    } else {
      setDateValid(false);
    }
  }, [date]);

  return {
    date,
    setDate,
    isDateValid,
    setDateValid,
  };
};

export default useDateSelector;
