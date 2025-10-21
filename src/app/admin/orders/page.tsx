'use client';
import { useMemo } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useCollection } from "@/firebase/firestore/use-collection";
import { useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import type { Order } from "@/lib/definitions";

export default function OrdersPage() {
    const firestore = useFirestore();
    const ordersCollection = useMemo(() => query(collection(firestore, 'orders'), orderBy('createdAt', 'desc')), [firestore]);
    const { data: orders, isLoading } = useCollection<Order>(ordersCollection);

    const getStatusVariant = (status: string): "destructive" | "success" | "secondary" | "default" => {
        switch (status) {
            case 'Pending':
                return 'destructive';
            case 'Delivered':
                return 'success';
            case 'Shipped':
                return 'secondary';
            default:
                return 'default';
        }
    };


    return (
        <div>
            <PageHeader title="Orders" description="View and manage all customer orders." />
            <Card>
                <CardHeader>
                    <CardTitle>All Orders</CardTitle>
                    <CardDescription>A list of all orders placed in your store.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                <TableHead className="hidden md:table-cell">Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow><TableCell colSpan={5} className="text-center h-24">Loading orders...</TableCell></TableRow>
                            ) : (orders && orders.length > 0) ? orders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <div className="font-medium">{order.customer.name}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {order.customer.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge variant={getStatusVariant(order.status)}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {order.createdAt ? format(new Date(order.createdAt.toDate()), "PPP") : 'N/A'}
                                    </TableCell>
                                    <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="icon">
                                            <Link href={`/admin/orders/${order.id}`}>
                                                <Eye className="h-4 w-4" />
                                                <span className="sr-only">View Order</span>
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">
                                        No orders found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
