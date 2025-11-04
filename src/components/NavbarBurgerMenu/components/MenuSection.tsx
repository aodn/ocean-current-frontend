import { LinkOrAnchor, CollapsibleComponent, TriggerArgs } from '@/components/Shared';
import { LinkItem } from '@/types/navbar';
import { CollapsibleTrigger } from './CollapsibleTrigger';
import { MenuItem } from './MenuItem';

interface MenuSectionProps {
  item: LinkItem;
  isLastItem: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
  isLinkActive: (url: string) => boolean;
}

export const MenuSection = ({ item, isLastItem, isOpen, onToggle, onLinkClick, isLinkActive }: MenuSectionProps) => {
  const hasLinks = item.links && item.links.length > 0;

  return (
    <div>
      <CollapsibleComponent
        defaultOpen={isOpen}
        key={`${item.title}-${isOpen}`}
        disable={!hasLinks}
        toggleIconHidden={!hasLinks}
        wrapperClassName={`w-full border-imos-light-grey ${isLastItem ? '' : 'border-b-2'}`}
        trigger={({ toggle, open, direction, toggleIconHidden }: TriggerArgs) => (
          <CollapsibleTrigger
            open={open}
            toggle={() => {
              if (hasLinks) {
                onToggle();
                toggle();
              }
            }}
            direction={direction}
            toggleIconHidden={toggleIconHidden}
            label={
              item.url ? (
                <LinkOrAnchor className="mb-4 text-base font-medium text-gray-900" to={item.url} onClick={onLinkClick}>
                  {item.title}
                </LinkOrAnchor>
              ) : (
                <span className="mb-4 text-base font-medium text-gray-900">{item.title}</span>
              )
            }
          />
        )}
      >
        {hasLinks && item.links && (
          <div className="my-[1px]">
            {item.links.map((link) => (
              <MenuItem key={link.id} link={link} isActive={isLinkActive(link.url)} onClick={onLinkClick} />
            ))}
          </div>
        )}
      </CollapsibleComponent>
    </div>
  );
};
