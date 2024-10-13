import { create } from 'zustand';
import { ProductModel } from '@/models/product';
import { getProducts } from '@/helpers/firebaseHelpers';

interface ProductState {
  products: ProductModel[];
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  fetchProducts: async () => {
    const products = await getProducts();
    set({ products });
  },
}));
