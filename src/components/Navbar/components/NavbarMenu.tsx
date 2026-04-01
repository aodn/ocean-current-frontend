import { forwardRef, ForwardedRef } from 'react';
import { DetailedLink } from '@/types/navbar';
import { LinkOrAnchor } from '@/components/Shared';

const NavbarMenu = forwardRef(({ items }: { items: DetailedLink[] }, ref: ForwardedRef<HTMLDivElement>) => {
  const renderMenuItems = (items: DetailedLink[]) =>
    items.map(({ id, Icon, title, description, url }) => (
      <LinkOrAnchor
        key={id}
        to={url}
        className={'flex justify-between gap-4 px-4 py-2.5 hover:bg-imos-hover-blue hover:bg-opacity-20'}
      >
        <Icon className="self-start" size="xxl" color="imos-black" />
        <div className="flex flex-1 flex-col">
          <div className="whitespace-nowrap text-base font-bold leading-5">{title}</div>
          <div className="mt-1 max-w-96 text-sm font-light leading-5 text-imos-nav-text">{description}</div>
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
