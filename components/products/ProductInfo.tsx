import ProductPrice from '@/components/product/ProductPrice';
import CreateOrder from './CreateOrder';

interface ProductInfoProps {
  name: string;
  brand: string;
  sku: string;
  price: string;
  priceSell?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ name, brand, sku, price, priceSell }) => {
  return (
    <div className="w-full my-8 md:mb-0">
      <div>
        <span>{brand}</span>
      </div>
      <div className="font-watch-secondary text-2xl lg:text-3xl tracking-tight mt-3">
        <span>{name}</span>
      </div>
      <div className="text-watch-gray2">
        <span>SKU: {sku}</span>
      </div>
      <ProductPrice price={price} priceSell={priceSell} className="mt-3" />
      <CreateOrder name={name} sku={sku} className="mt-6" />
    </div>
  );
};

export default ProductInfo;
