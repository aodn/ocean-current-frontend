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
      className={`flex items-center justify-center gap-2 whitespace-nowrap border px-12 py-1 text-lg transition duration-300 ease-in-out ${buttonSize} ${buttonType} ${buttonBorderRadius} ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
