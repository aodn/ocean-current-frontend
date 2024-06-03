import React from 'react';
import CrossImage from '@/assets/icons/cross-icon.svg';
import { ImagePopupProps } from './types/ImagePopup.types';

const ImagePopup: React.FC<ImagePopupProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      aria-hidden
    >
      <div className="relative w-full max-w-screen-xl rounded-lg bg-white p-0.5">
        <img
          aria-hidden
          src={CrossImage}
          alt="Close"
          className="absolute right-2 top-2 h-10 w-10 cursor-pointer"
          onClick={onClose}
        />
        <img src={imageUrl} alt="Popup" className="h-auto w-full" />
      </div>
    </div>
  );
};

export default ImagePopup;
