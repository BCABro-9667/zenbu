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
import { ShoppingCart, Zap, Star } from 'lucide-react';
import type { Product } from '@/lib/definitions';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  
  const product = getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = getProducts().filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-square w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                  data-ai-hint={product.imageHint}
                />
              </div>
            </CardContent>
          </Card>
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
          </div>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="py-16 bg-muted/40">
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
