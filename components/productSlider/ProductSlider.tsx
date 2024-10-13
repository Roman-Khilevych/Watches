'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { ProductModel } from '@/models/product';
import ProductItem from '@/components/product/ProductItem';
import Icon from '@/components/UI/Icon';
import 'swiper/swiper-bundle.css';
import styles from './ProductSlider.module.css';

interface ProductSliderProps {
  products: ProductModel[];
  maxProducts?: number;
  sliderName?: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, maxProducts = 10, sliderName = '' }) => {
  sliderName = `${sliderName}-` || '';

  if (products.length > maxProducts) {
    products = products.slice(0, maxProducts);
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={24}
        speed={300}
        pagination={{
          clickable: true,
          el: `.${sliderName}slider-pagination`,
          bulletClass: styles.paginationBullet,
          bulletActiveClass: styles.paginationBulletActive,
        }}
        navigation={{
          nextEl: `.${sliderName}slider-next`,
          prevEl: `.${sliderName}slider-prev`,
        }}
        loop={true}
        slidesPerGroup={1}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-8">
        <div className="flex items-center">
          <button
            className={`${sliderName}slider-prev text-watch-primary hover:text-watch-gray2 transition-colors transition-watch p-2`}
          >
            <Icon name="arrow-left" className="w-3" />
          </button>
          <div className={`flex space-x-3 ${sliderName}slider-pagination mx-6`}></div>
          <button
            className={`${sliderName}slider-next text-watch-primary hover:text-watch-gray2 transition-colors transition-watch p-2`}
          >
            <Icon name="arrow-right" className="w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
