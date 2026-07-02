import React, { useRef } from 'react';
import { CrossIcon } from '@/components/Shared/Icons';
import { useBodyScrollLock, useOutsideClick } from '@/hooks';

interface WidePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
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
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="max-w-8xl mt-20 w-full px-4 md:mt-22 lg:mt-24">
        <div
          ref={popupRef}
          className="shadow-layout-shadow flex max-h-[calc(100vh-13rem)] w-full flex-col overflow-hidden rounded-lg bg-white md:max-h-[calc(100vh-10rem)]"
        >
          <div className="bg-imos-cloud-tint/70 relative flex shrink-0 items-center justify-center px-12 py-4">
            <h2 className="font-poppins text-imos-deep-blue text-center text-xl font-medium">{title}</h2>
            <button
              type="button"
              aria-label="Close"
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer border-none bg-transparent p-0 opacity-80"
              onClick={onClose}
            >
              <CrossIcon aria-hidden color="imos-black" size="xl" />
            </button>
          </div>
          <div className="overflow-y-auto" data-testid="wide-popup-body">
            {body && body()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidePopup;
