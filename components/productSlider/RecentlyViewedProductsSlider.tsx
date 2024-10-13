'use client';

import { ProductModel } from '@/models/product';
import { useGetRecentlyViewedProducts } from '@/hooks/useRecentlyViewed';
import { useConfigStore } from '@/stores/configStore';
import ProductSlider from './ProductSlider';

const RecentlyViewedProductsSlider: React.FC = () => {
  const { config } = useConfigStore();
  const recentlyViewedProducts: ProductModel[] = useGetRecentlyViewedProducts();
  const recentlyViewedSliderConfigEnabled: boolean = config?.homePage.sliders.recentlyViewed.enabled || false;
  const recentlyViewedSliderConfigTitle: string = config?.homePage.sliders.recentlyViewed.title || '';

  return (
    recentlyViewedSliderConfigEnabled &&
    recentlyViewedProducts.length > 0 && (
      <div className="container py-8">
        <div className="text-3xl font-watch-secondary mb-12 text-center">{recentlyViewedSliderConfigTitle}</div>
        <ProductSlider products={recentlyViewedProducts} sliderName="recentlyViewed" />
      </div>
    )
  );
};

export default RecentlyViewedProductsSlider;
