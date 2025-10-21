import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getBannerImage } from '@/lib/data';

export default function BigBanner() {
  const bannerImage = getBannerImage();

  if (!bannerImage) {
    return null; // Or a fallback
  }

  return (
    <section className="container">
      <div className="relative h-[400px] w-full rounded-xl overflow-hidden flex items-center justify-center text-center p-4">
        <Image
          src={bannerImage.imageUrl}
          alt={bannerImage.description}
          fill
          className="object-cover"
          data-ai-hint={bannerImage.imageHint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative text-white max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built to Last, Designed for You</h2>
          <p className="mt-4 text-lg text-neutral-200">
            Every piece is crafted with the highest quality materials to bring lasting style and comfort to your home. Explore our new collection today.
          </p>
          <Button asChild size="lg" className="mt-8 bg-white text-black hover:bg-neutral-200">
            <Link href="/products">Explore Collection</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
