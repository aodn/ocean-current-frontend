import { forwardRef, ForwardedRef } from 'react';
import { DetailedLink } from '@/types/navbar';
import { LinkOrAnchor } from '@/components/Shared';

const NavbarMenu = forwardRef(({ items }: { items: DetailedLink[] }, ref: ForwardedRef<HTMLDivElement>) => {
  const renderMenuItems = (items: DetailedLink[]) =>
    items.map(({ id, Icon, title, description, url }) => (
      <LinkOrAnchor
        key={id}
        to={url}
        className={'flex justify-between gap-4 p-4 hover:bg-imos-hover-blue hover:bg-opacity-20'}
      >
        <Icon className="my-auto" size="lg" />
        <div className="flex flex-1 flex-col whitespace-nowrap pr-1.5">
          <div className="text-base font-bold leading-5">{title}</div>
          <div className="text-sm font-light leading-5 text-gray-500">{description}</div>
        </div>
      </LinkOrAnchor>
    ));

  return (
    <div className="flex gap-5 max-md:flex-col max-md:gap-0" ref={ref}>
      <div className="flex flex-col max-md:w-full">
        <div className="flex flex-col self-stretch tracking-wide text-sky-950">{renderMenuItems(items)}</div>
      </div>
    </div>
  );
});

NavbarMenu.displayName = 'NavbarMenu';

export default NavbarMenu;
