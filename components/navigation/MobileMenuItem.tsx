import Link from 'next/link';
import { useRef } from 'react';
import { CategoryModel } from '@/models/category';
import Icon from '@/components/UI/Icon';

interface MobileMenuItemProps {
  category: CategoryModel;
  isOpen: boolean;
  toggleCategory: () => void;
  closeMenu: () => void;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ category, isOpen = false, toggleCategory, closeMenu }) => {
  const subcategoryRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col border-b-2 border-watch-white">
      <div className="flex justify-between items-center">
        <Link href={`/categories/${category.slug}`} className="py-4 uppercase" onClick={closeMenu}>
          {category.name}
        </Link>
        {category.subcategories && (
          <button onClick={toggleCategory} className="w-full h-full flex justify-end ml-4 text-watch-white">
            <Icon name={isOpen ? 'collapse' : 'expand'} className="w-5" />
          </button>
        )}
      </div>

      {category.subcategories && (
        <div
          ref={subcategoryRef}
          className={`text-watch-gray2 overflow-hidden transition-max-height transition-watch`}
          style={{
            maxHeight: isOpen ? `${subcategoryRef.current?.scrollHeight}px` : '0px',
          }}
        >
          <ul className="px-4 py-4 border-t-2 border-watch-gray2">
            {category.subcategories.map((subcategory) => (
              <li key={subcategory.id} className="text-sm py-2">
                <Link
                  href={`/categories/${category.slug}/${subcategory.slug}`}
                  className="uppercase"
                  onClick={closeMenu}
                >
                  {subcategory.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenuItem;
