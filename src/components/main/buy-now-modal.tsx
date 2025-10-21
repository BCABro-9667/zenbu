
'use client';

import { useActionState, useState, useEffect } from 'react';
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
import { Minus, Plus, PartyPopper, CheckCircle } from 'lucide-react';
import { placeOrder } from '@/lib/actions';
import type { CartItem, OrderState } from '@/lib/definitions';
import { Separator } from '../ui/separator';

interface BuyNowModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

function SuccessDialog({ orderId, items, total, open, onOpenChange }: { orderId: string, items: CartItem[], total: number, open: boolean, onOpenChange: (open: boolean) => void}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader className="items-center text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <DialogTitle className="text-2xl">Order Placed Successfully!</DialogTitle>
                    <DialogDescription>
                        Your Order ID is <span className="font-bold text-foreground">#{orderId}</span>. Thank you for your purchase.
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4">
                    <h4 className="font-semibold mb-2">Order Summary:</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <span className="truncate">{item.name} (x{item.quantity})</span>
                                <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                     <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)} className="w-full">Continue Shopping</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export function BuyNowModal({ product, isOpen, onClose }: BuyNowModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{ id: string, items: CartItem[], total: number } | null>(null);
  const { toast } = useToast();

  const initialState: OrderState = { message: null, errors: {}, orderId: null };
  
  if (!product) return null;
  
  const cartItem: CartItem = { ...product, quantity };
  const total = product.price * quantity;
  const placeOrderWithItems = placeOrder.bind(null, [cartItem], total);
  const [state, dispatch] = useActionState(placeOrderWithItems, initialState);

  useEffect(() => {
    if (state.message === 'success' && state.orderId) {
      setConfirmedOrder({ id: state.orderId, items: [cartItem], total });
      setShowSuccessDialog(true);
      onClose(); // Close the form modal
    } else if (state.message && state.message !== 'success') {
      toast({
        title: "Error",
        description: state.message,
        variant: 'destructive',
      })
    }
  }, [state, cartItem, total, onClose, toast]);
  

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => {
        const newQuantity = prev + amount;
        if (newQuantity < 1) return 1;
        if (newQuantity > product.stock) return product.stock;
        return newQuantity;
    });
  };

  const handleCloseSuccess = () => {
      setShowSuccessDialog(false);
      setConfirmedOrder(null);
  }

  return (
    <>
    <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) {
            // Reset state when closing
            setQuantity(1);
            // Ideally reset form action state too, but that's complex.
        }
        onClose();
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            Provide your details for Cash on Delivery.
          </DialogDescription>
        </DialogHeader>
        <form action={dispatch}>
        <div className="grid gap-4 py-4 px-2.5">
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
    {confirmedOrder && (
        <SuccessDialog
            orderId={confirmedOrder.id}
            items={confirmedOrder.items}
            total={confirmedOrder.total}
            open={showSuccessDialog}
            onOpenChange={handleCloseSuccess}
        />
    )}
    </>
  );
}
