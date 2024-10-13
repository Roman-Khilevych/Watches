'use client';

import { useEffect, useState } from 'react';
import { CategoryModel } from '@/models/category';
import Icon from '@/components/UI/Icon';
import MobileMenuItem from './MobileMenuItem';

interface MobileMenuProps {
  categories: CategoryModel[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ categories }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  function toggleMenu(open?: boolean) {
    const newState = typeof open === 'boolean' ? open : !isMenuOpen;

    if (newState === false) {
      setActiveCategory(null);
    }

    setIsMenuOpen(newState);
  }

  function toggleCategory(categoryId: number) {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="md:hidden flex justify-between items-center">
        <button onClick={() => toggleMenu()} className="text-watch-white">
          <Icon name={isMenuOpen ? 'close' : 'hamburger'} className={isMenuOpen ? 'w-4' : 'w-5'} />
        </button>
      </div>

      <div
        className={`z-40 md:hidden fixed top-0 right-0 h-full w-full bg-watch-gray3 bg-opacity-50 transition-opacity transition-watch ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => toggleMenu()}
      ></div>
      <div
        className={`z-40 md:hidden fixed top-0 right-0 h-full w-5/6 bg-watch-primary transform transition-transform transition-watch ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex mb-4 p-4">
          <button onClick={() => toggleMenu()} className="text-watch-white">
            <Icon name="close" className="w-4" />
          </button>
        </div>
        <div className="px-4">
          {categories.map((category) => (
            <MobileMenuItem
              key={category.id}
              category={category}
              isOpen={activeCategory === category.id}
              toggleCategory={() => toggleCategory(category.id)}
              closeMenu={() => toggleMenu(false)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
