import React from 'react';
import { useRouteError } from 'react-router';
import AppLayout from '@/layouts/AppLayout';
import ErrorContent from '@/errors/error-content/ErrorContent';

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  return (
    <AppLayout>
      <div className="relative mx-auto mb-4 mt-4 flex w-full max-w-8xl px-4 md:mb-9 md:min-h-[800px]">
        {error ? (
          <ErrorContent
            title="Something went wrong"
            description="An unexpected error occurred. Please try refreshing the page."
          />
        ) : (
          <ErrorContent
            title="This page is missing"
            description="The page you are looking for could not be found. It may have been moved or no longer exists."
          />
        )}
      </div>
    </AppLayout>
  );
};

export default ErrorPage;
