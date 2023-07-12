export type TSearchForm = {
  origin: string;
  destination: string;
  date: Date;
  numberOfPassengers: number;
};

export interface ICityAutocompleteProps {
  index: number;
  name: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<ICityAutocompleteProps[]>>;
  canBeDeleted: boolean;
  handleDelete: (index: number) => void;
}

export interface IPassengersProps {
  numberPassengers: number;
  setNumberPassengers: React.Dispatch<React.SetStateAction<number>>;
  isPassengersValid: boolean;
  setPassengersValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TUsePassengersCounter = {
  handleDecrement: () => void;
  handleIncrement: () => void;
  handlePassengersValidation: (
    setPassengersValid: React.Dispatch<React.SetStateAction<boolean>>,
    numberPassengers: number
  ) => void;
};
