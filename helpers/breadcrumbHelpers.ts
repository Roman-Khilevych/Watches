import { BreadcrumbItemModel } from '@/models/breadcrumb';
import { CategoryModel } from '@/models/category';
import { ProductModel } from '@/models/product';

const categoryHasProduct = (products: ProductModel[], categoryId: number, productId: string): boolean => {
  return products.some((product: ProductModel) => product.sku === productId && product.categories.includes(categoryId));
};

export const findCategoryWithProductTrail = (
  categories: CategoryModel[],
  products: ProductModel[],
  productId: string,
  trail: BreadcrumbItemModel[] = []
): BreadcrumbItemModel[] | null => {
  for (const category of categories) {
    const newTrail = [...trail, { name: category.name, slug: `/categories/${category.slug}` }];

    if (categoryHasProduct(products, category.id, productId)) {
      return newTrail;
    }

    if (category?.subcategories?.length) {
      const subcategoryTrail = findCategoryWithProductTrail(category.subcategories, products, productId, newTrail);
      if (subcategoryTrail) {
        return subcategoryTrail;
      }
    }
  }

  return null;
};
