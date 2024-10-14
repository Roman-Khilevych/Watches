import Image from 'next/image';
import { getUrl } from '@/helpers/urlHelper';

interface BannerProps {
  title: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, text, imageUrl }) => {
  return (
    <div className="relative bg-watch-primary text-watch-white shadow-watch-line-bottom overflow-hidden min-h-64">
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={getUrl(imageUrl)}
            alt=""
            fill
            priority={true}
            className="pointer-events-none object-cover object-right"
          />
        </div>
      )}
      <div
        className="absolute inset-0 z-1"
        style={{ backgroundImage: 'linear-gradient(to top, #040404a8, #363636a6)' }}
      ></div>
      <div className="relative container max-w-screen-lg py-16 z-10">
        {title && <div className="text-center text-3xl uppercase">{title}</div>}
        {subtitle && <div className="mt-8 text-center font-watch-secondary text-3xl">{subtitle}</div>}
        {text && <div className="mt-8 text-center text-xl">{text}</div>}
      </div>
    </div>
  );
};

export default Banner;
