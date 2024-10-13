'use client';

import { useEffect, useState } from 'react';
import { BreadcrumbItemModel } from '@/models/breadcrumb';
import { ProductModel } from '@/models/product';
import { findCategoryWithProductTrail } from '@/helpers/breadcrumbHelpers';
import { useProductStore } from '@/stores/productStore';
import { useCategoryStore } from '@/stores/categoryStore';
import Breadcrumbs from './Breadcrumbs';

interface ProductBreadcrumbProps {
  productSku: string;
  productName: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ productSku, productName }) => {
  const [breadcrumbTrail, setBreadcrumbTrail] = useState<BreadcrumbItemModel[] | null>(null);
  const { products } = useProductStore();
  const { categories } = useCategoryStore();

  useEffect(() => {
    const storedBreadcrumbs = localStorage.getItem('productBreadcrumbs');
    const breadcrumbsData = storedBreadcrumbs ? JSON.parse(storedBreadcrumbs) : {};
    let trail: BreadcrumbItemModel[] | null = null;

    if (breadcrumbsData[productSku]) {
      trail = breadcrumbsData[productSku];
    } else {
      const product = products?.find((p: ProductModel) => p.sku === productSku);
      if (!product) return;

      trail = findCategoryWithProductTrail(categories, products, product.sku);
    }

    if (trail) {
      if (!trail.some((item) => item.name === productName)) {
        trail.push({ name: productName });
      }
      setBreadcrumbTrail(trail);
    }
  }, [productSku, products, categories, productName]);

  return breadcrumbTrail ? <Breadcrumbs slugs={breadcrumbTrail} /> : null;
};

export default ProductBreadcrumb;
