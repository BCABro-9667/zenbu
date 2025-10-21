
'use client';

import HeroSlider from '@/components/main/hero-slider';
import CategoryCircles from '@/components/main/category-circles';
import ProductSection from '@/components/main/product-section';
import BigBanner from '@/components/main/big-banner';
import { useMemo, useState, useEffect } from 'react';
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/definitions';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAllProducts(getProducts());
    setIsLoading(false);
  }, []);

  const topRatedProducts = useMemo(() => allProducts?.filter(p => p.isTopRated).slice(0, 4) || [], [allProducts]);
  const topSaleProducts = useMemo(() => allProducts?.filter(p => p.isTopSale).slice(0, 4) || [], [allProducts]);
  const recentProducts = useMemo(() => allProducts?.filter(p => p.isRecent).slice(0, 8) || [], [allProducts]);

  return (
    <div className="space-y-12 pb-20">
      <div className="-mb-12">
        <HeroSlider />
      </div>
      <CategoryCircles />
      <ProductSection title="Top Rated Products" products={topRatedProducts} isLoading={isLoading} />
      <ProductSection title="Top Selling Products" products={topSaleProducts} isLoading={isLoading}/>
      <BigBanner />
      <ProductSection title="Recent Products" products={recentProducts} isLoading={isLoading}/>
    </div>
  );
}
