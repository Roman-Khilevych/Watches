import { ProductModel } from '@/models/product';
import { getConfig, getProducts } from '@/helpers/firebaseHelpers';
import ProductSlider from './ProductSlider';

const NewProductSlider: React.FC = async () => {
  const config = await getConfig();
  const products = await getProducts();
  const newProducts: ProductModel[] = products.filter((product: ProductModel) => product.new);
  const newProductsSliderConfig = config?.homePage.sliders.newProducts;

  return (
    newProductsSliderConfig.enabled &&
    newProducts.length && (
      <div className="container py-8">
        <div className="text-3xl font-watch-secondary mb-12 text-center">{newProductsSliderConfig.title}</div>
        <ProductSlider products={newProducts} sliderName="new" />
      </div>
    )
  );
};

export default NewProductSlider;
