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
  'aria-label': ariaLabel,
}) => {
  const buttonType = ButtonType[type];
  const buttonBorderRadius = BorderRadius[borderRadius];
  const buttonSize = ButtonSize[size];

  return (
    <button
      onClick={onClick}
      data-testid={dataTestId}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`relative flex items-center justify-center px-4 py-1 text-lg whitespace-nowrap md:px-8 ${buttonSize} ${buttonType} ${buttonBorderRadius} ${
        disabled ? 'cursor-not-allowed opacity-50' : 'transition duration-300 ease-in-out'
      } ${className}`}
    >
      {icon && <span className="absolute left-4 flex items-center">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
