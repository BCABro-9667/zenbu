'use client';
import { PageHeader } from "@/components/admin/page-header";
import { RecentOrders } from "@/components/admin/recent-orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Tag } from "lucide-react";
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Product, Category, Order } from '@/lib/definitions';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from "react";

export default function AdminDashboard() {
    const firestore = useFirestore();
    
    const productsCollection = useMemoFirebase(() => collection(firestore, 'products'), [firestore]);
    const { data: products, isLoading: productsLoading } = useCollection<Product>(productsCollection);

    const categoriesCollection = useMemoFirebase(() => collection(firestore, 'categories'), [firestore]);
    const { data: categories, isLoading: categoriesLoading } = useCollection<Category>(categoriesCollection);

    const ordersCollection = useMemoFirebase(() => collection(firestore, 'orders'), [firestore]);
    const { data: orders, isLoading: ordersLoading } = useCollection<Order>(ordersCollection);

    const totalRevenue = useMemo(() => orders?.reduce((sum, order) => sum + order.total, 0) || 0, [orders]);
    const pendingOrders = useMemo(() => orders?.filter(o => o.status === 'Pending').length || 0, [orders]);
    
    const isLoading = productsLoading || categoriesLoading || ordersLoading;

    return (
        <div>
            <PageHeader title="Dashboard" description="An overview of your store's performance." />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <span className="text-2xl">₹</span>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="h-8 w-3/4"/> : <div className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</div>}
                        <p className="text-xs text-muted-foreground">Total revenue from all sales</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         {isLoading ? <Skeleton className="h-8 w-1/4"/> : <div className="text-2xl font-bold">{products?.length || 0}</div>}
                        <p className="text-xs text-muted-foreground">The total number of products in your store</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
                        <Tag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="h-8 w-1/4"/> : <div className="text-2xl font-bold">{categories?.length || 0}</div>}
                        <p className="text-xs text-muted-foreground">The total number of product categories</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                         {isLoading ? <Skeleton className="h-8 w-1/4"/> : <div className="text-2xl font-bold">{pendingOrders}</div>}
                        <p className="text-xs text-muted-foreground">Orders that need to be processed</p>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-8">
                <RecentOrders />
            </div>
        </div>
    );
}
