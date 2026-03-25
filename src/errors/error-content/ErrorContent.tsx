import React from 'react';
import { Link } from 'react-router';
import NotFoundIcon from '@/assets/icons/not-found-icon.svg';

interface ErrorContentProps {
  title: string;
  description: string;
  showHomeButton?: boolean;
}

const ErrorContent: React.FC<ErrorContentProps> = ({ title, description, showHomeButton = true }) => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center bg-white text-center">
      <img src={NotFoundIcon} alt="" aria-hidden="true" />
      <h1 className="mt-6 font-poppins text-2xl font-medium text-imos-dark-grey md:text-3xl">{title}</h1>
      <p className="mt-3 max-w-md text-imos-text-grey">{description}</p>
      {showHomeButton && (
        <Link
          to="/"
          className="relative mt-8 flex w-auto items-center justify-center whitespace-nowrap rounded-xl border border-imos-calypso-blue bg-imos-calypso-blue px-4 py-1 text-lg text-white transition duration-300 ease-in-out active:opacity-80 md:px-8 md:hover:opacity-80"
        >
          Go to home
        </Link>
      )}
    </div>
  );
};

export default ErrorContent;
