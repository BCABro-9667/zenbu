'use client';

import ProductCard from '@/components/main/product-card';
import { notFound } from 'next/navigation';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { useMemo } from 'react';
import type { Product, Category } from '@/lib/definitions';
import { useDoc } from '@/firebase/firestore/use-doc';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const firestore = useFirestore();
  
  // There's no good way to get a single document by a field other than ID with hooks, so we query for it.
  const categoryQuery = useMemoFirebase(() => query(collection(firestore, 'categories'), where('slug', '==', params.slug)), [firestore, params.slug]);
  const { data: categoryData, isLoading: isCategoryLoading } = useCollection<Category>(categoryQuery);
  const category = useMemo(() => categoryData?.[0], [categoryData]);

  const productsQuery = useMemoFirebase(() => category ? query(collection(firestore, 'products'), where('category', '==', category.name)) : null, [firestore, category]);
  const { data: products, isLoading: areProductsLoading } = useCollection<Product>(productsQuery);

  if (!isCategoryLoading && !category) {
    notFound();
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold tracking-tight text-center mb-4">{category?.name}</h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
        Browse our curated collection of high-quality products for your {category?.name?.toLowerCase()}.
      </p>
      
      {(!areProductsLoading && products && products.length > 0) ? (
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
