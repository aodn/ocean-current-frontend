export enum ButtonType {
  primary = 'bg-imos-black text-white',
  secondary = 'bg-[#F9F9F9] text-[#3A6F8F] shadow',
  tertiary = 'border-imos-black bg-transparent text-imos-black border hover:bg-imos-black hover:text-white',
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
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  selected?: boolean;
}
