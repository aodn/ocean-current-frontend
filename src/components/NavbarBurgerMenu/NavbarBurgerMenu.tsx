import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import logo from '@/assets/images/imos-logo.png';
import burgerMenu from '@/assets/icons/burger-menu-icon.svg';
import cross from '@/assets/icons/cross-icon.svg';
import { linksData } from '@/data/linksData';
import { LinkOrAnchor, CollapsibleComponent, TriggerArgs } from '@/components/Shared';
import { useBodyScrollLock } from '@/hooks';
import { ArrowIcon } from '../Shared/Icons';

const CollapsibleTrigger = ({ open, toggle, direction = 'down', toggleIconHidden = false, label }: TriggerArgs) => {
  const shouldRotate = direction === 'down' ? open : !open;
  return (
    <button
      className="w-full border-b bg-imos-pale-blue px-6 py-3"
      onClick={toggle}
      aria-expanded={open}
      aria-label={`${open ? 'Collapse' : 'Expand'} content`}
    >
      <div className="flex items-center justify-between">
        <div>{label}</div>
        {!toggleIconHidden && (
          <ArrowIcon
            color="imos-black"
            size="sm"
            className={`transition-transform duration-300 ease-in-out ${shouldRotate ? 'rotate-180' : ''}`}
          />
        )}
      </div>
    </button>
  );
};

const NavbarBurgerMenu: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useBodyScrollLock(isMenuOpen);

  const toggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = (): void => {
    setMenuOpen(false);
  };

  const isLinkActive = (url: string): boolean => {
    const processedCurrentPath =
      location.pathname.split('/product')[1] || location.pathname.split('/map')[1] || location.pathname;
    const linkPathProduct = url.split('?')[0].split('/map')[1];

    return processedCurrentPath.startsWith(linkPathProduct);
  };

  return (
    <div className="shadow-md">
      <nav className="flex items-center justify-between px-4 py-2">
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

      <div
        data-testid="burger-menu"
        className={`fixed bottom-0 left-0 right-0 top-0 z-50 overflow-y-auto ${isMenuOpen ? 'block' : 'hidden'}`}
      >
        <nav className="min-h-screen w-full bg-white p-6">
          <div className="mb-8 flex items-center justify-between">
            <Link className="mr-auto" to={'/'}>
              <img className="h-8" src={logo} alt="IMOS logo" />
            </Link>
            <img onClick={toggleMenu} className="h-8" alt="cross" src={cross} aria-hidden="true" />
          </div>

          <div className="overflow-hidden rounded bg-imos-cloud-tint">
            {linksData.map((item, index) => (
              <div key={item.title}>
                <CollapsibleComponent
                  defaultOpen={index === 0}
                  disable={!item.links || item.links.length === 0}
                  toggleIconHidden={!item.links || item.links.length === 0}
                  wrapperClassName={`w-full border-imos-light-grey ${index === linksData.length - 1 ? '' : 'border-b-2'}`}
                  trigger={({ toggle, open, direction, toggleIconHidden }: TriggerArgs) => (
                    <CollapsibleTrigger
                      open={open}
                      toggle={toggle}
                      direction={direction}
                      toggleIconHidden={toggleIconHidden}
                      label={
                        item.url ? (
                          <LinkOrAnchor
                            className="mb-4 text-base font-medium text-gray-900"
                            to={item.url}
                            onClick={closeMenu}
                          >
                            {item.title}
                          </LinkOrAnchor>
                        ) : (
                          <span className="mb-4 text-base font-medium text-gray-900">{item.title}</span>
                        )
                      }
                    />
                  )}
                >
                  {item.links && (
                    <div className="my-[1px]">
                      {item.links?.length > 0 &&
                        item.links.map(({ id, url, Icon, title }) => (
                          <LinkOrAnchor
                            key={id}
                            className="mr-auto block w-full font-semibold text-gray-700"
                            to={url}
                            onClick={closeMenu}
                          >
                            <p
                              className={`flex w-full items-center gap-x-4 p-3 ${isLinkActive(url) ? 'bg-imos-light-blue' : ''}`}
                            >
                              <Icon size="xxl" color="imos-grey" />
                              {title}
                            </p>
                          </LinkOrAnchor>
                        ))}
                    </div>
                  )}
                </CollapsibleComponent>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavbarBurgerMenu;
