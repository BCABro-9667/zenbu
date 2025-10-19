'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { BuyNowModal } from './buy-now-modal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <>
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col group">
        <Link href={`/product/${product.id}`}>
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
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-lg font-semibold leading-tight mb-2 h-14">{product.name}</CardTitle>
            <p className="text-xl font-bold text-primary-foreground/80 mt-auto">₹{product.price.toFixed(2)}</p>
          </CardContent>
        </Link>
        <CardFooter className="p-4 pt-0">
          <div className="flex w-full gap-2">
            <Button size="sm" className="w-full" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button size="sm" variant="outline" className="w-full" onClick={handleBuyNow}>
              <Zap className="mr-2 h-4 w-4" /> Buy Now
            </Button>
          </div>
        </CardFooter>
      </Card>
      <BuyNowModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
