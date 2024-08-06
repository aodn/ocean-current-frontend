import { useRef, useEffect } from 'react';
import { isArrayEqual } from '@/utils/compare-utils/compare';

const useArrayCompareEffect = <T>(callback: () => void, array: T[], orderMatters: boolean = true): void => {
  const previousArrayRef = useRef<T[] | undefined>(undefined);

  useEffect(() => {
    if (!isArrayEqual(previousArrayRef.current, array, orderMatters)) {
      callback();
    }
    previousArrayRef.current = array;
  });
};

export default useArrayCompareEffect;
