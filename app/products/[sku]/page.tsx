import { notFound } from 'next/navigation';
import { ProductModel } from '@/models/product';
import { getProducts } from '@/helpers/firebaseHelpers';
import ProductBreadcrumb from '@/components/breadcrumbs/ProductBreadcrumb';
import Gallery from '@/components/products/Gallery';
import ProductInfo from '@/components/products/ProductInfo';
import Detailed from '@/components/products/Detailed';
import RecentlyViewedTracker from '@/components/products/RecentlyViewedTracker';
import RecentlyViewedProductsSlider from '@/components/productSlider/RecentlyViewedProductsSlider';

export async function generateMetadata({ params }: { params: { sku: string } }) {
  const products = await getProducts();
  const productSku = params.sku;
  const product: ProductModel | undefined = products.find((productsItem) => productsItem.sku === productSku);
  return {
    title: product?.name,
    description: product?.description,
  };
}

interface ProductDetailsPageProps {
  params: { sku: string };
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({ params }) => {
  const products = await getProducts();
  const productSku = params.sku;
  const product: ProductModel | undefined = products.find((productsItem) => productsItem.sku === productSku);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <RecentlyViewedTracker product={product} />
      <div className="container py-6">
        <ProductBreadcrumb productSku={productSku} productName={product.name} />
        <div className="max-w-screen-xl mx-auto flex flex-wrap py-12">
          <div className="w-full md:w-7/12 md:pr-4 lg:w-6/12 lg:pr-8">
            <Gallery name={product.name} images={product.images} />
          </div>
          <div className="flex items-center w-full md:w-5/12 md:pl-4 lg:w-6/12 lg:pl-8">
            <ProductInfo
              name={product.name}
              brand={product.brand}
              sku={product.sku}
              price={product.price}
              priceSell={product.priceSell}
            />
          </div>
        </div>
      </div>
      <Detailed description={product.description} specification={product.specification} />
      <RecentlyViewedProductsSlider />
    </>
  );
};

export default ProductDetailsPage;
