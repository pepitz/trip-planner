import { useSearchParams } from 'react-router-dom';

const useCustomSearchParams = (): [
  { [k: string]: string },
  URLSearchParams
] => {
  const [searchParams] = useSearchParams();
  const searchAsObject = Object.fromEntries(new URLSearchParams(searchParams));

  return [searchAsObject, searchParams];
};

export default useCustomSearchParams;
