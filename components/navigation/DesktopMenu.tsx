import { CategoryModel } from '@/models/category';
import DesktopMenuItem from './DesktopMenuItem';

interface DesktopMenuProps {
  categories: CategoryModel[];
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ categories }) => {
  return (
    <div className="hidden md:flex justify-center space-x-8 h-full">
      {categories.map((category) => (
        <DesktopMenuItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default DesktopMenu;
