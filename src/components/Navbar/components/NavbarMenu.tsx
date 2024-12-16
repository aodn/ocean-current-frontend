import { forwardRef, ForwardedRef } from 'react';
import { Link } from 'react-router-dom';
import { DetailedLink } from '@/types/navbar';

const NavbarMenu = forwardRef(({ items }: { items: DetailedLink[] }, ref: ForwardedRef<HTMLDivElement>) => {
  const renderMenuItems = (items: DetailedLink[]) =>
    items.map(({ id, imageUrl, title, description, url }) => (
      <Link to={url} key={id} className={'flex justify-between gap-4 p-4 hover:bg-imos-light-blue hover:opacity-65'}>
        <img alt={title} loading="lazy" src={imageUrl} className="my-auto aspect-square w-7" />
        <div className="flex flex-1 flex-col whitespace-nowrap pr-1.5">
          <div className="text-base font-bold leading-5">{title}</div>
          <div className="text-sm font-light leading-5 text-gray-500">{description}</div>
        </div>
      </Link>
    ));

  return (
    <div className="max-md:flex-col max-md:gap-0 flex gap-5" ref={ref}>
      <div className="max-md:w-full flex flex-col">
        <div className="flex flex-col self-stretch tracking-wide text-sky-950">{renderMenuItems(items)}</div>
      </div>
    </div>
  );
});

NavbarMenu.displayName = 'NavbarMenu';

export default NavbarMenu;
