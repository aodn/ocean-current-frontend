export enum ButtonType {
  primary = 'bg-[#3A6F8F] text-white border-2 border-[#3A6F8F] hover:opacity-80',
  secondary = 'bg-transparent text-[#3A6F8F] shadow border-2 border-[#3a6f8f80] hover:opacity-80',
  tertiary = 'border-imos-dark-grey bg-transparent text-imos-dark-grey border hover:bg-imos-dark-grey hover:text-white',
}

export enum BorderRadius {
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
  type: keyof typeof ButtonType;
  borderRadius?: keyof typeof BorderRadius;
  size?: keyof typeof ButtonSize;
  dataTestId?: string;
  icon?: JSX.Element;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: React.ReactNode;
}
