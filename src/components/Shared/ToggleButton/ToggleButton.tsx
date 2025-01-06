import React, { useState, useEffect } from 'react';
import { ToggleButtonProps } from './types/toggleButtonProps.types';

const ToggleButton: React.FC<ToggleButtonProps> = ({ isOn = false, onToggle, disabled = false }) => {
  const [isToggled, setIsToggled] = useState(isOn);

  useEffect(() => {
    setIsToggled(isOn);
  }, [isOn]);

  const handleToggle = () => {
    if (!disabled) {
      const newState = !isToggled;
      setIsToggled(newState);
      onToggle(newState);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      className={`flex h-6 w-16 items-center rounded-full p-1 ${
        isToggled ? 'bg-imos-sea-blue' : 'bg-gray-300'
      } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <div
        className={`h-4 w-4 transform rounded-full bg-white shadow-md duration-300 ease-in-out ${
          isToggled ? 'translate-x-10' : ''
        }`}
      ></div>
    </button>
  );
};

export default ToggleButton;
