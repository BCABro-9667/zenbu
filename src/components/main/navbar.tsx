import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from './logo';
import { CartIcon } from './cart-icon';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-[5%]">
        <Logo />
        <nav className="ml-10 hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">Home</Link>
          <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About Us</Link>
          <Link href="/#products" className="transition-colors hover:text-foreground/80 text-foreground/60">Products</Link>
          <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact Us</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden sm:flex flex-1 max-w-sm items-center space-x-2">
            <Input type="search" placeholder="Search products..." className="h-9"/>
            <Button type="submit" size="sm" className="px-3">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
