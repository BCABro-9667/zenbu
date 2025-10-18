import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/data';
import { Card } from '../ui/card';

export default function CategoryCircles() {
  const categories = getCategories();

  return (
    <section id="categories" className="container py-12">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-10">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
        {categories.map((category) => (
          <Link href={`/category/${category.slug}`} key={category.id} className="group flex flex-col items-center gap-3 text-center">
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
        ))}
      </div>
    </section>
  );
}
