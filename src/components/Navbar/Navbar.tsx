import { useState, useRef } from 'react';
import NavbarMenu from './components/NavbarMenu';
import { linksData } from './data/LinksData';
import { LinkItem, SectionLinks } from './types/Navbar.types';
import logo from '@/assets/images/imos-logo.png';

const Navbar: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ left: number } | null>(null);
  const [menuItems] = useState<LinkItem[]>(linksData);
  const menuItemRefs = useRef<(HTMLElement | null)[]>([]);

  const setPositionNavbar = (index: number, element: HTMLElement) => {
    setHoverIndex(index);
    setPopoverPosition({ left: element.offsetLeft });
  };

  const isSectionLink = (item: LinkItem): item is SectionLinks => 'leftLinks' in item || 'rightLinks' in item;

  const closeNavbarMenu = () => setHoverIndex(null);

  const shouldDisplayNavbarMenu = (index: number | null): boolean => {
    if (index === null) return false;
    const item = menuItems[index];
    return (
      isSectionLink(item) &&
      ((!!item.leftLinks && item.leftLinks.length > 0) || (!!item.rightLinks && item.rightLinks.length > 0))
    );
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex py-9 ">
        <img src={logo} alt="IMOS logo" />
        <div className="mx-7 h-auto w-px bg-imos-title-blue"></div>
        <div className="flex flex-col justify-center text-xl font-light text-imos-title-blue ">
          <p>Ocean Current</p>
        </div>
      </div>

      <div className="flex items-center justify-center capitalize text-black max-md:flex-wrap">
        <div
          onMouseLeave={() => closeNavbarMenu()}
          className="relative mt-6  flex justify-between gap-20 self-start text-base max-md:max-w-full max-md:flex-wrap"
        >
          {menuItems.map((item, index) => (
            <span
              key={item.title}
              onMouseEnter={(event) => setPositionNavbar(index, event.currentTarget)}
              className="cursor-pointer pb-4 text-black"
              ref={(el) => (menuItemRefs.current[index] = el)}
            >
              {item.title}
            </span>
          ))}
          {hoverIndex !== null && shouldDisplayNavbarMenu(hoverIndex) && (
            <div
              onMouseLeave={() => setHoverIndex(null)}
              style={{ left: popoverPosition?.left || 0 }}
              className="absolute top-10 rounded-md bg-white p-6 shadow-lg transition duration-300 ease-in-out"
            >
              <NavbarMenu
                itemsLeft={menuItems[hoverIndex].leftLinks || []}
                itemsRight={menuItems[hoverIndex].rightLinks || []}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
