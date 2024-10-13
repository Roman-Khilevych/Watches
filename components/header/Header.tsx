import Link from 'next/link';
import Navigation from '@/components/navigation/Navigation';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-watch-primary text-watch-white shadow-watch-line-bottom z-30">
      <div className="flex justify-between container">
        <Link href="/">
          <Logo />
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
