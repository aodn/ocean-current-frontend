export enum ButtonType {
  primary = 'bg-[#3A6F8F] text-white border-2  border-[#3A6F8F] hover:opacity-80',
  secondary = 'bg-transparent text-[#3A6F8F] shadow border-2 border-[#3a6f8f80] hover:opacity-80',
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
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}
