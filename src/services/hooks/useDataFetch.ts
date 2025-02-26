import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { ApiArgs, FetchFunction } from './types/useDataFetch.types';

const useDataFetch = <T, Args extends ApiArgs>(fetchFn: FetchFunction<T, Args>, args: [...Args]) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchFn(...args);
        setData(response.data);
        setError(null);
      } catch (e) {
        const error = e as AxiosError;
        setError(new Error(error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFn, ...args]);

  return { data, loading, error };
};

export default useDataFetch;
