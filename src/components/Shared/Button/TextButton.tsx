import React from 'react';

interface TextButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

const TextButton: React.FC<TextButtonProps> = ({
  onClick,
  children,
  className = '',
  disabled = false,
  'aria-label': ariaLabel,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={`hover:underline disabled:pointer-events-none disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

export default TextButton;
