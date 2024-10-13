import { ConfigModel } from '@/models/config';
import { getConfig } from '@/helpers/firebaseHelpers';
import NewProductSlider from '@/components/productSlider/NewProductsSlider';
import OnSaleProductsSlider from '@/components/productSlider/OnSaleProductsSlider';
import RecentlyViewedProductsSlider from '@/components/productSlider/RecentlyViewedProductsSlider';
import Banner from '@/components/widgets/Banner';

const HomePage: React.FC = async () => {
  const config = (await getConfig()) as ConfigModel;

  return (
    <>
      <Banner
        title={config.homePage.banner.title}
        subtitle={config.homePage.banner.subtitle}
        text={config.homePage.banner.text}
        imageUrl={config.homePage.banner.imageUrl}
      />
      <NewProductSlider />
      <OnSaleProductsSlider />
      <RecentlyViewedProductsSlider />
    </>
  );
};

export default HomePage;
