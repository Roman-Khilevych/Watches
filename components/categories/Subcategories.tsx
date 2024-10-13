import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CategoryModel } from '@/models/category';

interface SubcategoriesProps {
  subcategories: CategoryModel[] | undefined;
}

const Subcategories: React.FC<SubcategoriesProps> = ({ subcategories }) => {
  const currentPath = usePathname();

  if (!subcategories || !subcategories.length) {
    return null;
  }

  return (
    <div className="mb-8">
      <p className="block uppercase font-watch-secondary font-bold mb-3">
        <span>Subcategories:</span>
      </p>
      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory.id} className="uppercase mb-1 hover:text-watch-gray2 transition-colors transition-watch">
            <Link href={`${currentPath}/${subcategory.slug}`}>{subcategory.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subcategories;
