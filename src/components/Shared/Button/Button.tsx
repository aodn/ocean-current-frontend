import React from 'react';

import { BorderRadius, ButtonType, ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({
  hasIcon = false,
  icon,
  onClick,
  children,
  type = 'primary',
  borderRadius = 'medium',
}) => {
  const buttonType = ButtonType[type];
  const buttonBorderRadius = BorderRadius[borderRadius];

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-12 text-lg transition duration-300 ease-in-out ${buttonType} ${buttonBorderRadius}`}
    >
      {hasIcon && icon}
      {children}
    </button>
  );
};

export default Button;
