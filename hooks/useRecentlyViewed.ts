import { useEffect, useState } from 'react';
import { ProductModel } from '@/models/product';

const RECENTLY_VIEWED_KEY = 'recentlyViewed';

export const useSetRecentlyViewedProduct = (product: ProductModel | undefined, maxItems: number = 12): void => {
  useEffect(() => {
    if (!product || typeof window === 'undefined') return; // Ensure product exist and it's running on the client-side

    let recentlyViewed: ProductModel[] = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
    recentlyViewed = recentlyViewed.filter((filteredProduct) => filteredProduct.sku !== product.sku);
    recentlyViewed.unshift(product);

    if (recentlyViewed.length > maxItems) {
      recentlyViewed = recentlyViewed.slice(0, maxItems);
    }

    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
  }, [product, maxItems]);
};

export const useGetRecentlyViewedProducts = (): ProductModel[] => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure it's running on the client-side

    const storedProducts = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (storedProducts) {
      setRecentlyViewedProducts(JSON.parse(storedProducts) as ProductModel[]);
    }
  }, []);

  return recentlyViewedProducts;
};
