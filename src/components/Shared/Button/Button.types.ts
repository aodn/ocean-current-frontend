export enum ButtonType {
  primary = 'bg-imos-black text-white',
  secondary = 'border-imos-black bg-transparent text-imos-gre',
  tertiary = 'border-imos-black bg-transparent text-imos-black border hover:bg-imos-black hover:text-white',
}

export enum BorderRadius {
  small = 'rounded-lg',
  medium = 'rounded-xl',
  large = 'rounded-2xl',
  full = 'rounded-full',
}

export interface ButtonProps {
  type: keyof typeof ButtonType;
  borderRadius?: keyof typeof BorderRadius;
  hasIcon?: boolean;
  icon?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}
