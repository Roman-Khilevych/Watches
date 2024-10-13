'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProductModel } from '@/models/product';
import { BreadcrumbItemModel } from '@/models/breadcrumb';
import StyledLink from '@/components/UI/StyledLink';
import ProductPrice from '@/components/product/ProductPrice';

interface ProductItemProps {
  product: ProductModel;
  currentBreadcrumbTrail?: BreadcrumbItemModel[];
}

const ProductItem: React.FC<ProductItemProps> = ({ product, currentBreadcrumbTrail }) => {
  const productUrl: string = `/products/${product.sku}`;

  function handleProductClick() {
    const storedBreadcrumbs = localStorage.getItem('productBreadcrumbs');
    const breadcrumbsData = storedBreadcrumbs ? JSON.parse(storedBreadcrumbs) : {};
    breadcrumbsData[product.sku] = currentBreadcrumbTrail;
    localStorage.setItem('productBreadcrumbs', JSON.stringify(breadcrumbsData));
  }

  return (
    <>
      <Link href={productUrl} onClick={handleProductClick}>
        <div className="w-full pt-[100%] relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            priority
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="text-xs text-watch-gray2 mt-4 uppercase">
        <span>{product.brand}</span>
      </div>
      <div className="font-watch-secondary">
        <StyledLink href={productUrl} onClick={handleProductClick}>
          <span>{product.name}</span>
        </StyledLink>
      </div>
      <ProductPrice
        price={product.price}
        priceSell={product.priceSell}
        className="mt-2"
        regularFontSize="text-xl"
        oldFontSize="text-lg"
      />
    </>
  );
};

export default ProductItem;
