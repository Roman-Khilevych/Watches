import { ProductModel } from '@/models/product';
import { GridModeModel } from '@/models/category';
import { findBreadcrumbTrail } from '@/helpers/categoryHelpers';
import ProductItem from '@/components/product/ProductItem';
import { useCategoryStore } from '@/stores/categoryStore';

interface ProductGridProps {
  slug: string[];
  products: ProductModel[];
  gridMode: GridModeModel;
}

const ProductGrid: React.FC<ProductGridProps> = ({ slug, products, gridMode }) => {
  const { categories } = useCategoryStore();
  const breadcrumbTrail = findBreadcrumbTrail(categories, slug);

  if (!products.length) return <div className="text-center">The are no products matching your query.</div>;

  return (
    <ul
      className={`grid gap-6
    ${
      gridMode === 'big'
        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'
        : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4'
    }`}
    >
      {products.map((product) => (
        <li key={product.sku}>
          <ProductItem product={product} currentBreadcrumbTrail={breadcrumbTrail} />
        </li>
      ))}
    </ul>
  );
};

export default ProductGrid;
