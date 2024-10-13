import { create } from 'zustand';
import { CategoryModel } from '@/models/category';
import { getCategories } from '@/helpers/firebaseHelpers';

interface CategoryState {
  categories: CategoryModel[];
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
}));
