import { useState, useRef } from 'react';
import NavbarMenu from './components/NavbarMenu';
import { linksData } from './data/LinksData';
import { LinkItem, SectionLinks } from './Navbar.types';
import logo from '@/assets/images/imos-logo.png';

const isSectionLink = (item: LinkItem): item is SectionLinks => 'leftLinks' in item || 'rightLinks' in item;

const Navbar: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ left: number } | null>(null);
  const [menuItems] = useState<LinkItem[]>(linksData);
  const menuItemRefs = useRef<(HTMLElement | null)[]>([]);

  const setPositionNavbar = (index: number, element: HTMLElement) => {
    setHoverIndex(index);
    setPopoverPosition({ left: element.offsetLeft });
  };

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
    <nav>
      <div className="w-full flex py-9 ">
        <img src={logo} alt="IMOS logo" />
        <div className="h-auto bg-imos-title-blue w-px mx-7"></div>
        <div className="text-imos-title-blue flex flex-col justify-center font-light text-xl ">
          <p>Imos Ocean Current</p>
          <p>Surface Currents and Temperature</p>
        </div>
      </div>

      <div className="flex text-black capitalize max-md:flex-wrap items-center justify-center">
        <div
          onMouseLeave={() => closeNavbarMenu()}
          className="flex relative  gap-20 justify-between self-start mt-6 text-base max-md:flex-wrap max-md:max-w-full"
        >
          {menuItems.map((item, index) => (
            <span
              key={item.title}
              onMouseEnter={(event) => setPositionNavbar(index, event.currentTarget)}
              className="cursor-pointer text-black pb-4"
              ref={(el) => (menuItemRefs.current[index] = el)}
            >
              {item.title}
            </span>
          ))}
          {hoverIndex !== null && shouldDisplayNavbarMenu(hoverIndex) && (
            <div
              onMouseLeave={() => setHoverIndex(null)}
              style={{ left: popoverPosition?.left || 0 }}
              className="absolute p-6 top-10 bg-white rounded-md shadow-lg transition duration-300 ease-in-out"
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
