import { useState } from 'react';

const useDateSelector = () => {
  let tomorrow = new Date();
  const tomorrowTimestamp = tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow = new Date(tomorrowTimestamp);

  const [date, setDate] = useState(tomorrow);
  const [isDateValid, setDateValid] = useState(false);

  return {
    date,
    setDate,
    isDateValid,
    setDateValid,
  };
};

export default useDateSelector;
