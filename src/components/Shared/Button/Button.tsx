import React from 'react';

import { PaddingSizes, ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({
  color,
  backgroundColor,
  borderRadius,
  borderColor,
  hasIcon = false,
  padding = PaddingSizes.None,
  textSize,
  icon,
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 ${borderColor} ${color} ${backgroundColor} ${borderRadius} ${textSize} ${padding}`}
    >
      {hasIcon && icon}
      {children}
    </button>
  );
};

export default Button;
