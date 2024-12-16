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
  className = '',
}) => {
  const buttonType = ButtonType[type];
  const buttonBorderRadius = BorderRadius[borderRadius];
  const buttonSize = ButtonSize[size];

  return (
    <button
      onClick={onClick}
      data-testid={dataTestId}
      disabled={disabled}
      className={`md:px-12 relative flex items-center justify-center whitespace-nowrap px-4 py-1 text-lg transition duration-300 ease-in-out ${buttonSize} ${buttonType} ${buttonBorderRadius} ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      } ${className}`}
    >
      {icon && <span className="absolute left-4 flex items-center">{icon}</span>}
      <span className="flex-grow text-center">{children}</span>
    </button>
  );
};

export default Button;
