import { useNavigate, useSearchParams } from 'react-router-dom';
import { UseQueryParamsResult, QueryParams } from './types/userQueryParams.types';

const useQueryParams = (): UseQueryParamsResult => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const getParams = (): QueryParams => {
    const params: QueryParams = {};
    searchParams.forEach((value, key) => {
      if (key in params) {
        params[key as keyof QueryParams] = value;
      }
    });
    return params;
  };

  const buildNewSearchParams = (params: Partial<QueryParams>): URLSearchParams => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        newSearchParams.set(key, value);
      } else if (value === null) {
        newSearchParams.delete(key);
      }
    });

    return newSearchParams;
  };

  const updateQueryParams = (params: Partial<QueryParams>) => {
    setSearchParams(buildNewSearchParams(params));
  };

  const updateQueryParamsAndNavigate = (path: string, params: Partial<QueryParams> = {}) => {
    navigate({ pathname: path, search: buildNewSearchParams(params).toString() });
  };

  return { searchParams: getParams(), updateQueryParams, updateQueryParamsAndNavigate };
};

export default useQueryParams;
