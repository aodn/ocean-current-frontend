import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import logo from '@/assets/images/imos-logo.png';
import legacyIcon from '@/assets/images/legacy-site.png';
import { linksData } from '@/data/linksData';
import { LinkItem, SectionLinks } from '@/types/navbar';
import { BrandingText, ExternalUrls, GeneralText } from '@/constants/textConstant';
import ArrowIcon from '@/assets/icons/arrow.svg';
import { LinkOrAnchor } from '@/components/Shared';
import { cn } from '@/utils/classname-util/cn';
import NavbarMenu from './components/NavbarMenu';

const Navbar = ({ className }: { className?: string }) => {
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
    <div className={cn('sticky top-0 z-50 w-full bg-white shadow-md transition-all duration-300', className)}>
      <nav
        data-testid="main-navbar"
        className="mx-auto flex w-full max-w-8xl items-center justify-between gap-4 p-3 px-4 md:px-6 lg:px-10"
      >
        <div data-testid="navbar-branding" className="flex h-10 shrink-0 items-center lg:h-14">
          <LinkOrAnchor className="mr-auto" to={ExternalUrls.IMOS}>
            <img
              className={cn('h-10 transition-all duration-300', isScrolled ? 'lg:h-10' : 'lg:h-14')}
              src={logo}
              alt="IMOS logo"
            />
          </LinkOrAnchor>
          <div className="mx-3 h-10 w-0.5 bg-imos-title-blue opacity-50 lg:mx-7 lg:h-12" aria-hidden="true"></div>
          <div className="flex flex-col justify-center text-base font-light text-imos-title-blue lg:text-xl">
            <Link className="mr-auto" to={'/'}>
              {BrandingText.OC_PASCAL_CASE}
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center capitalize text-black max-md:flex-wrap">
          <div
            onMouseLeave={() => closeNavbarMenu()}
            className="relative flex justify-between gap-3 self-start text-base font-semibold leading-snug text-imos-nav-text max-md:max-w-full max-md:flex-wrap md:gap-8 lg:gap-12 xl:gap-20"
          >
            {menuItems.map((item, index) => (
              <div
                key={item.title}
                onMouseEnter={(event) => setPositionNavbar(index, event.currentTarget)}
                className="cursor-pointer whitespace-nowrap py-3"
              >
                {item.url ? (
                  <LinkOrAnchor
                    to={item.url}
                    className={`text-imos-nav-text decoration-imos-deep-blue decoration-2 underline-offset-[3px] ${hoverIndex === index ? 'underline' : ''}`}
                  >
                    {item.title}
                  </LinkOrAnchor>
                ) : (
                  <span
                    ref={(el) => (menuItemRefs.current[index] = el)}
                    className={`text-imos-nav-text decoration-imos-deep-blue decoration-2 underline-offset-[3px] ${hoverIndex === index ? 'underline' : ''}`}
                  >
                    {item.title}
                  </span>
                )}
                {isSectionLink(item) && (
                  <img
                    src={ArrowIcon}
                    alt="arrow icon"
                    className={`ml-1 inline w-4 transform align-middle transition-transform duration-300 ${hoverIndex === index ? '-rotate-90' : ''}`}
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
            <div className="flex shrink-0 cursor-pointer items-center justify-center">
              <LinkOrAnchor
                to={ExternalUrls.OCEAN_CURRENT_LEGACY}
                className="flex items-center rounded-md bg-[#D7F4F2] px-2 py-1 lg:px-4 lg:py-3"
              >
                <img src={legacyIcon} alt="legacy icon" className="mr-2 w-4" />
                <span className="font-medium text-imos-nav-text decoration-imos-deep-blue decoration-2 underline-offset-[3px] hover:underline">
                  {GeneralText.LEGACY_SITE}
                </span>
              </LinkOrAnchor>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
