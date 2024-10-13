import { ProductModel } from '@/models/product';

export function formatPrice(price: string): string {
  const parsedPrice = parseFloat(price);
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  return formatter.format(parsedPrice);
}

export function getEffectivePrice(product: ProductModel) {
  const price = parseFloat(product.price);
  const priceSell = product.priceSell ? parseFloat(product.priceSell) : null;
  const effectivePrice = priceSell && priceSell < price ? priceSell : price;

  return effectivePrice;
}
