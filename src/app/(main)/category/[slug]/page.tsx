
'use client';

import ProductCard from '@/components/main/product-card';
import { notFound } from 'next/navigation';
import { getProducts, getCategoryBySlug, getCategories } from '@/lib/data';
import { useMemo, useState, useEffect } from 'react';
import type { Product, Category } from '@/lib/definitions';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, setCategory] = useState<Category | undefined>();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    setCategory(getCategoryBySlug(params.slug));
    setAllProducts(getProducts());
    setIsLoading(false);
  }, [params.slug]);
  
  const filteredAndSortedProducts = useMemo(() => {
    if (!category) return [];
    let products = allProducts.filter(p => p.category === category.name);

    if (searchTerm) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOrder) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
      default:
        products.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));
        break;
    }

    return products;
  }, [allProducts, category, searchTerm, sortOrder]);

  useEffect(() => {
    if (!isLoading && !category) {
        notFound();
    }
  }, [isLoading, category]);

  if (isLoading) {
      return (
        <div className="container py-12">
            <h1 className="text-4xl font-bold tracking-tight text-center mb-4">Loading...</h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
                <Skeleton className="h-6 w-3/4 mx-auto" />
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-8 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
      )
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10 h-11"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-4">
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-[200px] h-11">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {(filteredAndSortedProducts && filteredAndSortedProducts.length > 0) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-dashed border-2 rounded-lg">
            <h2 className="text-2xl font-semibold">No Products Found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filter settings.</p>
        </div>
      )}
    </div>
  );
}
