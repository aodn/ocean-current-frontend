import { forwardRef, ForwardedRef } from 'react';
import { DetailedLink } from '../Navbar.types';
import { Link } from 'react-router-dom';

const NavbarMenu = forwardRef(
  (
    { itemsLeft, itemsRight }: { itemsLeft: DetailedLink[]; itemsRight: DetailedLink[] },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const renderMenuItems = (items: DetailedLink[]) =>
      items.map(({ id, imageUrl, title, description, url }) => (
        <Link to={url} key={id} className="flex gap-4 justify-between my-2">
          <img alt={title} loading="lazy" src={imageUrl} className="my-auto w-7 aspect-square" />
          <div className="flex flex-col flex-1 pr-1.5">
            <div className="text-base font-bold leading-5">{title}</div>
            <div className="text-sm font-light text-gray-500 leading-5 whitespace-nowrap">{description}</div>
          </div>
        </Link>
      ));

    return (
      <div className="flex gap-5 max-md:flex-col max-md:gap-0" ref={ref}>
        <div className="flex flex-col w-6/12 max-md:w-full">
          <div className="flex flex-col self-stretch tracking-wide text-sky-950">{renderMenuItems(itemsLeft)}</div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:w-full">
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
