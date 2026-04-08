import React, { useRef } from 'react';
import crossImage from '@/assets/icons/cross-icon.svg';
import { useBodyScrollLock, useOutsideClick } from '@/hooks';

interface WidePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body?: () => JSX.Element;
}

const WidePopup: React.FC<WidePopupProps> = ({ title, body, isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useOutsideClick<HTMLDivElement>(popupRef, () => {
    return onClose();
  });

  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50" aria-hidden>
      <div className="mb-8 mt-28 w-full max-w-8xl px-4 md:mt-36">
        <div
          ref={popupRef}
          className="flex max-h-[calc(100vh-9rem)] w-full flex-col overflow-hidden rounded-lg bg-white shadow-layout-shadow md:max-h-[calc(100vh-11rem)]"
        >
          <div className="relative flex shrink-0 items-center justify-center bg-imos-cloud-tint/70 px-12 py-4">
            <h2 className="text-center font-poppins text-xl font-medium text-imos-deep-blue">{title}</h2>
            <img
              aria-hidden
              src={crossImage}
              alt="Close"
              className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer opacity-80"
              onClick={onClose}
            />
          </div>
          <div className="overflow-y-auto">{body && body()}</div>
        </div>
      </div>
    </div>
  );
};

export default WidePopup;
