
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { getHeroSliderImages } from '@/lib/data';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function HeroSlider() {
  const heroImages = getHeroSliderImages();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <section className="w-full relative">
      <Carousel 
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
        ]}
        className="overflow-hidden rounded-[24px]"
      >
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] w-full">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Smart Solutions for Home & Office</h1>
                  <p className="mt-4 max-w-2xl text-lg text-neutral-200">
                    High-quality, innovative appliances to enhance your space. Customizable options available!
                  </p>
                  <Button asChild size="lg" className="mt-8">
                    <Link href="/products">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:inline-flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:inline-flex" />
      </Carousel>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {heroImages.map((_, index) => (
            <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                    "h-2 w-2 rounded-full bg-white/50 transition-all",
                    current === index ? "w-4 bg-white" : "hover:bg-white/75"
                )}
                aria-label={`Go to slide ${index + 1}`}
            />
        ))}
      </div>
    </section>
  );
}
