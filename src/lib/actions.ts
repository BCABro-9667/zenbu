'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { addLead, addOrder } from './data';
import type { CartItem } from './definitions';

const OrderFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  address: z.string().min(5, { message: 'Please enter a valid address.' }),
});

export type OrderState = {
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
  prevState: OrderState, 
  formData: FormData
) {
  const validatedFields = OrderFormSchema.safeParse({
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
    await addOrder({
      items: cartItems,
      customer: { name, email, phone, address },
      total,
      status: 'Pending',
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Place Order.',
    };
  }
  
  revalidatePath('/admin/orders');
  return { message: 'success' };
}


const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email." }).optional().or(z.literal('')),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactState = {
  errors?: {
    name?: string[];
    phone?: string[];
    email?: string[];
    message?: string[];
  };
  message?: string | null;
}

export async function submitContactForm(prevState: ContactState | null, formData: FormData): Promise<ContactState> {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email') || '',
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input."
    }
  }

  try {
    await addLead(validatedFields.data);
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Submit Message.',
    };
  }

  revalidatePath('/admin/leads'); // Assuming you'll have a leads page
  return { message: 'success' };
}
