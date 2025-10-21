import type { Product } from '@/lib/definitions';
import ProductCard from './product-card';
import { Skeleton } from '../ui/skeleton';

interface ProductSectionProps {
  title: string;
  products: Product[];
  isLoading?: boolean;
}

export default function ProductSection({ title, products, isLoading }: ProductSectionProps) {
  if (isLoading) {
    return (
      <section id="products" className="container py-12">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-10">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
             <div key={i} className="space-y-2">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-8 w-1/2" />
             </div>
          ))}
        </div>
      </section>
    )
  }
  
  if (products.length === 0) return null;

  return (
    <section id="products" className="container py-12">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-10">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
