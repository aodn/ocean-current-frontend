import React from 'react';

export enum BorderRadius {
  None = 'rounded-none',
  Small = 'rounded-sm',
  Medium = 'rounded-md',
  Large = 'rounded-lg',
}

export enum PaddingSizes {
  None = 'p-2',
  Small = 'p-4',
  Medium = 'p-6',
  Large = 'p-8',
}

interface ButtonProps {
  color: string;
  textSize?: string;
  borderColor: string;
  backgroundColor: string;
  borderRadius: BorderRadius;
  padding?: PaddingSizes;
  hasIcon?: boolean;
  icon?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

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
