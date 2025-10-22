
'use client';

import { PlaceHolderImages } from './placeholder-images';
import type { Product, Category, Order, Lead, CartItem } from './definitions';

// --- LOCALSTORAGE HELPERS ---

function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return defaultValue;
  }
}

function saveToLocalStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key “${key}”:`, error);
  }
}

// --- INITIAL MOCK DATA ---

const defaultProducts: Product[] = [
    { id: '1', name: 'Digital Locker Safe', description: 'Secure your valuables with this high-tech digital safe.', longDescription: 'This digital locker safe offers top-notch security for your home or office. It features a programmable digital keypad, a solid steel construction, and concealed hinges for protection against theft. The interior is lined with soft material to prevent scratches to your valuables. It includes emergency override keys and pre-drilled holes for mounting.', price: 8000, imageUrl: 'https://picsum.photos/seed/safe/400/300', galleryImageUrls: ['https://picsum.photos/seed/safe-g1/400/300', 'https://picsum.photos/seed/safe-g2/400/300'], imageHint: 'digital safe', category: 'Locker Safes', isTopRated: true, isTopSale: false, isRecent: true, stock: 25 },
    { id: '2', name: 'Wooden Gullak (Money Bank)', description: 'A traditional yet stylish wooden money bank.', longDescription: 'Save in style with this beautifully crafted wooden gullak. Made from high-quality sheesham wood, it features a classic design with a coin slot on top. It’s not just a money bank, but also a beautiful decorative piece for your home. Perfect for teaching kids the value of saving.', price: 800, imageUrl: 'https://picsum.photos/seed/gullak/400/300', galleryImageUrls: ['https://picsum.photos/seed/gullak-g1/400/300', 'https://picsum.photos/seed/gullak-g2/400/300'], imageHint: 'wooden gullak', category: 'Gullak', isTopRated: false, isTopSale: true, isRecent: true, stock: 100 },
    { id: '3', name: 'Bamboo Chopping Board', description: 'Eco-friendly and durable bamboo chopping board.', longDescription: 'This bamboo chopping board is a must-have for any kitchen. Made from 100% natural bamboo, it is durable, long-lasting, and gentle on your knives. It features a built-in juice groove to prevent messes and is naturally antibacterial. Easy to clean and maintain.', price: 1200, imageUrl: 'https://picsum.photos/seed/board/400/300', galleryImageUrls: ['https://picsum.photos/seed/board-g1/400/300', 'https://picsum.photos/seed/board-g2/400/300'], imageHint: 'bamboo board', category: 'Chopping Boards', isTopRated: true, isTopSale: true, isRecent: false, stock: 50 },
    { id: '4', name: 'Stainless Steel Cloth Hanger', description: 'Set of 12 durable stainless steel hangers.', longDescription: 'Organize your closet with these sleek and durable stainless steel cloth hangers. Their slim design saves space, while the sturdy construction can hold heavy garments like coats and suits. They are rust-proof and feature a smooth finish to protect your clothes from snags.', price: 600, imageUrl: 'https://picsum.photos/seed/hanger/400/300', galleryImageUrls: ['https://picsum.photos/seed/hanger-g1/400/300', 'https://picsum.photos/seed/hanger-g2/400/300'], imageHint: 'steel hanger', category: 'Clothing Hangers', isTopRated: false, isTopSale: false, isRecent: true, stock: 200 },
    { id: '5', name: 'Adjustable Mobile Stand', description: 'A foldable and adjustable stand for your phone or tablet.', longDescription: 'Enjoy hands-free viewing with this adjustable mobile stand. It’s compatible with all smartphones and small tablets. The height and angle can be adjusted for comfortable viewing, making it perfect for video calls, watching movies, or following recipes. Its foldable design makes it portable and easy to carry.', price: 500, imageUrl: 'https://picsum.photos/seed/stand/400/300', galleryImageUrls: ['https://picsum.photos/seed/stand-g1/400/300', 'https://picsum.photos/seed/stand-g2/400/300'], imageHint: 'mobile stand', category: 'Mobile Stands', isTopRated: true, isTopSale: false, isRecent: true, stock: 150 },
    { id: '6', name: 'Customizable Smart Mug', description: 'A coffee mug that maintains your drink at the perfect temperature.', longDescription: 'Never drink cold coffee again! This customizable smart mug allows you to set and maintain your preferred drinking temperature via a smartphone app. You can even customize the LED color on the mug. It comes with a charging coaster and has a 1.5-hour battery life.', price: 10000, imageUrl: 'https://picsum.photos/seed/mug/400/300', galleryImageUrls: ['https://picsum.photos/seed/mug-g1/400/300', 'https://picsum.photos/seed/mug-g2/400/300'], imageHint: 'smart mug', category: 'Customizable Appliances', isTopRated: true, isTopSale: false, isRecent: true, stock: 30 },
];

const defaultCategories: Category[] = [
    { id: '1', name: 'Locker Safes', slug: 'locker-safes', imageUrl: 'https://picsum.photos/seed/cat-safe/300/200', imageHint: 'locker safe' },
    { id: '2', name: 'Gullak', slug: 'gullak', imageUrl: 'https://picsum.photos/seed/cat-gullak/300/200', imageHint: 'money bank' },
    { id: '3', name: 'Chopping Boards', slug: 'chopping-boards', imageUrl: 'https://picsum.photos/seed/cat-board/300/200', imageHint: 'kitchen board' },
    { id: '4', name: 'Clothing Hangers', slug: 'clothing-hangers', imageUrl: 'https://picsum.photos/seed/cat-hanger/300/200', imageHint: 'closet hanger' },
    { id: '5', name: 'Mobile Stands', slug: 'mobile-stands', imageUrl: 'https://picsum.photos/seed/cat-stand/300/200', imageHint: 'phone holder' },
    { id: '6', name: 'Customizable Appliances', slug: 'customizable-appliances', imageUrl: 'https://picsum.photos/seed/cat-custom/300/200', imageHint: 'smart appliance' },
];

const defaultOrders: Order[] = [
    { id: '1', items: [{ id: '1', name: 'Digital Locker Safe', price: 8000, imageUrl: 'https://picsum.photos/seed/safe/400/300', imageHint: 'digital safe', quantity: 1 }], customer: { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St' }, total: 8000, createdAt: new Date(), status: 'Delivered' },
    { id: '2', items: [{ id: '5', name: 'Adjustable Mobile Stand', price: 500, imageUrl: 'https://picsum.photos/seed/stand/400/300', imageHint: 'mobile stand', quantity: 2 }], customer: { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak Ave' }, total: 1000, createdAt: new Date(Date.now() - 86400000), status: 'Pending' },
];


// --- Products ---
export function getProducts() {
    return getFromLocalStorage('products', defaultProducts);
}

export function getProductById(id: string) {
    const products = getProducts();
    return products.find(p => p.id === id);
}

export function addProduct(productData: Omit<Product, 'id'>) {
    const products = getProducts();
    const newId = (Math.max(0, ...products.map(p => parseInt(p.id, 10))) + 1).toString();
    const newProduct: Product = { ...productData, id: newId };
    saveToLocalStorage('products', [...products, newProduct]);
    return newId;
}

export function updateProduct(id: string, productData: Partial<Product>) {
    let products = getProducts();
    products = products.map(p => (p.id === id ? { ...p, ...productData } : p));
    saveToLocalStorage('products', products);
}

export function deleteProduct(id: string) {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveToLocalStorage('products', products);
}

// --- Categories ---
export function getCategories() {
    return getFromLocalStorage('categories', defaultCategories);
}

export function getCategoryBySlug(slug: string) {
    const categories = getCategories();
    return categories.find(c => c.slug === slug);
}

export function addCategory(categoryData: { name: string; slug: string; imageUrl: string }) {
    const categories = getCategories();
    const newId = (Math.max(0, ...categories.map(c => parseInt(c.id, 10))) + 1).toString();
    const newCategory: Category = {
        ...categoryData,
        id: newId,
        imageHint: categoryData.name.toLowerCase()
    };
    saveToLocalStorage('categories', [...categories, newCategory]);
    return newId;
}

export function updateCategory(id: string, categoryData: Partial<Category>) {
    let categories = getCategories();
    const slug = categoryData.name?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    categories = categories.map(c => (c.id === id ? { ...c, ...categoryData, ...(slug && { slug }) } : c));
    saveToLocalStorage('categories', categories);
}

export function deleteCategory(id: string) {
    let categories = getCategories();
    categories = categories.filter(c => c.id !== id);
    saveToLocalStorage('categories', categories);
}

// --- Orders ---
export function getOrders() {
    const orders = getFromLocalStorage<any[]>('orders', defaultOrders);
    // Dates are stored as strings in JSON, so we need to convert them back
    return orders.map(o => ({...o, createdAt: new Date(o.createdAt)})).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getRecentOrders(count: number = 5) {
    return getOrders().slice(0, count);
}


export function getOrderById(id: string) {
    const orders = getOrders();
    return orders.find(o => o.id === id);
}

export function addOrder(orderData: Omit<Order, 'id' | 'createdAt'>) {
    const orders = getOrders();
    const newId = (orders.length > 0 ? Math.max(0, ...orders.map(o => parseInt(o.id, 10))) : 0) + 1;
    const newOrder: Order = {
        ...orderData,
        id: String(newId),
        createdAt: new Date(),
    };
    saveToLocalStorage('orders', [...orders, newOrder]);
    return String(newId);
}

export function updateOrderStatus(id: string, status: Order['status']) {
    let orders = getOrders();
    orders = orders.map(o => (o.id === id ? { ...o, status } : o));
    saveToLocalStorage('orders', orders);
}


// --- Leads ---
export function getLeads() {
    const leads = getFromLocalStorage<any[]>('leads', []);
    return leads.map(l => ({...l, dateCreated: new Date(l.dateCreated)}));
}

export function addLead(leadData: Omit<Lead, 'id' | 'dateCreated'>) {
    const leads = getLeads();
    const newId = (leads.length > 0 ? Math.max(0, ...leads.map(l => parseInt(l.id, 10))) : 0) + 1;
    const newLead: Lead = {
        ...leadData,
        id: String(newId),
        dateCreated: new Date(),
    };
    saveToLocalStorage('leads', [...leads, newLead]);
    return String(newId);
}

// --- Images ---
export function getHeroSliderImages() {
    return PlaceHolderImages.filter(image => image.id.startsWith('hero-'));
}

export function getBannerImage() {
    return PlaceHolderImages.find(img => img.id === 'banner-1');
}

    
