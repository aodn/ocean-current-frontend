import { TriggerArgs } from '@/components/Shared';
import { ArrowIcon } from '@/components/Shared/Icons';

export const CollapsibleTrigger = ({
  open,
  toggle,
  direction = 'down',
  toggleIconHidden = false,
  label,
}: TriggerArgs) => {
  const shouldRotate = direction === 'down' ? open : !open;

  return (
    <button
      className="bg-imos-pale-blue w-full border-b px-6 py-3"
      onClick={toggle}
      aria-expanded={open}
      aria-label={`${open ? 'Collapse' : 'Expand'} content`}
    >
      <div className="flex items-center justify-between">
        <div>{label}</div>
        {!toggleIconHidden && (
          <ArrowIcon
            color="imos-black"
            size="sm"
            className={`transition-transform duration-300 ease-in-out ${shouldRotate ? 'rotate-180' : ''}`}
          />
        )}
      </div>
    </button>
  );
};
