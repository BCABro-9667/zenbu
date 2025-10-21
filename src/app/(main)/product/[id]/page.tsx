
'use client';

import { useState, useMemo, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/cart-context';
import { BuyNowModal } from '@/components/main/buy-now-modal';
import ProductCard from '@/components/main/product-card';
import { ShoppingCart, Zap, Star, Video, FileText } from 'lucide-react';
import type { Product, Category } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Breadcrumb } from '@/components/main/breadcrumb';
import { getProductById, getProducts, getCategories } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | undefined>();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProduct(getProductById(params.id));
    setAllProducts(getProducts());
    setAllCategories(getCategories());
    setIsLoading(false);
  }, [params.id]);


  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts.filter(p => p.category === product.category && p.id !== product.id);
  }, [product, allProducts]);
  
  const category = useMemo(() => {
    if (!product) return undefined;
    return allCategories.find(c => c.name === product.category);
  }, [product, allCategories]);

  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    if (!isLoading && !product) {
      notFound();
    }
  }, [isLoading, product]);


  if (isLoading || !product) {
      return (
          <div className="container py-8">
              <Skeleton className="h-8 w-1/2 mb-6" />
              <div className="grid md:grid-cols-2 gap-12 items-start">
                  <Skeleton className="h-[500px] w-full" />
                  <div className="space-y-6">
                      <Skeleton className="h-10 w-3/4" />
                      <Skeleton className="h-6 w-1/4" />
                      <Skeleton className="h-12 w-1/3" />
                      <Skeleton className="h-24 w-full" />
                      <div className="flex gap-4">
                          <Skeleton className="h-12 w-36" />
                          <Skeleton className="h-12 w-36" />
                      </div>
                  </div>
              </div>
          </div>
      )
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
    { label: product.name },
  ];

  const currentMainImage = mainImage || product.imageUrl;
  const galleryImages = [product.imageUrl, ...(product.galleryImageUrls || [])];

  return (
    <>
      <div className="container py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1 flex flex-col gap-2">
              {galleryImages.map((img, index) => (
                <div 
                  key={index}
                  className={cn(
                    "relative aspect-square rounded-md cursor-pointer border-2",
                    currentMainImage === img ? "border-primary" : "border-transparent"
                  )}
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} gallery image ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
            <div className="col-span-4">
                <Card>
                <CardContent className="p-4">
                    <div className="relative aspect-square w-full">
                    <Image
                        src={currentMainImage}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                        data-ai-hint={product.imageHint}
                    />
                    </div>
                </CardContent>
                </Card>
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">(12 reviews)</span>
            </div>
            <p className="text-4xl font-bold">₹{product.price.toFixed(2)}</p>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold">Category:</span> {product.category}
            </div>
             <div className="text-sm text-green-600 font-semibold">
              In Stock: {product.stock} available
            </div>

            <div className="flex gap-4">
              <Button size="lg" onClick={() => addToCart(product)}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" onClick={() => setIsModalOpen(true)}>
                <Zap className="mr-2 h-5 w-5" />
                Buy Now
              </Button>
            </div>
            <div className="flex gap-4">
              {product.videoUrl && (
                <Button asChild size="lg" variant="outline">
                  <Link href={product.videoUrl} target="_blank">
                    <Video className="mr-2 h-5 w-5" /> Watch Video
                  </Link>
                </Button>
              )}
               {product.brochureUrl && (
                <Button asChild size="lg" variant="outline">
                  <Link href={product.brochureUrl} target="_blank">
                    <FileText className="mr-2 h-5 w-5" /> Download Brochure
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-16 bg-muted/20">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Product Description</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>{product.longDescription}</p>
          </div>
        </div>
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <div className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-10">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}

      <BuyNowModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
