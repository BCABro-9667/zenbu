import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <ShoppingBag className="h-8 w-8 text-primary-foreground bg-primary p-1.5 rounded-md" />
      <span className="text-xl font-bold tracking-tight">E-Com Modern</span>
    </Link>
  );
}
