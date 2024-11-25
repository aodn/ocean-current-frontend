import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/imos-logo.png';
import { linksData } from '@/data/linksData';
import { LinkItem, SectionLinks } from '@/types/navbar';
import { TEXT_CONSTANT } from '@/constants/textConstant';
import ArrowIcon from '@/assets/icons/arrow.svg';
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

  const isSectionLink = (item: LinkItem): item is SectionLinks => 'links' in item;

  const closeNavbarMenu = () => setHoverIndex(null);

  const shouldDisplayNavbarMenu = (index: number | null): boolean => {
    if (index === null) return false;
    const item = menuItems[index];
    return isSectionLink(item) && ((!!item.links && item.links.length > 0) || (!!item.links && item.links.length > 0));
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-md transition-all duration-300">
      <nav className="mx-auto flex w-full max-w-8xl items-center justify-between p-3 px-10">
        <div className="flex items-center">
          <Link className="mr-auto" to={'/'}>
            <img className={`transition-all duration-300 ${isScrolled ? 'h-8' : 'h-12'}`} src={logo} alt="IMOS logo" />
          </Link>
          <div className="mx-7 h-10 w-0.5 bg-imos-title-blue"></div>
          <div className="flex flex-col justify-center text-xl text-imos-title-blue">
            <Link className="mr-auto" to={'/'}>
              {TEXT_CONSTANT.OC_PASCAL_CASE}
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center capitalize text-black max-md:flex-wrap">
          <div
            onMouseLeave={() => closeNavbarMenu()}
            className="relative flex justify-between gap-20 self-start text-base max-md:max-w-full max-md:flex-wrap"
          >
            {menuItems.map((item, index) => (
              <div
                key={item.title}
                onMouseEnter={(event) => setPositionNavbar(index, event.currentTarget)}
                className="flex cursor-pointer content-center justify-center py-4 text-black"
              >
                <span
                  ref={(el) => (menuItemRefs.current[index] = el)}
                  className={`decoration-imos-deep-blue decoration-2 underline-offset-[3px] ${hoverIndex === index ? 'underline' : ''}`}
                >
                  {item.title}
                </span>
                {isSectionLink(item) && (
                  <img
                    src={ArrowIcon}
                    alt="arrow icon"
                    className={`ml-2 w-4 transform transition-transform duration-300 ${hoverIndex === index ? '-rotate-90' : ''}`}
                  />
                )}
              </div>
            ))}
            {hoverIndex !== null && shouldDisplayNavbarMenu(hoverIndex) && (
              <div
                onMouseLeave={() => setHoverIndex(null)}
                style={{ left: popoverPosition?.left || 0 }}
                className="absolute top-10 z-20 rounded-lg bg-white drop-shadow-xy4 transition duration-300 ease-in-out"
              >
                <NavbarMenu items={menuItems[hoverIndex].links || []} />
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
