import { Link } from 'react-router';
import { useState, useCallback } from 'react';
import logo from '@/assets/images/imos-logo.png';
import { cn } from '@/utils/classname-util/cn';
import { BrandingText } from '@/constants/textConstant';
import { BurgerMenuIcon, CrossIcon } from '../Shared/Icons';
import { LinkOrAnchor, Overlay } from '../Shared';
import NavbarBurgerMenu from '../NavbarBurgerMenu/NavbarBurgerMenu';

export const NavbarMobile = ({ className }: { className?: string }) => {
  const [isMobileMenuOpen, setMobieMenuOpen] = useState(false);

  const toggleMobileMenu = (): void => {
    setMobieMenuOpen((prev) => !prev);
  };
  const closeMobileMenu = useCallback((): void => {
    setMobieMenuOpen(false);
  }, []);

  return (
    <div className={cn('sticky top-0 z-50 w-full bg-white shadow-md', className)}>
      <nav className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <LinkOrAnchor className="mr-auto" to="https://imos.org.au/">
            <img className="h-12" src={logo} alt="IMOS logo navbar" />{' '}
          </LinkOrAnchor>
          <div className="mx-7 h-12 w-0.5 bg-imos-title-blue opacity-50" aria-hidden="true"></div>
          <div className="flex flex-col justify-center font-poppins text-xl font-light text-imos-title-blue">
            <Link className="mr-auto" to={'/'}>
              {BrandingText.OC_PASCAL_CASE}
            </Link>
          </div>
        </div>
        <button
          className="bg-transparent"
          onClick={toggleMobileMenu}
          aria-label="Open mobile menu"
          data-testid="svg-toggle"
        >
          {isMobileMenuOpen ? <CrossIcon size="xl" /> : <BurgerMenuIcon size="lg" />}
        </button>
      </nav>

      <Overlay isOpen={isMobileMenuOpen}>
        <NavbarBurgerMenu closeMobileMenu={closeMobileMenu} />
      </Overlay>
    </div>
  );
};
