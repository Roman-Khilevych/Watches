'use client';

import Icon from '@/components/UI/Icon';
import 'swiper/swiper-bundle.css';
import { getUrl } from '@/helpers/urlHelper';
import Image from 'next/image';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Gallery.module.css';

interface GalleryProps {
  name: string;
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ name, images }) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={10}
        speed={300}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: '.gallery-pagination',
          bulletClass: styles.paginationBullet,
          bulletActiveClass: styles.paginationBulletActive,
        }}
        navigation={{
          nextEl: '.gallery-next',
          prevEl: '.gallery-prev',
        }}
        loop={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="aspect-square !flex items-center justify-center">
            <Image src={getUrl(image)} alt={name} width={500} height={500} className="w-full max-h-full object-contain"
                   priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={`justify-center mt-8 ${images.length > 1 ? 'flex' : 'hidden'}`}>
        <div className="flex items-center">
          <button
            className="gallery-prev text-watch-primary hover:text-watch-gray2 transition-colors transition-watch p-2"
          >
            <Icon name="arrow-left" className="w-3"/>
          </button>
          <div className="flex space-x-3 gallery-pagination mx-6"></div>
          <button
            className="gallery-next text-watch-primary hover:text-watch-gray2 transition-colors transition-watch p-2"
          >
            <Icon name="arrow-right" className="w-3"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
