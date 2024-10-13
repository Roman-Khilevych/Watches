import { ProductModel } from '@/models/product';
import { getEffectivePrice } from '@/helpers/priceHelper';

export function sortProducts(products: ProductModel[], sortBy: string): ProductModel[] {
  return products.slice().sort((productA, productB) => {
    const priceA = getEffectivePrice(productA);
    const priceB = getEffectivePrice(productB);

    switch (sortBy) {
      case 'price-asc':
        return priceA - priceB;

      case 'price-desc':
        return priceB - priceA;

      case 'name-asc':
        return productA.name.localeCompare(productB.name);

      case 'name-desc':
        return productB.name.localeCompare(productA.name);
    }

    return 0;
  });
}
