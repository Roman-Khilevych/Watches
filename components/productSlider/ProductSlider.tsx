'use client';

import ProductItem from '@/components/product/ProductItem';
import Icon from '@/components/UI/Icon';
import 'swiper/swiper-bundle.css';
import { ProductModel } from '@/models/product';
import { useState } from 'react';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './ProductSlider.module.css';

interface ProductSliderProps {
  products: ProductModel[];
  maxProducts?: number;
  sliderName?: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, maxProducts = 10, sliderName = '' }) => {
  const [isSwiperReady, setIsSwiperReady] = useState(false);
  const sliderPrefix = sliderName ? `${sliderName}-` : '';

  if (products.length > maxProducts) {
    products = products.slice(0, maxProducts);
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={24}
        speed={300}
        onSwiper={() => setIsSwiperReady(true)}
        pagination={{
          clickable: true,
          el: `.${sliderPrefix}slider-pagination`,
          bulletClass: styles.paginationBullet,
          bulletActiveClass: styles.paginationBulletActive,
        }}
        navigation={{
          nextEl: `.${sliderPrefix}slider-next`,
          prevEl: `.${sliderPrefix}slider-prev`,
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
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <ProductItem product={product}/>
          </SwiperSlide>
        ))}
      </Swiper>
      {products.length > 1 &&
        <div className="flex justify-center mt-8">
          <div className="flex items-center">
            <button
              disabled={!isSwiperReady}
              className={`${sliderPrefix}slider-prev text-watch-primary hover:text-watch-gray2 transition-colors transition-watch p-2 disabled:text-watch-gray2`}
            >
              <Icon name="arrow-left" className="w-3"/>
            </button>
            <div className={`flex space-x-3 ${sliderPrefix}slider-pagination mx-6`}></div>
            <button
              disabled={!isSwiperReady}
              className={`${sliderPrefix}slider-next text-watch-primary disabled:text-watch-gray2 hover:text-watch-gray2 transition-colors transition-watch p-2`}
            >
              <Icon name="arrow-right" className="w-3"/>
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default ProductSlider;
