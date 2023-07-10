import { FieldError } from 'react-hook-form';
import * as CONSTANTS from 'constants/index';

export const getHelperText = (msg: string, error?: FieldError | undefined) => {
  let result = msg;

  if (error && error.message) {
    result = error.message;
  }

  return result;
};

export const getRequiredMessage = (name: string): string =>
  name === CONSTANTS.ORIGIN
    ? CONSTANTS.MESSAGE_NO_ORIGIN
    : CONSTANTS.MESSAGE_NO_DESTINATION;

export const isValid = (value: string | null) => {
  return Boolean(value);
};
