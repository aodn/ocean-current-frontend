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

export interface ButtonProps {
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
