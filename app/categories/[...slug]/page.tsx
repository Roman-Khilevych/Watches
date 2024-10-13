import { notFound } from 'next/navigation';
import { CategoryModel } from '@/models/category';
import { ProductModel } from '@/models/product';
import { getCategories, getProducts } from '@/helpers/firebaseHelpers';
import { findBreadcrumbTrail, findCategoryBySlug } from '@/helpers/categoryHelpers';
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs';
import ProductController from '@/components/categories/ProductController';
import Banner from '@/components/widgets/Banner';

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const categories: CategoryModel[] = await getCategories();
  const { slug } = params;
  const currentCategory = findCategoryBySlug(categories, slug);
  return {
    title: currentCategory?.name,
    description: currentCategory?.description,
  };
}

interface CategoryPageProps {
  params: { slug: string[] };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const { slug } = params;
  const categories: CategoryModel[] = await getCategories();
  const products: ProductModel[] = await getProducts();

  const currentCategory = findCategoryBySlug(categories, slug);
  const subcategories = currentCategory?.subcategories;
  const breadcrumbTrail = findBreadcrumbTrail(categories, slug);

  if (!currentCategory) return notFound();

  const productsInCategory = products.filter((product) =>
    currentCategory ? product.categories.includes(currentCategory.id) : false
  );

  return (
    <div className="py-8">
      <Breadcrumbs slugs={breadcrumbTrail} />
      <Banner
        title={currentCategory.name}
        subtitle={currentCategory.subtitle}
        text={currentCategory.description}
        imageUrl={currentCategory.image}
      />
      <ProductController slug={slug} products={productsInCategory} subcategories={subcategories} />
    </div>
  );
};

export default CategoryPage;
