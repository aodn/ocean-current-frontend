import React, { useState } from 'react';
import { linksData } from '../Navbar/data/LinksData';

import logo from '@/assets/images/imos-logo.png';

const NavbarBurgerMenu: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-6">
        <a className="mr-auto" href="/">
          <img className="h-8 " src={logo} alt="IMOS logo navbar" />
        </a>
        <svg
          onClick={toggleMenu}
          data-testid="svg-toggle"
          className="block h-6 w-6 fill-current text-gray-400"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </nav>
      <div data-testid="burger-menu" className={`z-50 ${isMenuOpen ? 'visible' : 'hidden'}`}>
        <nav className="fixed bottom-0 left-0 top-0 flex w-full flex-col overflow-y-auto border-r bg-white px-12 py-6">
          <div className="mb-8 flex items-center">
            <a className="mr-auto" href="/">
              <img className="h-8 " src={logo} alt="IMOS logo" />
            </a>
            <svg
              onClick={toggleMenu}
              className="h-8 cursor-pointer text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          {linksData.map((link) => (
            <div key={link.title}>
              <span className="mb-4 text-base text-gray-400">{link.title}</span>
              {link.leftLinks && link.rightLinks && (
                <div className="ml-4">
                  {link.leftLinks.map((subLink) => (
                    <a key={subLink.id} className="block text-gray-400" href={subLink.url}>
                      {subLink.title}
                    </a>
                  ))}
                  {link.rightLinks.map((subLink) => (
                    <a key={subLink.id} className="block text-gray-400" href={subLink.url}>
                      {subLink.title}
                    </a>
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
