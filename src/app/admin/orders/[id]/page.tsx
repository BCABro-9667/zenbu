
'use client';

import { notFound } from 'next/navigation';
import { useMemo, useTransition, useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  MoreVertical,
  Printer,
  ChevronLeft,
  Truck,
  CheckCircle,
  XCircle,
  Package,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { updateOrderStatusAction } from '@/lib/admin-actions';
import { getOrderById } from '@/lib/data';
import type { Order, OrderStatus } from '@/lib/definitions';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const getStatusVariant = (
  status: OrderStatus
): 'destructive' | 'success' | 'secondary' | 'default' => {
  switch (status) {
    case 'Pending':
      return 'secondary';
    case 'Shipped':
      return 'default';
    case 'Delivered':
      return 'success';
    case 'Cancelled':
      return 'destructive';
    default:
      return 'default';
  }
};

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case 'Pending':
      return <Package className="h-4 w-4 text-muted-foreground" />;
    case 'Shipped':
      return <Truck className="h-4 w-4 text-muted-foreground" />;
    case 'Delivered':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'Cancelled':
      return <XCircle className="h-4 w-4 text-red-500" />;
  }
};

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const refreshOrder = () => {
      setIsLoading(true);
      const fetchedOrder = getOrderById(params.id);
      setOrder(fetchedOrder);
      setIsLoading(false);
  }

  useEffect(() => {
    refreshOrder();
  }, [params.id]);

  useEffect(() => {
      if (!isLoading && !order) {
          notFound();
      }
  }, [isLoading, order]);

  if (isLoading || !order) {
    return <div className="p-4 sm:px-6 sm:py-0">Loading order details...</div>;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleStatusChange = (newStatus: OrderStatus) => {
    startTransition(async () => {
      const result = await updateOrderStatusAction(order.id, newStatus);
      if (result?.message === 'success') {
        toast({
          title: 'Status Updated',
          description: `Order status changed to ${newStatus}.`,
        });
        refreshOrder();
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-5xl flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/admin/orders">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Order Details
          </h1>
          <Badge variant={getStatusVariant(order.status)} className="ml-auto sm:ml-0">
            {order.status}
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8" disabled={isPending}>
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => handleStatusChange('Pending')}>Pending</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleStatusChange('Shipped')}>Shipped</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleStatusChange('Delivered')}>Delivered</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleStatusChange('Cancelled')} className="text-destructive">
                  Cancel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Items in this order.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="relative h-16 w-16">
                            <Image src={item.imageUrl} alt={item.name} fill className="rounded-md object-cover"/>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
               <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Ordered on <time dateTime={order.createdAt.toISOString()}>{format(order.createdAt, "PPP p")}</time>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                 <Separator />
                <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="font-semibold">{order.customer.name}</div>
                <div>{order.customer.email}</div>
                <div>{order.customer.phone}</div>
                <Separator className="my-4" />
                <div className="font-semibold">Shipping Address</div>
                <address className="not-italic text-muted-foreground">
                  {order.customer.address}
                </address>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
