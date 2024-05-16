import { RefObject, useEffect } from 'react';

const useOutsideClick = <T extends HTMLElement>(ref: RefObject<T>, onOutsideClick: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick, ref]);
};

export default useOutsideClick;
