import React from 'react';
import { BorderRadius, ButtonType, ButtonProps, ButtonSize } from './types/Button.types';

const Button: React.FC<ButtonProps> = ({
  icon,
  dataTestId,
  onClick,
  children,
  type = 'primary',
  borderRadius = 'medium',
  size = 'auto',
  selected = false,
}) => {
  const buttonType = ButtonType[type];
  const buttonBorderRadius = BorderRadius[borderRadius];
  const buttonSize = ButtonSize[size];

  const border = selected ? 'border-imos-sea-blue' : '';

  return (
    <button
      onClick={onClick}
      data-testid={dataTestId}
      className={`flex items-center justify-center gap-2 whitespace-nowrap border px-12 py-1 text-lg transition duration-300 ease-in-out ${border} ${buttonSize} ${buttonType} ${buttonBorderRadius}`}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
