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
      <h1 className="font-poppins text-imos-dark-grey mt-6 text-2xl font-medium md:text-3xl">{title}</h1>
      <p className="text-imos-text-grey mt-3 max-w-md">{description}</p>
      {showHomeButton && (
        <Link
          to="/"
          className="border-imos-calypso-blue bg-imos-calypso-blue relative mt-8 flex w-auto items-center justify-center rounded-xl border px-4 py-1 text-lg whitespace-nowrap text-white transition duration-300 ease-in-out active:opacity-80 md:px-8 md:hover:opacity-80"
        >
          Go to home
        </Link>
      )}
    </div>
  );
};

export default ErrorContent;
