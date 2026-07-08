import Link from 'next/link';
import ButtonPrimary from '@/components/UI/ButtonPrimary';

const NotFound: React.FC = () => {
  return (
      <section className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-watch-secondary text-sm uppercase tracking-[0.3em] text-watch-gray2">
          Error 404
        </p>

        <h1 className="mt-4 font-watch-secondary text-3xl font-bold uppercase md:text-4xl">
          Page not found
        </h1>

        <p className="mt-4 max-w-md text-watch-gray2">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-8">
          <Link href="/">
            <ButtonPrimary>Back to home</ButtonPrimary>
          </Link>
        </div>
      </section>
  );
};

export default NotFound;
