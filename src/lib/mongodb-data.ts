
// MongoDB data service to replace Firebase operations
import type { Product, Category, Order, Lead } from './definitions';
import connect from '@/lib/mongodb';
import Order from '@/lib/models/Order';

const API_BASE = '/api';

// Product operations
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`);
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch products');
  }
  
  return data.data;
}

export async function getProductById(id: string): Promise<Product | null> {
  const response = await fetch(`${API_BASE}/products/${id}`);
  
  if (response.status === 404) {
    return null;
  }
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch product');
  }
  
  return data.data;
}

export async function createProduct(productData: Partial<Product>): Promise<Product> {
  const response = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to create product');
  }
  
  return data.data;
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to update product');
  }
  
  return data.data;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to delete product');
  }
  
  return true;
}

// Category operations
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE}/categories`);
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch categories');
  }
  
  return data.data;
}

export async function createCategory(categoryData: { name: string }): Promise<Category> {
  // Generate slug from name
  const slug = categoryData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  const response = await fetch(`${API_BASE}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...categoryData,
      slug,
      imageUrl: '/api/placeholder/300/200',
      imageHint: categoryData.name,
    }),
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to create category');
  }
  
  return data.data;
}

export async function updateCategory(id: string, categoryData: Partial<Category>): Promise<Category> {
  const response = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to update category');
  }
  
  return data.data;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const response = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'DELETE',
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to delete category');
  }
  
  return true;
}

// Order operations
export async function getOrders(): Promise<Order[]> {
  const response = await fetch(`${API_BASE}/orders`);
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch orders');
  }
  
  return data.data;
}

export async function createOrder(orderData: {
  items: any[];
  customer: any;
  total: number;
}): Promise<Order> {
  const response = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to create order');
  }
  
  return data.data;
}

export async function updateOrderStatus(orderId: string, status: string) {
  await connect();
  const updated = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  ).lean();
  if (!updated) throw new Error('Order not found');
  return updated;
}

// Lead operations
export async function getLeads(): Promise<Lead[]> {
  const response = await fetch(`${API_BASE}/leads`);
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch leads');
  }
  
  return data.data;
}

export async function createLead(leadData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<Lead> {
  const response = await fetch(`${API_BASE}/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(leadData),
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to create lead');
  }
  
  return data.data;
}
