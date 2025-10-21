
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getCategories } from '@/lib/data';
import type { Category } from '@/lib/definitions';
import { Skeleton } from '../ui/skeleton';
import { useMemo, useState, useEffect } from 'react';

export default function CategoryCircles() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCategories(getCategories());
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
        <section id="categories" className="container py-12">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-10">Shop by Category</h2>
            <div className="flex justify-center gap-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                        <Skeleton className="h-40 w-40 rounded-full" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                ))}
            </div>
        </section>
    )
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section id="categories" className="container py-12">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-10">Shop by Category</h2>
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {categories.map((category) => (
            <CarouselItem key={category.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
              <Link href={`/category/${category.slug}`} className="group flex flex-col items-center gap-3 text-center">
                <div className="relative h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full border-4 border-transparent group-hover:border-primary transition-all duration-300">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                    data-ai-hint={category.imageHint}
                  />
                </div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden md:inline-flex" />
        <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden md:inline-flex" />
      </Carousel>
    </section>
  );
}
