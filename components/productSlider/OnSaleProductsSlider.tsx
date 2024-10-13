import { ProductModel } from '@/models/product';
import { getConfig, getProducts } from '@/helpers/firebaseHelpers';
import ProductSlider from './ProductSlider';

const OnSaleProductsSlider: React.FC = async () => {
  const config = await getConfig();
  const products = await getProducts();
  const onSaleProducts: ProductModel[] = products.filter((product: ProductModel) => product.priceSell);
  const onSaleProductsSliderConfig = config?.homePage.sliders.onSaleProducts;

  return (
    onSaleProductsSliderConfig.enabled &&
    onSaleProducts.length && (
      <div className="container py-8">
        <div className="text-3xl font-watch-secondary mb-12 text-center">{onSaleProductsSliderConfig.title}</div>
        <ProductSlider products={onSaleProducts} sliderName="onSale" />
      </div>
    )
  );
};

export default OnSaleProductsSlider;
