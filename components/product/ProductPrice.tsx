import { formatPrice } from '@/helpers/priceHelper';

interface ProductPriceProps {
  price: string;
  priceSell?: string;
  className?: string;
  regularFontSize?: string;
  oldFontSize?: string;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  priceSell,
  className,
  regularFontSize = 'text-2xl',
  oldFontSize = 'text-xl',
}) => {
  return (
    <div
      className={`flex items-end gap-x-2 ${regularFontSize}
      ${className}`}
    >
      {!priceSell && <span className="font-bold">{formatPrice(price)}</span>}
      {priceSell && (
        <>
          <span className="font-bold">{formatPrice(priceSell)}</span>
          <span className={`text-watch-gray2 line-through ${oldFontSize}`}>{formatPrice(price)}</span>
        </>
      )}
    </div>
  );
};

export default ProductPrice;
