'use server';

import { generateProductDescription } from '@/ai/flows/product-description-generator';
import { suggestCategories } from '@/ai/flows/category-suggestion-generator';
import { addProduct, addCategory, deleteCategory, deleteProduct, updateCategory, updateOrderStatus } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import type { Order } from './definitions';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';

// AI Actions
export async function generateDescriptionAction(prevState: any, formData: FormData) {
  const schema = z.object({
    title: z.string().min(1, 'Title is required.'),
    keywords: z.string(),
  });
  const validatedFields = schema.safeParse({
    title: formData.get('title'),
    keywords: formData.get('keywords'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please provide a title to generate a description.',
      description: null,
    };
  }

  try {
    const { description } = await generateProductDescription(validatedFields.data);
    return { message: 'success', description };
  } catch (e) {
    return {
      message: 'Failed to generate description.',
      description: null,
    };
  }
}

export async function suggestCategoriesAction(prevState: any, formData: FormData) {
    const schema = z.object({
        productTitle: z.string().min(1, 'Product title is required.'),
        productDescription: z.string(),
    });
    const validatedFields = schema.safeParse({
        productTitle: formData.get('productTitle'),
        productDescription: formData.get('productDescription'),
    });

    if (!validatedFields.success) {
        return {
            message: 'Please provide a product title to get suggestions.',
            suggestions: [],
        };
    }

    try {
        const { suggestedCategories } = await suggestCategories(validatedFields.data);
        return { message: 'success', suggestions: suggestedCategories };
    } catch (e) {
        return {
            message: 'Failed to get suggestions.',
            suggestions: [],
        };
    }
}


// CRUD Actions
const productSchema = z.object({
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.coerce.number().min(0, 'Price must be a positive number'),
    category: z.string().min(1, 'Category is required'),
    stock: z.coerce.number().int().min(0, 'Stock must be a non-negative integer'),
    imageUrl: z.string().url('Please enter a valid image URL'),
    galleryImageUrls: z.string().optional(),
    videoUrl: z.string().url().optional().or(z.literal('')),
    brochureUrl: z.string().url().optional().or(z.literal('')),
});

export async function addProductAction(prevState: any, formData: FormData) {
    const validatedFields = productSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation failed. Could not add product.',
        };
    }

    try {
        const galleryUrls = validatedFields.data.galleryImageUrls?.split(',').map(url => url.trim()).filter(url => url) || [];
        
        await addProduct({
            ...validatedFields.data,
            longDescription: 'This is a default long description. Please edit it in the product management section.',
            galleryImageUrls: galleryUrls,
            isTopRated: false,
            isTopSale: false,
            isRecent: true,
            imageHint: validatedFields.data.name.toLowerCase().split(' ').slice(0,2).join(' ')
        });
    } catch (e) {
        console.error(e);
        return { message: 'Database error: Failed to add product.' };
    }

    revalidatePath('/admin/products');
    redirect('/admin/products');
}

const categorySchema = z.object({
    name: z.string().min(1, 'Category name cannot be empty.'),
});

export async function addCategoryAction(prevState: any, formData: FormData) {
    const validatedFields = categorySchema.safeParse({ name: formData.get('name') });

    if (!validatedFields.success) {
        return { message: validatedFields.error.flatten().fieldErrors.name?.[0] };
    }

    try {
        await addCategory({ name: validatedFields.data.name });
        revalidatePath('/admin/categories');
        return { message: 'success' };
    } catch (e) {
        console.error(e);
        return { message: 'Database error: Failed to add category.' };
    }
}

export async function updateCategoryAction(prevState: any, formData: FormData) {
    const schema = z.object({
        id: z.string(),
        name: z.string().min(1, 'Category name cannot be empty.'),
    });
    const validatedFields = schema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { message: validatedFields.error.flatten().fieldErrors.name?.[0] || 'Invalid data.' };
    }

    try {
        await updateCategory(validatedFields.data.id, { name: validatedFields.data.name });
        revalidatePath('/admin/categories');
        revalidatePath('/category/[slug]', 'layout');
        return { message: 'success' };
    } catch (e: any) {
        return { message: e.message || 'Database error: Failed to update category.' };
    }
}


export async function deleteProductAction(id: string) {
    try {
        await deleteProduct(id);
        revalidatePath('/admin/products');
    } catch (e) {
        console.error(e);
        return { message: 'Database error: Failed to delete product.' };
    }
}

export async function deleteCategoryAction(id: string) {
    try {
        await deleteCategory(id);
        revalidatePath('/admin/categories');
    } catch (e) {
        console.error(e);
        return { message: 'Database error: Failed to delete category.' };
    }
}

export async function updateOrderStatusAction(orderId: string, status: Order['status']) {
    try {
        await updateOrderStatus(orderId, status);
        revalidatePath('/admin/orders');
        revalidatePath(`/admin/orders/${orderId}`);
        return { message: 'success' };
    } catch (e) {
        console.error(e);
        return { message: 'Database error: Failed to update order status.' };
    }
}