import React from 'react';
import { CheckBoxProps } from './types/Checkbox.types';

const CheckBox: React.FC<CheckBoxProps> = ({ onClick, isChecked }) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-5 w-5 items-center justify-center rounded-sm transition-all duration-300 ${isChecked ? 'bg-[#52BDEC] text-white' : 'transparent border border-imos-grey'}`}
    >
      {isChecked && (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
};

export default CheckBox;
