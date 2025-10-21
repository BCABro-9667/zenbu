
'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrders } from "@/lib/mongodb-data";
import type { Order, OrderStatus } from "@/lib/definitions";

const getStatusVariant = (status: OrderStatus): "destructive" | "success" | "secondary" | "default" => {
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

export function RecentOrders() {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const orders = await getOrders();
        const sorted = (orders || []).sort((a: any, b: any) => {
          const da = new Date(a.createdAt as any).getTime();
          const db = new Date(b.createdAt as any).getTime();
          return db - da;
        });
        setRecentOrders(sorted.slice(0, 5));
      } catch (e) {
        console.error('Failed to load recent orders:', e);
        setRecentOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadOrders();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            A list of the most recent orders in your store.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/admin/orders">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
                <TableRow><TableCell colSpan={4} className="h-24 text-center">Loading recent orders...</TableCell></TableRow>
            ) : recentOrders && recentOrders.length > 0 ? recentOrders.map(order => (
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
                        {order.createdAt ? new Date(order.createdAt as any).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">
                        No recent orders found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
