'use server';

import { generateProductDescription } from '@/ai/flows/product-description-generator';
import { suggestCategories } from '@/ai/flows/category-suggestion-generator';
import { addProduct, addCategory, deleteCategory, deleteProduct } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { redirect } from 'next/navigation';

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
        addProduct({
            ...validatedFields.data,
            // These are placeholders/defaults
            isTopRated: false,
            isTopSale: false,
            isRecent: true,
            imageHint: validatedFields.data.name.toLowerCase().split(' ').slice(0,2).join(' ')
        });
    } catch (e) {
        return { message: 'Database error: Failed to add product.' };
    }

    revalidatePath('/admin/products');
    redirect('/admin/products');
}

export async function addCategoryAction(prevState: any, formData: FormData) {
    const schema = z.object({ name: z.string().min(1, 'Category name cannot be empty.') });
    const validatedFields = schema.safeParse({ name: formData.get('name') });

    if (!validatedFields.success) {
        return { message: validatedFields.error.flatten().fieldErrors.name?.[0] };
    }

    try {
        addCategory({ name: validatedFields.data.name });
        revalidatePath('/admin/categories');
        return { message: 'success' };
    } catch (e) {
        return { message: 'Database error: Failed to add category.' };
    }
}

export async function deleteProductAction(id: string) {
    try {
        deleteProduct(id);
        revalidatePath('/admin/products');
    } catch (e) {
        return { message: 'Database error: Failed to delete product.' };
    }
}

export async function deleteCategoryAction(id: string) {
    try {
        deleteCategory(id);
        revalidatePath('/admin/categories');
    } catch (e) {
        return { message: 'Database error: Failed to delete category.' };
    }
}
