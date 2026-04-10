import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { linksData } from '@/data/linksData';

/**
 * Custom hook to manage accordion behavior for the burger menu
 * Ensures only one section is open at a time
 */
export const useMenuAccordion = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const location = useLocation();

  /**
   * Check if a link is currently active based on the URL
   */
  const isLinkActive = (url: string): boolean => {
    const processedCurrentPath =
      location.pathname.split('/product')[1] || location.pathname.split('/map')[1] || location.pathname;
    const linkPathProduct = url.split('?')[0].split('/map')[1] || url.split('?')[0].split('/product')[1];

    return !!linkPathProduct && processedCurrentPath.startsWith(linkPathProduct);
  };

  /**
   * Initialize the open section on mount
   * Open the section that contains the active link, or the first section by default
   */
  useEffect(() => {
    const activeSection = linksData.find((item) => item.links?.some((link) => isLinkActive(link.url)));
    setOpenSection(activeSection ? activeSection.title : linksData[0].title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Toggle a section open/closed
   * Implements accordion behavior - only one section can be open at a time
   */
  const handleToggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  /**
   * Check if a section is currently open
   */
  const isSectionOpen = (title: string) => {
    return openSection === title;
  };

  return {
    isSectionOpen,
    handleToggleSection,
    isLinkActive,
  };
};
