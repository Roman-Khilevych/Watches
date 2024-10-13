'use client';

import { ProductModel } from '@/models/product';
import { useSetRecentlyViewedProduct } from '@/hooks/useRecentlyViewed';

interface RecentlyViewedTrackerProps {
  product: ProductModel;
}

const RecentlyViewedTracker: React.FC<RecentlyViewedTrackerProps> = ({ product }) => {
  useSetRecentlyViewedProduct(product);

  return null;
};

export default RecentlyViewedTracker;
