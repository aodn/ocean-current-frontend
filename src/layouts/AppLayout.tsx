import React from 'react';
import { Footer, Navbar, NavbarMobile } from '@/components';
import BetaBanner from '@/components/BetaBanner/BetaBanner';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-imos-light-blue font-open-sans flex min-h-screen w-full flex-col md:px-0">
      <div id="app-header" className="sticky top-0 z-50">
        <BetaBanner />
        <NavbarMobile className="md:hidden" />
        <Navbar className="mx-auto hidden w-full md:block" />
      </div>

      <main className="flex w-full grow justify-center md:px-0">{children}</main>

      <Footer />
    </div>
  );
};

export default AppLayout;
