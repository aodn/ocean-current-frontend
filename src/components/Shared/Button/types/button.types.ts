export enum ButtonType {
  primary = 'bg-imos-calypso-blue text-white border border-imos-calypso-blue active:opacity-80 md:hover:opacity-80',
  secondary = 'bg-transparent text-imos-calypso-blue shadow-sm border border-imos-calypso-blue/50 active:opacity-80 md:hover:opacity-80',
  tertiary = 'border-imos-dark-grey bg-transparent text-imos-dark-grey border active:bg-imos-dark-grey active:text-white md:hover:bg-imos-dark-grey md:hover:text-white',
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
