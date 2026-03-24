import React from 'react';
import { createPortal } from 'react-dom';
import { useBodyScrollLock } from '@/hooks';

interface OverlayProps {
  isOpen: boolean;
  children?: React.ReactNode;
  isRootLevel?: boolean; // Optional prop to determine if the overlay is at the root level
}

export function Overlay({ isOpen, children, isRootLevel = true }: OverlayProps) {
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  if (isRootLevel) {
    const rootElement = document.getElementById('root');
    if (!rootElement) return null;
    return createPortal(
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 font-poppins md:p-0">
        <div className="h-full w-full overflow-y-auto">{children}</div>
      </div>,
      rootElement,
    );
  }
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 font-poppins md:p-0">
      <div className="h-full w-full overflow-y-auto">{children}</div>
    </div>
  );
}
