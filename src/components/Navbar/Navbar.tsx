import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/imos-logo.png';
import { linksData } from '@/data/linksData';
import { LinkItem, SectionLinks } from '@/types/navbar';
import NavbarMenu from './components/NavbarMenu';

const Navbar: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ left: number } | null>(null);
  const [menuItems] = useState<LinkItem[]>(linksData);
  const menuItemRefs = useRef<(HTMLElement | null)[]>([]);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <div className="sticky top-0 z-50 w-full bg-white shadow-md transition-all duration-300">
      <nav className="mx-auto flex w-full max-w-8xl items-center justify-between p-3 px-10">
        <div className="flex items-center">
          <Link className="mr-auto" to={'/'}>
            <img className={`transition-all duration-300 ${isScrolled ? 'h-8' : 'h-12'}`} src={logo} alt="IMOS logo" />
          </Link>
          <div className="mx-7 h-10 w-0.5 bg-imos-title-blue"></div>
          <div className="flex flex-col justify-center text-xl  text-imos-title-blue">
            <Link className="mr-auto" to={'/'}>
              OceanCurrent
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center capitalize text-black max-md:flex-wrap">
          <div
            onMouseLeave={() => closeNavbarMenu()}
            className="relative flex justify-between gap-20 self-start text-base max-md:max-w-full max-md:flex-wrap"
          >
            {menuItems.map((item, index) => (
              <span
                key={item.title}
                onMouseEnter={(event) => setPositionNavbar(index, event.currentTarget)}
                className="cursor-pointer py-4 text-black"
                ref={(el) => (menuItemRefs.current[index] = el)}
              >
                {item.title}
              </span>
            ))}
            {hoverIndex !== null && shouldDisplayNavbarMenu(hoverIndex) && (
              <div
                onMouseLeave={() => setHoverIndex(null)}
                style={{ left: popoverPosition?.left || 0 }}
                className="absolute top-10 z-20 rounded-md bg-white p-6 shadow-lg transition duration-300 ease-in-out"
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
    </div>
  );
};

export default Navbar;
