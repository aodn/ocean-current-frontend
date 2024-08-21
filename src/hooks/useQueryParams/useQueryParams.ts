import { useNavigate, useSearchParams } from 'react-router-dom';
import { UseQueryParamsResult } from './types/userQueryParams.types';

const useQueryParams = <
  T extends Record<string, string | null>,
  U extends T & Record<string, string | null> = T,
>(): UseQueryParamsResult<T, U> => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const getParams = (): T => {
    const params = {} as T;
    searchParams.forEach((value, key) => {
      (params[key as keyof T] as unknown) = value;
    });
    return params;
  };

  const buildNewSearchParams = (params: Partial<U>): URLSearchParams => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        newSearchParams.set(key, params[key] as string);
      }
      if (params[key] === null) {
        newSearchParams.delete(key);
      }
    }
    return newSearchParams;
  };

  const updateQueryParams = (params: Partial<U>) => {
    const newSearchParams = buildNewSearchParams(params);
    setSearchParams(newSearchParams);
  };

  const updateQueryParamsAndNavigate = (path: string, params: Partial<U> = {}) => {
    const newSearchParams = buildNewSearchParams(params);
    navigate({ pathname: path, search: newSearchParams.toString() });
  };

  return { searchParams: getParams(), updateQueryParams, updateQueryParamsAndNavigate };
};

export default useQueryParams;
