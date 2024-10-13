import { useEffect } from 'react';
import { useCategoryStore } from '@/stores/categoryStore';
import { useProductStore } from '@/stores/productStore';
import { useConfigStore } from '@/stores/configStore';

export const useFetchStoreData = () => {
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fetchConfig = useConfigStore((state) => state.fetchConfig);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchConfig();
  }, [fetchCategories, fetchProducts, fetchConfig]);
};
