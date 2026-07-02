export enum ButtonType {
  primary = 'bg-imos-calypso-blue text-white border border-imos-calypso-blue enabled:active:opacity-80 md:enabled:hover:opacity-80',
  secondary = 'bg-transparent text-imos-calypso-blue shadow-sm border border-imos-calypso-blue/50 enabled:active:opacity-80 md:enabled:hover:opacity-80',
  tertiary = 'border-imos-dark-grey bg-transparent text-imos-dark-grey border enabled:active:bg-imos-dark-grey enabled:active:text-white md:enabled:hover:bg-imos-dark-grey md:enabled:hover:text-white',
}

export enum BorderRadius {
  extraSmall = 'rounded-md',
  small = 'rounded-lg',
  medium = 'rounded-xl',
  large = 'rounded-2xl',
  full = 'rounded-full',
}

export enum ButtonSize {
  auto = 'w-auto',
  full = 'w-full',
}

export interface ButtonProps {
  type?: keyof typeof ButtonType;
  borderRadius?: keyof typeof BorderRadius;
  size?: keyof typeof ButtonSize;
  dataTestId?: string;
  icon?: JSX.Element;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
}
