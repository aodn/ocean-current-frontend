import { useSearchParams } from 'react-router-dom';

const useProductSearchParam = () => {
  const [searchParams] = useSearchParams();

  const region = searchParams.get('region');
  const date = searchParams.get('date');

  return {
    region,
    date,
  };
};

export default useProductSearchParam;
