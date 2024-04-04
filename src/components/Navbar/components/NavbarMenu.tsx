import { forwardRef, ForwardedRef } from 'react';
import { DetailedLink } from '../types/Navbar.types';
import { Link } from 'react-router-dom';

const NavbarMenu = forwardRef(
  (
    { itemsLeft, itemsRight }: { itemsLeft: DetailedLink[]; itemsRight: DetailedLink[] },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const renderMenuItems = (items: DetailedLink[]) =>
      items.map(({ id, imageUrl, title, description, url }) => (
        <Link to={url} key={id} className="my-2 flex justify-between gap-4">
          <img alt={title} loading="lazy" src={imageUrl} className="my-auto aspect-square w-7" />
          <div className="flex flex-1 flex-col pr-1.5">
            <div className="text-base font-bold leading-5">{title}</div>
            <div className="whitespace-nowrap text-sm font-light leading-5 text-gray-500">{description}</div>
          </div>
        </Link>
      ));

    return (
      <div className="flex gap-5 max-md:flex-col max-md:gap-0" ref={ref}>
        <div className="flex w-6/12 flex-col max-md:w-full">
          <div className="flex flex-col self-stretch tracking-wide text-sky-950">{renderMenuItems(itemsLeft)}</div>
        </div>
        <div className="ml-5 flex w-6/12 flex-col max-md:w-full">
          <div className="flex flex-col self-stretch pr-14 tracking-wide text-sky-950">
            {renderMenuItems(itemsRight)}
          </div>
        </div>
      </div>
    );
  },
);

NavbarMenu.displayName = 'NavbarMenu';

export default NavbarMenu;
