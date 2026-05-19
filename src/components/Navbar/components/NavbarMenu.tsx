import { forwardRef, ForwardedRef } from 'react';
import { DetailedLink } from '@/types/navbar';
import { LinkOrAnchor } from '@/components/Shared';

const NavbarMenu = forwardRef(({ items }: { items: DetailedLink[] }, ref: ForwardedRef<HTMLDivElement>) => {
  const renderMenuItems = (items: DetailedLink[]) =>
    items.map(({ id, Icon, title, description, url }) => (
      <LinkOrAnchor key={id} to={url} className={'hover:bg-imos-hover-blue/20 flex justify-between gap-4 px-4 py-2.5'}>
        <Icon className="self-start" size="xxl" color="imos-black" />
        <div className="flex flex-1 flex-col">
          <div className="text-base leading-5 font-bold whitespace-nowrap">{title}</div>
          <div className="text-imos-nav-text mt-1 max-w-96 text-sm leading-5 font-light">{description}</div>
        </div>
      </LinkOrAnchor>
    ));

  return (
    <div className="flex flex-col py-1 tracking-wide text-sky-950" ref={ref}>
      {renderMenuItems(items)}
    </div>
  );
});

NavbarMenu.displayName = 'NavbarMenu';

export default NavbarMenu;
