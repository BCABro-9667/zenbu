'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById, getProducts } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/cart-context';
import { BuyNowModal } from '@/components/main/buy-now-modal';
import ProductCard from '@/components/main/product-card';
import { ShoppingCart, Zap, Star, Video, FileText } from 'lucide-react';
import type { Product } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  
  const product = getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  const [mainImage, setMainImage] = useState(product.imageUrl);

  const relatedProducts = getProducts().filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const galleryImages = [product.imageUrl, ...product.galleryImageUrls];

  return (
    <>
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1 flex flex-col gap-2">
              {galleryImages.map((img, index) => (
                <div 
                  key={index}
                  className={cn(
                    "relative aspect-square rounded-md cursor-pointer border-2",
                    mainImage === img ? "border-primary" : "border-transparent"
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
                        src={mainImage}
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

      {relatedProducts.length > 0 && (
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
