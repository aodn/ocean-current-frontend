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
      className={`flex h-8 w-16 cursor-pointer items-center rounded-full p-1 ${
        isToggled ? 'bg-imos-sea-blue' : 'bg-gray-300'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      <div
        className={`h-6 w-6 transform rounded-full bg-white shadow-md duration-300 ease-in-out ${
          isToggled ? 'translate-x-8' : ''
        }`}
      ></div>
    </button>
  );
};

export default ToggleButton;
