import { forwardRef, ForwardedRef } from 'react';
import { Link } from 'react-router-dom';
import { DetailedLink } from '@/types/navbar';
import { color } from '@/styles/colors';

const NavbarMenu = forwardRef(
  ({ itemsLeft }: { itemsLeft: DetailedLink[]; itemsRight: DetailedLink[] }, ref: ForwardedRef<HTMLDivElement>) => {
    const renderMenuItems = (items: DetailedLink[]) =>
      items.map(({ id, imageUrl, title, description, url }) => (
        <Link
          to={url}
          key={id}
          className={`hover:bg-[${color.primary5}] flex justify-between gap-4 p-4 hover:opacity-65`}
        >
          <img alt={title} loading="lazy" src={imageUrl} className="my-auto aspect-square w-7" />
          <div className="flex flex-1 flex-col whitespace-nowrap pr-1.5">
            <div className="text-base font-bold leading-5">{title}</div>
            <div className="text-sm font-light leading-5 text-gray-500">{description}</div>
          </div>
        </Link>
      ));

    return (
      <div className="flex gap-5 max-md:flex-col max-md:gap-0" ref={ref}>
        <div className="flex flex-col max-md:w-full">
          <div className="flex flex-col self-stretch tracking-wide text-sky-950">{renderMenuItems(itemsLeft)}</div>
        </div>
      </div>
    );
  },
);

NavbarMenu.displayName = 'NavbarMenu';

export default NavbarMenu;
