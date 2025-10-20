'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { getHeroSliderImages } from '@/lib/data';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function HeroSlider() {
  const heroImages = getHeroSliderImages();

  return (
    <section className="w-full">
      <Carousel 
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
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Discover Modern Living</h1>
                  <p className="mt-4 max-w-2xl text-lg text-neutral-200">
                    High-quality, stylish furniture to transform your space into a sanctuary of comfort and elegance.
                  </p>
                  <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="#products">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:inline-flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:inline-flex" />
      </Carousel>
    </section>
  );
}
