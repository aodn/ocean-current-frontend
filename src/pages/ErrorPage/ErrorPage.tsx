import React from 'react';
import { Link } from 'react-router';
import NotFoundIcon from '@/assets/icons/not-found-icon.svg';
import { Navbar, NavbarMobile, Footer } from '@/components';
import { Button } from '@/components/Shared';

const ErrorPage: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-imos-light-blue font-open-sans md:px-0">
      <NavbarMobile className="md:hidden" />
      <Navbar className="mx-auto hidden w-full md:block" />

      <main className="flex w-full grow justify-center md:px-0">
        <div className="relative mx-auto mb-4 mt-4 flex w-full max-w-8xl px-4 md:mb-9 md:min-h-[800px]">
          <div className="flex w-full flex-1 flex-col items-center justify-center bg-white text-center">
            <img src={NotFoundIcon} alt="page not found" />
            <h1 className="mt-6 font-poppins text-2xl font-medium text-imos-dark-grey md:text-3xl">
              This page is missing
            </h1>
            <p className="mt-3 max-w-md text-imos-text-grey">
              The page you are looking for could not be found. It may have been moved or no longer exists.
            </p>
            <Button type="primary" className="mt-8">
              <Link to="/">Go to home</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ErrorPage;
