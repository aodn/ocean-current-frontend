import React from 'react';
import { createPortal } from 'react-dom';
import { useBodyScrollLock } from '@/hooks';

interface OverlayProps {
  isOpen: boolean;
  children?: React.ReactNode;
}

export function Overlay({ isOpen, children }: OverlayProps) {
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const rootElement = document.getElementById('root');
  if (!rootElement) return null;

  return createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 font-poppins md:p-0">
      <div className="h-full w-full overflow-y-auto">{children}</div>
    </div>,
    rootElement,
  );
}
