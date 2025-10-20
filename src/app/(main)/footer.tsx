'use client';

import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Headphones, MoveUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <li>
        <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {children}
        </Link>
    </li>
);

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container pt-16 pb-8 px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Logo & Contact */}
          <div className="lg:col-span-2 pr-8">
            <Logo />
            <div className="flex items-start gap-4 mt-6">
                <Headphones className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                <div>
                    <p className="text-sm text-muted-foreground">Got Questions? Call us between 9:15 AM to 6:15 PM Monday-Saturday</p>
                    <p className="font-semibold text-lg mt-1">9810038219</p>
                </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <Button variant="ghost" size="icon" asChild><Link href="#"><Facebook className="h-5 w-5 text-muted-foreground" /></Link></Button>
              <Button variant="ghost" size="icon" asChild><Link href="#"><Twitter className="h-5 w-5 text-muted-foreground" /></Link></Button>
              <Button variant="ghost" size="icon" asChild><Link href="#"><Linkedin className="h-5 w-5 text-muted-foreground" /></Link></Button>
              <Button variant="ghost" size="icon" asChild><Link href="#"><Instagram className="h-5 w-5 text-muted-foreground" /></Link></Button>
              <Button variant="ghost" size="icon" asChild><Link href="#"><Youtube className="h-5 w-5 text-muted-foreground" /></Link></Button>
            </div>
          </div>
          
          {/* Column 2, 3, 4: Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:col-span-3">
              <div>
                  <h4 className="font-semibold mb-4">Information</h4>
                  <ul className="space-y-3">
                      <FooterLink href="#">Track Your Order</FooterLink>
                      <FooterLink href="#">Videos</FooterLink>
                      <FooterLink href="#">FAQ</FooterLink>
                      <FooterLink href="#">Careers</FooterLink>
                  </ul>
              </div>
              <div>
                  <h4 className="font-semibold mb-4">My Account</h4>
                  <ul className="space-y-3">
                      <FooterLink href="/cart">Cart</FooterLink>
                      <FooterLink href="/checkout">Checkout</FooterLink>
                      <FooterLink href="/admin">My Account</FooterLink>
                      <FooterLink href="#">Payment Options</FooterLink>
                  </ul>
              </div>
              <div>
                  <h4 className="font-semibold mb-4">Policies</h4>
                  <ul className="space-y-3">
                      <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                      <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
                      <FooterLink href="/terms-of-service">Shipping & Refund</FooterLink>
                      <FooterLink href="#">E-Waste Collection</FooterLink>
                  </ul>
              </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} zenbu. All rights reserved.</p>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 flex flex-col items-center gap-4">
        <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 shadow-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <MoveUp className="h-6 w-6"/>
            <span className="sr-only">Scroll to top</span>
        </Button>
      </div>
    </footer>
  );
}
