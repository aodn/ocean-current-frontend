import React, { useRef } from 'react';
import crossImage from '@/assets/icons/cross-icon.svg';
import { useOutsideClick } from '@/hooks';
import { PopupProps } from './types/popup.types';

const Popup: React.FC<PopupProps> = ({ title, children, isOpen, onClose, imageUrl, isImage = false }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useOutsideClick<HTMLDivElement>(popupRef, () => {
    return onClose();
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" aria-hidden>
      <div
        ref={popupRef}
        className={`${isImage ? 'max-w-screen-xl' : 'max-w-screen-md'} relative max-h-full w-full overflow-auto rounded-lg bg-white p-0.5`}
      >
        <img
          aria-hidden
          src={crossImage}
          alt="Close"
          className="absolute right-1 top-1 h-10 w-10 cursor-pointer"
          onClick={onClose}
        />
        {!isImage && (
          <div>
            <h2 className="border-b-2 border-imos-grey py-4 text-center text-xl font-bold">{title}</h2>
            <div className="p-4">{children}</div>
          </div>
        )}
        {isImage && <img src={imageUrl} alt="Popup" className="h-auto w-full" />}
      </div>
    </div>
  );
};

export default Popup;
