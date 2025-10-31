import { useEffect } from 'react';

export function useBodyScrollLock(lock: boolean) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = lock ? 'hidden' : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [lock]);
}
