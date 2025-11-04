import { Link } from 'react-router';
import logo from '@/assets/images/imos-logo.png';
import { cn } from '@/utils/classname-util/cn';
import { BrandingText } from '@/constants/textConstant';
import { BurgerMenuIcon, CrossIcon } from '../Shared/Icons';
import { LinkOrAnchor } from '../Shared';

export const NavbarMobile = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  className,
}: {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  className?: string;
}) => {
  return (
    <div className={cn('sticky top-0 z-50 w-full bg-white shadow-md', className)}>
      <nav className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <LinkOrAnchor className="mr-auto" to="https://imos.org.au/">
            <img className="h-12" src={logo} alt="IMOS logo navbar" />{' '}
          </LinkOrAnchor>
          <div className="mx-7 h-12 w-0.5 bg-imos-title-blue opacity-50" aria-hidden="true"></div>
          <div className="flex flex-col justify-center text-xl font-light text-imos-title-blue">
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
    </div>
  );
};
