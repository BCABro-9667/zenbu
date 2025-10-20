import HeroSlider from '@/components/main/hero-slider';
import CategoryCircles from '@/components/main/category-circles';
import ProductSection from '@/components/main/product-section';
import BigBanner from '@/components/main/big-banner';
import { getProducts } from '@/lib/data';

export default function HomePage() {
  const allProducts = getProducts();

  const topRatedProducts = allProducts.filter(p => p.isTopRated).slice(0, 4);
  const topSaleProducts = allProducts.filter(p => p.isTopSale).slice(0, 4);
  const recentProducts = allProducts.filter(p => p.isRecent).slice(0, 8);

  return (
    <div className="space-y-12 md:space-y-20 pb-20">
      <div className="mt-2.5">
        <HeroSlider />
      </div>
      <CategoryCircles />
      <ProductSection title="Top Rated Products" products={topRatedProducts} />
      <ProductSection title="Top Selling Products" products={topSaleProducts} />
      <BigBanner />
      <ProductSection title="Recent Products" products={recentProducts} />
    </div>
  );
}
