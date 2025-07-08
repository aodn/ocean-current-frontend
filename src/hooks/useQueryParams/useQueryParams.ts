import { useNavigate, useSearchParams } from 'react-router';
import { UseQueryParamsResult, QueryParams } from './types/userQueryParams.types';

const useQueryParams = (): UseQueryParamsResult => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const getParams = (): QueryParams => {
    const params: QueryParams = {};
    searchParams.forEach((value, key) => {
      params[key as keyof QueryParams] = value;
    });
    return params;
  };

  const buildNewSearchParams = (params: Partial<QueryParams>, replace: boolean = false): URLSearchParams => {
    const newSearchParams = replace ? new URLSearchParams() : new URLSearchParams(searchParams.toString());

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

  const isSameUrlWithParams = (path: string, params: Partial<QueryParams> = {}, replace: boolean = false): boolean => {
    const currentPath = window.location.pathname;
    const currentSearchString = searchParams.toString();
    const newSearchString = buildNewSearchParams(params, replace).toString();

    return currentPath === path && currentSearchString === newSearchString;
  };

  const updateQueryParamsAndNavigate = (path: string, params: Partial<QueryParams> = {}, replace: boolean = false) => {
    if (!isSameUrlWithParams(path, params, replace)) {
      navigate({
        pathname: path,
        search: buildNewSearchParams(params, replace).toString(),
      });
    }
  };

  return {
    searchParams: getParams(),
    updateQueryParams,
    updateQueryParamsAndNavigate,
    isSameUrlWithParams,
  };
};

export default useQueryParams;
