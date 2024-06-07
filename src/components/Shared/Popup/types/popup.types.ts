export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  isImage?: boolean;
  title?: string;
  body?: () => JSX.Element;
}
