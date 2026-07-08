'use client';

import {useEffect} from 'react';
import ButtonPrimary from '@/components/UI/ButtonPrimary';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({error, reset}) => {
  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);

  return (
      <section className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-watch-secondary text-sm uppercase tracking-[0.3em] text-watch-gray2">
          Error
        </p>

        <h1 className="mt-4 font-watch-secondary text-3xl font-bold uppercase md:text-4xl">
          Something went wrong
        </h1>

        <p className="mt-4 max-w-md text-watch-gray2">
          An unexpected error occurred while loading this page. Please try again in a moment.
        </p>

        <div className="mt-8">
          <ButtonPrimary onClick={reset}>Try again</ButtonPrimary>
        </div>
      </section>
  );
};

export default ErrorPage;
