'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/definitions';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { useFormState } from 'react-dom';
import { placeOrder } from '@/lib/actions';
import type { CartItem } from '@/lib/definitions';

interface BuyNowModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BuyNowModal({ product, isOpen, onClose }: BuyNowModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const initialState = { message: null, errors: {} };
  
  if (!product) return null;
  
  const cartItem: CartItem = { ...product, quantity };
  const placeOrderWithItems = placeOrder.bind(null, [cartItem], product.price * quantity);
  const [state, dispatch] = useFormState(placeOrderWithItems, initialState);


  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => {
        const newQuantity = prev + amount;
        if (newQuantity < 1) return 1;
        if (newQuantity > product.stock) return product.stock;
        return newQuantity;
    });
  };

  if (state.message === 'success') {
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. We will contact you shortly.",
    });
    onClose();
  } else if (state.message) {
    toast({
      title: "Error",
      description: state.message,
      variant: 'destructive',
    })
  }
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            Provide your details for Cash on Delivery.
          </DialogDescription>
        </DialogHeader>
        <form action={dispatch}>
        <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 flex-shrink-0">
                    <Image src={product.imageUrl} alt={product.name} fill className="rounded-md object-cover" />
                </div>
                <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">Price: ₹{product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <Button type="button" variant="outline" size="icon" className="h-6 w-6" onClick={() => handleQuantityChange(-1)}><Minus className="h-4 w-4" /></Button>
                        <span>{quantity}</span>
                        <Button type="button" variant="outline" size="icon" className="h-6 w-6" onClick={() => handleQuantityChange(1)}><Plus className="h-4 w-4" /></Button>
                    </div>
                </div>
            </div>
          
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
                {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" placeholder="123-456-7890" required />
                {state.errors?.phone && <p className="text-sm text-destructive">{state.errors.phone[0]}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="address">Shipping Address</Label>
                <Input id="address" name="address" placeholder="123 Main St, City, Country" required />
                {state.errors?.address && <p className="text-sm text-destructive">{state.errors.address[0]}</p>}
            </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">
            Place Order (₹{(product.price * quantity).toFixed(2)})
          </Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
