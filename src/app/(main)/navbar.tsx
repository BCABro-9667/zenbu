
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/main/logo';
import { CartIcon } from '@/components/main/cart-icon';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-[5%]">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="p-6">
                <Logo />
                <nav className="mt-8 flex flex-col space-y-4">
                  {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8">
                  <div className="relative">
                    <Input type="search" placeholder="Search products..." className="h-9 w-full pr-10" />
                    <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-9 w-9">
                      <Search className="h-4 w-4" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="hidden md:flex">
            <Logo />
        </div>

        <nav className="ml-10 hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden sm:flex flex-1 max-w-sm items-center justify-end space-x-2">
            <div className="relative w-full max-w-xs">
                <Input type="search" placeholder="Search products..." className="h-9 pr-10"/>
                <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-9 w-9">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
                </Button>
            </div>
          </div>
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
