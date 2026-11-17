import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { ArrowIcon, GlidersIcon } from '@/components/Shared/Icons';
import { useOutsideClick } from '@/hooks';
import type { GliderYearmap } from '@/types/gliders';

type Platform = GliderYearmap['platform'];

const GliderTypeSelect = ({
  platforms,
  value,
  onChange,
}: {
  platforms: Platform[];
  value: Platform;
  onChange: (platform: Platform) => void;
}) => {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const canSelect = platforms.length > 1;
  const elements = platforms.map((id) => ({ id, label: id === 'sl' ? 'Slocum' : 'Seaglider' }));
  useOutsideClick(container, () => setOpen(false));

  useLayoutEffect(() => {
    const popup = menu.current;
    const trigger = button.current;
    if (!open || !popup || !trigger) return;

    const positionMenu = () => {
      const bounds = trigger.getBoundingClientRect();
      const width = Math.max(bounds.width, 152);
      popup.style.width = `${width}px`;
      popup.style.left = `${Math.max(0, Math.min(bounds.left, window.innerWidth - width))}px`;
      popup.style.top = `${bounds.bottom + 4}px`;
    };
    positionMenu();
    window.addEventListener('scroll', positionMenu, true);
    window.addEventListener('resize', positionMenu);
    return () => {
      window.removeEventListener('scroll', positionMenu, true);
      window.removeEventListener('resize', positionMenu);
    };
  }, [open]);

  const selectedIndex = platforms.indexOf(value);
  useEffect(() => {
    if (open) container.current?.querySelectorAll<HTMLElement>('[role="menuitemradio"]')[selectedIndex]?.focus();
  }, [open, selectedIndex]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape' || event.key === 'Tab') {
      setOpen(false);
      button.current?.focus();
    }
    if (canSelect && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const items = Array.from(container.current?.querySelectorAll<HTMLElement>('[role="menuitemradio"]') ?? []);
      const index = items.indexOf(document.activeElement as HTMLElement);
      const next =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? items.length - 1
            : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[next]?.focus();
    }
  };

  return (
    <div ref={container} className="h-11">
      <button
        onKeyDown={handleKeyDown}
        ref={button}
        type="button"
        aria-label="Glider type"
        aria-describedby={`${menuId}-value`}
        aria-haspopup={canSelect ? 'menu' : undefined}
        aria-expanded={canSelect ? open : undefined}
        aria-controls={open ? menuId : undefined}
        disabled={!canSelect}
        onClick={() => setOpen(!open)}
        className="border-imos-calypso-blue/50 focus-visible:ring-imos-calypso-blue/50 flex h-full w-full items-center gap-2 rounded-md border bg-white px-3 text-base focus-visible:ring-2 focus-visible:outline-none enabled:cursor-pointer md:border-none"
      >
        <GlidersIcon size="lg" color="imos-deep-blue" aria-hidden="true" className="shrink-0" />
        <span id={`${menuId}-value`} className="flex-1 text-left">
          {elements.find(({ id }) => id === value)?.label}
        </span>
        {canSelect && (
          <ArrowIcon size="xs" color="imos-deep-blue" aria-hidden="true" className={open ? 'rotate-180' : ''} />
        )}
      </button>
      {open && canSelect && (
        <div
          id={menuId}
          ref={menu}
          role="menu"
          tabIndex={-1}
          aria-label="Glider type"
          onKeyDown={handleKeyDown}
          className="shadow-menu border-imos-calypso-blue/20 fixed inset-auto z-40 m-0 flex-col gap-1 overflow-hidden rounded-lg border bg-white p-1 open:flex"
        >
          {elements.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="menuitemradio"
              aria-checked={id === value}
              tabIndex={-1}
              onClick={() => {
                setOpen(false);
                onChange(id);
                button.current?.focus();
              }}
              className={`flex w-full cursor-pointer items-center rounded p-3 text-left text-base focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${id === value ? 'bg-imos-deep-blue text-white' : 'text-imos-dark-grey hover:bg-imos-hover-blue/20'}`}
            >
              <GlidersIcon
                className="mr-4 shrink-0"
                size="xl"
                color={id === value ? 'imos-white' : 'imos-grey'}
                aria-hidden="true"
              />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GliderTypeSelect;
