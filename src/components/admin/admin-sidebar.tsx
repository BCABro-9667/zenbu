'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Package, ShoppingCart, Tag } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/main/logo";

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutGrid },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/categories', label: 'Categories', icon: Tag },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-64 border-r bg-card">
            <div className="h-16 flex items-center px-6 border-b">
                <Logo />
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                    return (
                        <Button
                            key={item.label}
                            asChild
                            variant={isActive ? 'default' : 'ghost'}
                            className="w-full justify-start"
                        >
                            <Link href={item.href}>
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.label}
                            </Link>
                        </Button>
                    );
                })}
            </nav>
            <div className="mt-auto p-4 border-t">
                 <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Back to Website
                    </Link>
                </Button>
            </div>
        </aside>
    );
}
