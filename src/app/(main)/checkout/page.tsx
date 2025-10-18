'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormState } from 'react-dom';
import { placeOrder } from '@/lib/actions';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const initialState = { message: null, errors: {} };
  const placeOrderWithItems = placeOrder.bind(null, cartItems, cartTotal);
  const [state, dispatch] = useFormState(placeOrderWithItems, initialState);

  useEffect(() => {
    if (state.message === 'success') {
      toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. We will contact you shortly.",
      });
      clearCart();
      router.push('/');
    } else if (state.message) {
      toast({
        title: "Error Placing Order",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, clearCart, router]);
  
  useEffect(() => {
    if (cartItems.length === 0 && state.message !== 'success') {
        router.push('/cart');
    }
  }, [cartItems, router, state.message]);

  if (cartItems.length === 0) {
      return (
          <div className="container flex items-center justify-center py-20">
              <p>Redirecting to cart...</p>
          </div>
      )
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form action={dispatch}>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                  {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" placeholder="123-456-7890" required />
                  {state.errors?.phone && <p className="text-sm font-medium text-destructive">{state.errors.phone[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input id="address" name="address" placeholder="123 Main St, Anytown, USA" required />
                  {state.errors?.address && <p className="text-sm font-medium text-destructive">{state.errors.address[0]}</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Place Order</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image src={item.imageUrl} alt={item.name} fill className="rounded-md object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <p>Subtotal</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
