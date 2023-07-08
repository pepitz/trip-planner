import { FieldError } from 'react-hook-form';

export const getHelperText = (msg: string, error?: FieldError | undefined) => {
  let result = msg;

  if (error && error.message) {
    result = error.message;
  }

  return result;
};
