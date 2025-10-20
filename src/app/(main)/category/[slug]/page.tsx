
import ProductCard from '@/components/main/product-card';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }
  
  const products = getProductsByCategory(params.slug);

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold tracking-tight text-center mb-4">{category.name}</h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Browse our curated collection of high-quality products for your {category.name.toLowerCase()}.
      </p>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">No Products Found</h2>
            <p className="text-muted-foreground mt-2">There are currently no products available in this category.</p>
        </div>
      )}
    </div>
  );
}
