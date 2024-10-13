import Link from 'next/link';
import { CategoryModel } from '@/models/category';
import BorderHoverEffect from '@/components/UI/BorderHoverEffect';

interface CategoryItemProps {
  category: CategoryModel;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  return (
    <div className="relative group/category flex justify-center">
      <div className="flex justify-between items-center">
        <Link href={`/categories/${category.slug}`} className="py-4 uppercase">
          {category.name}
        </Link>
        <BorderHoverEffect groupName="category" />
      </div>

      {category.subcategories && (
        <div
          className={
            'hidden group-hover/category:block absolute right-0 top-full w-max px-8 py-4 bg-watch-primary text-watch-white shadow-watch-line-bottom'
          }
        >
          <ul>
            {category.subcategories.map((subcategory) => (
              <li key={subcategory.id} className="relative group/subcategory py-4">
                <Link href={`/categories/${category.slug}/${subcategory.slug}`} className="uppercase">
                  {subcategory.name}
                </Link>
                <BorderHoverEffect groupName="subcategory" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
