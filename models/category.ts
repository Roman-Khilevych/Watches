export interface CategoryModel {
  id: number;
  name: string;
  slug: string;
  subtitle?: string;
  description?: string;
  image?: string;
  subcategories?: CategoryModel[];
}

export type GridModeModel = 'big' | 'small';
