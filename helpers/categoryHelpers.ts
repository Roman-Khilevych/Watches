import { CategoryModel } from '@/models/category';
import { BreadcrumbItemModel } from '@/models/breadcrumb';

export function findBreadcrumbTrail(categories: CategoryModel[], slugs: string[]): BreadcrumbItemModel[] {
  const breadcrumbTrail: BreadcrumbItemModel[] = [];
  let currentCategory: CategoryModel | null = null;
  let firstCategory = true;

  for (const slug of slugs) {
    currentCategory = categories.find((category) => category.slug === slug) || null;
    if (currentCategory) {
      breadcrumbTrail.push({
        name: currentCategory.name,
        slug: firstCategory ? `/categories/${currentCategory.slug}` : currentCategory.slug,
      });
      if (currentCategory?.subcategories?.length) {
        categories = currentCategory.subcategories; // Go deeper into subcategories
      }
      firstCategory = false;
    }
  }

  return breadcrumbTrail;
}

export function findCategoryBySlug(categories: CategoryModel[], slugs: string[]): CategoryModel | null {
  let currentCategory: CategoryModel | null = null;

  for (const slug of slugs) {
    currentCategory = categories.find((category) => category.slug === slug) || null;
    if (currentCategory?.subcategories?.length) {
      categories = currentCategory.subcategories;
    }
  }

  return currentCategory;
}
