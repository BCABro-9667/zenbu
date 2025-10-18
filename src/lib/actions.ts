'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { addOrder } from './data';
import type { CartItem } from './definitions';

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  address: z.string().min(5, { message: 'Please enter a valid address.' }),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    address?: string[];
  };
  message?: string | null;
};

export async function placeOrder(
  cartItems: CartItem[], 
  total: number, 
  prevState: State, 
  formData: FormData
) {
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Place Order.',
    };
  }

  if (cartItems.length === 0) {
    return {
      message: 'Your cart is empty. Failed to Place Order.',
    };
  }

  const { name, email, phone, address } = validatedFields.data;

  try {
    addOrder({
      items: cartItems,
      customer: { name, email, phone, address },
      total,
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Place Order.',
    };
  }
  
  revalidatePath('/admin/orders');
  return { message: 'success' };
}
