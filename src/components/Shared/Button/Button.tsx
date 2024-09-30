import React from 'react';
import { BorderRadius, ButtonType, ButtonProps, ButtonSize } from './types/button.types';

const Button: React.FC<ButtonProps> = ({
  icon,
  dataTestId,
  onClick,
  children,
  type = 'primary',
  borderRadius = 'medium',
  size = 'auto',
  disabled = false,
}) => {
  const buttonType = ButtonType[type];
  const buttonBorderRadius = BorderRadius[borderRadius];
  const buttonSize = ButtonSize[size];

  return (
    <button
      onClick={onClick}
      data-testid={dataTestId}
      disabled={disabled}
      className={`relative flex items-center justify-center whitespace-nowrap border px-4 py-1 text-lg transition duration-300 ease-in-out md:px-12 ${buttonSize} ${buttonType} ${buttonBorderRadius} ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      {icon && <span className="absolute left-4 flex items-center">{icon}</span>}
      <span className="flex-grow text-center">{children}</span>
    </button>
  );
};

export default Button;
