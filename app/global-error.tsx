'use client';

import './globals.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError: React.FC<GlobalErrorProps> = ({error, reset}) => {
  console.error('Global application error:', error);

  return (
      <html lang="en">
      <body className="min-h-screen flex flex-col font-watch-primary text-watch-primary">
      <main className="container flex flex-grow flex-col items-center justify-center py-20 text-center">
        <p className="font-watch-secondary text-sm uppercase tracking-[0.3em] text-watch-gray2">
          Critical error
        </p>

        <h1 className="mt-4 font-watch-secondary text-3xl font-bold uppercase md:text-4xl">
          Application crashed
        </h1>

        <p className="mt-4 max-w-md text-watch-gray2">
          Something went wrong while loading the application. Please try reloading the page.
        </p>

        <button
            type="button"
            onClick={reset}
            className="mt-8 bg-watch-primary px-12 py-3 uppercase text-watch-white transition transition-watch hover:bg-watch-gray1"
        >
          Try again
        </button>
      </main>
      </body>
      </html>
  );
};

export default GlobalError;
