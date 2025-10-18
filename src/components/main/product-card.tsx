'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/definitions';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { BuyNowModal } from './buy-now-modal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="w-full overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-64 w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold leading-tight mb-2 h-14">{product.name}</CardTitle>
          <p className="text-xl font-bold text-primary-foreground/80">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => addToCart(product)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Zap className="mr-2 h-4 w-4" />
            Buy Now
          </Button>
        </CardFooter>
      </Card>
      <BuyNowModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
