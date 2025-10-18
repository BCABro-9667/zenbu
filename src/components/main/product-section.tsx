import type { Product } from '@/lib/definitions';
import ProductCard from './product-card';

interface ProductSectionProps {
  title: string;
  products: Product[];
}

export default function ProductSection({ title, products }: ProductSectionProps) {
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
