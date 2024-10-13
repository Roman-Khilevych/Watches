export interface ProductModel {
  name: string;
  sku: string;
  brand: string;
  price: string;
  priceSell?: string;
  description: string;
  specification?: string;
  caseSize?: string;
  glassMaterial?: string;
  movement?: string;
  categories: number[];
  images: string[];
  new?: boolean;
}
