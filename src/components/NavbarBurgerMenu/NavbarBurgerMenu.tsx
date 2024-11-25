import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/imos-logo.png';
import burgerMenu from '@/assets/icons/burger-menu-icon.svg';
import cross from '@/assets/icons/cross-icon.svg';
import { linksData } from '@/data/linksData';

const NavbarBurgerMenu: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-6">
        <Link className="mr-auto" to={'/'}>
          <img className="h-8" src={logo} alt="IMOS logo navbar" />
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
              <span className="mb-4 text-base text-gray-400">{item.title}</span>
              {item.links && (
                <div className="ml-4">
                  {item.links?.length > 0 &&
                    item.links.map((subLink) => (
                      <Link key={subLink.id} className="mr-auto block text-gray-400" to={subLink.url}>
                        {subLink.title}
                      </Link>
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
