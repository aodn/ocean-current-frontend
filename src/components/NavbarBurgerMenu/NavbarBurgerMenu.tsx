import { linksData } from '@/data/linksData';
import { MenuSection } from './components';
import { useMenuAccordion } from './hooks/useMenuAccordion';

interface NavbarBurgerMenuProps {
  closeMobileMenu: () => void;
}

/**
 * Mobile navigation menu with accordion behavior
 * Only one section can be open at a time
 */
const NavbarBurgerMenu = ({ closeMobileMenu }: NavbarBurgerMenuProps) => {
  const { isSectionOpen, handleToggleSection, isLinkActive } = useMenuAccordion();

  return (
    <nav className="mt-20 w-full bg-transparent px-4">
      <div className="bg-imos-cloud-tint overflow-hidden rounded-lg shadow-xs">
        {linksData.map((item, index) => (
          <MenuSection
            key={item.title}
            item={item}
            isLastItem={index === linksData.length - 1}
            isOpen={isSectionOpen(item.title)}
            onToggle={() => handleToggleSection(item.title)}
            onLinkClick={closeMobileMenu}
            isLinkActive={isLinkActive}
          />
        ))}
      </div>
    </nav>
  );
};

export default NavbarBurgerMenu;
