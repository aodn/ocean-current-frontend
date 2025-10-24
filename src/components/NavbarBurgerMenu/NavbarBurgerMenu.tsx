import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import logo from '@/assets/images/imos-logo.png';
import burgerMenu from '@/assets/icons/burger-menu-icon.svg';
import cross from '@/assets/icons/cross-icon.svg';
import { linksData } from '@/data/linksData';
import { LinkOrAnchor } from '@/components/Shared';

const NavbarBurgerMenu: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = (): void => {
    setMenuOpen(false);
  };

  const isLinkActive = (url: string): boolean => {
    const currentPath = location.pathname;
    const linkPath = url.split('?')[0];

    return currentPath.startsWith(linkPath);
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-6">
        <Link className="mr-auto" to={'/'}>
          <img className="h-12" src={logo} alt="IMOS logo navbar" />
        </Link>
        <img
          data-testid="svg-toggle"
          onClick={toggleMenu}
          className="block h-6 w-6"
          alt="burger-menu"
          src={burgerMenu}
          aria-hidden="true"
        />
      </nav>
      <div data-testid="burger-menu" className={`z-50 ${isMenuOpen ? 'visible' : 'hidden'}`}>
        <nav className="fixed bottom-0 left-0 top-0 flex w-full flex-col overflow-y-auto border-r bg-white px-12 py-6">
          <div className="mb-8 flex items-center">
            <Link className="mr-auto" to={'/'}>
              <img className="h-8" src={logo} alt="IMOS logo" />
            </Link>
            <img onClick={toggleMenu} className="h-8" alt="cross" src={cross} aria-hidden="true" />
          </div>
          {linksData.map((item) => (
            <div key={item.title}>
              {item.url ? (
                <LinkOrAnchor
                  className={`mb-4 text-base ${
                    isLinkActive(item.url) ? 'font-semibold text-blue-600' : 'text-gray-400'
                  }`}
                  to={item.url}
                  onClick={closeMenu}
                >
                  {item.title}
                </LinkOrAnchor>
              ) : (
                <span className="mb-4 text-base text-gray-400">{item.title}</span>
              )}
              {item.links && (
                <div className="ml-4">
                  {item.links?.length > 0 &&
                    item.links.map((subLink) => (
                      <LinkOrAnchor
                        key={subLink.id}
                        className={`mr-auto block ${
                          isLinkActive(subLink.url) ? 'font-semibold text-blue-600' : 'text-gray-400'
                        }`}
                        to={subLink.url}
                        onClick={closeMenu}
                      >
                        {subLink.title}
                      </LinkOrAnchor>
                    ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavbarBurgerMenu;
