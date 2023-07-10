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
