import { CategoryModel } from '@/models/category';
import { getCategories } from '@/helpers/firebaseHelpers';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

const Navigation: React.FC = async () => {
  const categories: CategoryModel[] = await getCategories();

  return (
    <nav className="flex items-center font-watch-secondary tracking-normal">
      <DesktopMenu categories={categories} />
      <MobileMenu categories={categories} />
    </nav>
  );
};

export default Navigation;
