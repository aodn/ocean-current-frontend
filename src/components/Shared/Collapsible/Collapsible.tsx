import { ReactNode } from 'react';
import { useToggle } from '@/hooks';

export type TriggerArgs = {
  toggle: () => void;
  open: boolean;
  direction: 'up' | 'down';
  toggleIconHidden: boolean;
  label?: ReactNode;
};

export type CollapsibleComponentProps = {
  maxHeight?: number;
  trigger: (props: TriggerArgs) => ReactNode;
  children: ReactNode;
  wrapperClassName?: string;
  direction?: 'down' | 'up';
  /** Uncontrolled mode: initial open state (default: false) */
  defaultOpen?: boolean;
  /** Controlled mode: current open state. When provided, component is controlled */
  open?: boolean;
  /** Controlled mode: callback when open state should change */
  onOpenChange?: (open: boolean) => void;
  disable?: boolean;
  toggleIconHidden?: boolean;
  isWidthFiexed?: boolean;
};

export const CollapsibleComponent = ({
  maxHeight = 800,
  trigger,
  children,
  wrapperClassName = '',
  direction = 'down',
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  disable = false,
  toggleIconHidden = false,
  isWidthFiexed = false,
}: CollapsibleComponentProps) => {
  const isUpward = direction === 'up';
  const { open: internalOpen, toggle: internalToggle } = useToggle(defaultOpen);

  // Use controlled state if provided, otherwise use internal state
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const toggle = () => {
    if (isControlled) {
      // In controlled mode, call the callback
      onOpenChange?.(!open);
    } else {
      // In uncontrolled mode, use internal toggle
      internalToggle();
    }
  };

  return (
    <div
      className={`overflow-hidden transition-all duration-100 ease-in-out ${wrapperClassName} ${open && !isWidthFiexed ? 'w-fit' : ''}`.trim()}
    >
      {isUpward && (
        <div
          className="overflow-hidden transition-all duration-100 ease-in-out"
          style={{ maxHeight: open ? `${maxHeight}px` : 0, transform: open ? 'translateY(0)' : 'translateY(100%)' }}
          data-state={open ? 'open' : 'closed'}
        >
          <div>{children}</div>
        </div>
      )}

      <div>{trigger({ toggle: disable ? () => {} : toggle, open, direction, toggleIconHidden })}</div>

      {!isUpward && (
        <div
          className="overflow-hidden transition-all duration-100 ease-in-out"
          style={{ maxHeight: open ? `${maxHeight}px` : 0 }}
          data-state={open ? 'open' : 'closed'}
        >
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};
