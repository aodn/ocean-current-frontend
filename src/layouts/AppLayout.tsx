import React from 'react';
import { Footer, Navbar, NavbarMobile } from '@/components';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-imos-light-blue font-open-sans md:px-0">
      <NavbarMobile className="md:hidden" />
      <Navbar className="mx-auto hidden w-full md:block" />

      <main className="flex w-full grow justify-center md:px-0">{children}</main>

      <Footer />
    </div>
  );
};

export default AppLayout;
