
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
    { id: '1', name: 'Minimalist Wooden Chair', description: 'A sleek and simple chair made from solid oak.', longDescription: 'Crafted from high-quality solid oak, this minimalist wooden chair combines timeless design with exceptional comfort. Its clean lines and natural finish make it a versatile addition to any room, whether as a dining chair, a desk chair, or a standalone accent piece. The ergonomic design ensures comfortable seating for extended periods, and its sturdy construction guarantees durability for years to come.', price: 150, imageUrl: PlaceHolderImages.find(p => p.id === 'product-1')?.imageUrl || '', galleryImageUrls: [PlaceHolderImages.find(p => p.id === 'gallery-1-1')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-1-2')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-1-3')?.imageUrl || ''], imageHint: 'wooden chair', category: 'Chairs', isTopRated: true, isTopSale: false, isRecent: true, stock: 15, videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ' },
    { id: '2', name: 'Modern Velvet Sofa', description: 'A luxurious sofa upholstered in soft green velvet.', longDescription: 'Transform your living space with this luxurious modern sofa, upholstered in a rich, soft green velvet. Its plush cushions and deep seating provide unparalleled comfort, perfect for lounging or entertaining guests. The elegant design, featuring clean lines and tapered wooden legs, adds a touch of sophistication to any contemporary home.', price: 850, imageUrl: PlaceHolderImages.find(p => p.id === 'product-2')?.imageUrl || '', galleryImageUrls: [PlaceHolderImages.find(p => p.id === 'gallery-2-1')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-2-2')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-2-3')?.imageUrl || ''], imageHint: 'velvet sofa', category: 'Sofas', isTopRated: true, isTopSale: true, isRecent: true, stock: 8, brochureUrl: '#' },
    { id: '3', name: 'Sleek Metal Bookshelf', description: 'An industrial-style bookshelf with five spacious shelves.', longDescription: 'Organize your books and display your favorite decor with this sleek, industrial-style bookshelf. Featuring a sturdy metal frame and five spacious wooden shelves, it offers ample storage without compromising on style. Its open design creates a sense of space, making it an ideal choice for living rooms, offices, or bedrooms.', price: 300, imageUrl: PlaceHolderImages.find(p => p.id === 'product-3')?.imageUrl || '', galleryImageUrls: [PlaceHolderImages.find(p => p.id === 'gallery-3-1')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-3-2')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-3-3')?.imageUrl || ''], imageHint: 'metal bookshelf', category: 'Storage', isTopRated: false, isTopSale: false, isRecent: true, stock: 20 },
    { id: '4', name: 'Round Marble Coffee Table', description: 'An elegant coffee table with a genuine marble top.', longDescription: 'Add a touch of luxury to your living room with this elegant coffee table. It features a genuine marble top with unique veining, supported by a minimalist metal base. The round shape is perfect for creating a smooth flow in your space, providing a sophisticated centerpiece for your seating area.', price: 450, imageUrl: PlaceHolderImages.find(p => p.id === 'product-4')?.imageUrl || '', galleryImageUrls: [PlaceHolderImages.find(p => p.id === 'gallery-4-1')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-4-2')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-4-3')?.imageUrl || ''], imageHint: 'marble table', category: 'Tables', isTopRated: true, isTopSale: false, isRecent: false, stock: 12 },
    { id: '5', name: 'Upholstered Queen Bed', description: 'A stylish and comfortable bed with an upholstered headboard.', longDescription: 'Create a cozy and inviting bedroom with this stylish queen-sized bed. The frame is fully upholstered in a durable, soft-touch fabric, and the padded headboard provides comfortable support for reading or watching TV in bed. Its modern yet timeless design makes it a perfect centerpiece for any master or guest bedroom.', price: 700, imageUrl: PlaceHolderImages.find(p => p.id === 'product-5')?.imageUrl || '', galleryImageUrls: [PlaceHolderImages.find(p => p.id === 'gallery-5-1')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-5-2')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-5-3')?.imageUrl || ''], imageHint: 'upholstered bed', category: 'Beds', isTopRated: false, isTopSale: true, isRecent: true, stock: 10 },
    { id: '6', name: 'Ergonomic Office Chair', description: 'A supportive chair designed for long hours of work.', longDescription: 'Boost your productivity and comfort with this ergonomic office chair. Designed for long hours of work, it features adjustable lumbar support, armrests, and seat height. The breathable mesh back keeps you cool, while the contoured seat reduces pressure on your legs. A must-have for any home office.', price: 250, imageUrl: PlaceHolderImages.find(p => p.id === 'product-6')?.imageUrl || '', galleryImageUrls: [PlaceHolderImages.find(p => p.id === 'gallery-6-1')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-6-2')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-6-3')?.imageUrl || ''], imageHint: 'office chair', category: 'Chairs', isTopRated: true, isTopSale: true, isRecent: false, stock: 25 },
    { id: '7', name: 'Industrial Floor Lamp', description: 'A metal floor lamp with a vintage-inspired design.', longDescription: 'Illuminate your space with this industrial floor lamp. Its metal construction and vintage-inspired design add a touch of retro charm to any room. The adjustable head allows you to direct light exactly where you need it, making it perfect for reading or creating ambient lighting.', price: 120, imageUrl: PlaceHolderImages.find(p => p.id === 'product-7')?.imageUrl || '', galleryImageUrls: [PlaceHolderImages.find(p => p.id === 'gallery-7-1')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-7-2')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-7-3')?.imageUrl || ''], imageHint: 'floor lamp', category: 'Lighting', isTopRated: false, isTopSale: false, isRecent: true, stock: 30 },
    { id: '8', name: 'Expandable Dining Table', description: 'A versatile dining table that can seat up to 8 people.', longDescription: 'Host everything from intimate family dinners to larger gatherings with this versatile expandable dining table. Made from solid wood, it features a simple-to-use extension leaf that allows you to comfortably seat up to 8 people. Its classic design ensures it will be a beloved part of your home for years to come.', price: 600, imageUrl: PlaceHolderImages.find(p => p.id === 'product-8')?.imageUrl || '', galleryImageUrls: [PlaceHolderImages.find(p => p.id === 'gallery-8-1')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-8-2')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-8-3')?.imageUrl || ''], imageHint: 'dining table', category: 'Tables', isTopRated: false, isTopSale: true, isRecent: false, stock: 7 },
    { id: '9', name: 'Cozy Armchair', description: 'A plush armchair perfect for a reading nook.', longDescription: 'Sink into the plush comfort of this cozy armchair. Perfect for creating a reading nook or adding extra seating to your living room, it features soft upholstery and a generously padded seat and back. Its welcoming design invites you to relax and unwind.', price: 350, imageUrl: PlaceHolderImages.find(p => p.id === 'product-9')?.imageUrl || '', galleryImageUrls: [PlaceHolderImages.find(p => p.id === 'gallery-9-1')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-9-2')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-9-3')?.imageUrl || ''], imageHint: 'armchair', category: 'Chairs', isTopRated: false, isTopSale: false, isRecent: true, stock: 14 },
    { id: '10', name: 'Modern TV Stand', description: 'A low-profile TV stand with ample storage.', longDescription: 'This modern TV stand is the perfect blend of style and function. Its low-profile design creates a clean, uncluttered look, while the combination of open shelves and closed cabinets provides ample storage for all your media devices and accessories. It can accommodate TVs up to 65 inches.', price: 280, imageUrl: PlaceHolderImages.find(p => p.id === 'product-10')?.imageUrl || '', galleryImageUrls: [PlaceHolderImages.find(p => p.id === 'gallery-10-1')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-10-2')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-10-3')?.imageUrl || ''], imageHint: 'TV stand', category: 'Storage', isTopRated: false, isTopSale: false, isRecent: false, stock: 18 },
    { id: '11', name: 'Floating Wall Shelves', description: 'A set of three minimalist wall shelves.', longDescription: 'Display your favorite photos, plants, and trinkets on this set of three floating wall shelves. Their minimalist design and invisible mounting hardware create a clean, modern look that complements any decor. Arrange them in any configuration to create a personalized wall display.', price: 80, imageUrl: PlaceHolderImages.find(p => p.id === 'product-11')?.imageUrl || '', galleryImageUrls: [PlaceHolderImages.find(p => p.id === 'gallery-11-1')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-11-2')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-11-3')?.imageUrl || ''], imageHint: 'wall shelves', category: 'Storage', isTopRated: false, isTopSale: true, isRecent: true, stock: 40 },
    { id: '12', name: 'Patio Lounge Set', description: 'A comfortable and durable outdoor lounge set.', longDescription: 'Create the perfect outdoor oasis with this comfortable and durable patio lounge set. It includes a two-seater sofa, two armchairs, and a coffee table, all made from weather-resistant materials. The plush cushions are designed for comfort and are covered in a fade-resistant fabric.', price: 950, imageUrl: PlaceHolderImages.find(p => p.id === 'product-12')?.imageUrl || '', galleryImageUrls: [PlaceHolderImages.find(p => p.id === 'gallery-12-1')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-12-2')?.imageUrl || '', PlaceHolderImages.find(p => p.id === 'gallery-12-3')?.imageUrl || ''], imageHint: 'patio set', category: 'Outdoor', isTopRated: true, isTopSale: false, isRecent: false, stock: 5 },
];

const defaultCategories: Category[] = [
    { id: '1', name: 'Chairs', slug: 'chairs', imageUrl: PlaceHolderImages.find(p => p.id === 'category-1')?.imageUrl || '', imageHint: 'armchair' },
    { id: '2', name: 'Sofas', slug: 'sofas', imageUrl: PlaceHolderImages.find(p => p.id === 'category-2')?.imageUrl || '', imageHint: 'sofa' },
    { id: '3', name: 'Tables', slug: 'tables', imageUrl: PlaceHolderImages.find(p => p.id === 'category-3')?.imageUrl || '', imageHint: 'dining table' },
    { id: '4', name: 'Beds', slug: 'beds', imageUrl: PlaceHolderImages.find(p => p.id === 'category-4')?.imageUrl || '', imageHint: 'bedroom' },
    { id: '5', name: 'Storage', slug: 'storage', imageUrl: PlaceHolderImages.find(p => p.id === 'category-5')?.imageUrl || '', imageHint: 'bookshelf' },
    { id: '6', name: 'Lighting', slug: 'lighting', imageUrl: PlaceHolderImages.find(p => p.id === 'category-5')?.imageUrl || '', imageHint: 'lamp' },
    { id: '7', name: 'Outdoor', slug: 'outdoor', imageUrl: PlaceHolderImages.find(p => p.id === 'category-5')?.imageUrl || '', imageHint: 'patio chair' },
];

const defaultOrders: Order[] = [
    { id: '1', items: [{ id: '1', name: 'Minimalist Wooden Chair', price: 150, imageUrl: PlaceHolderImages.find(p => p.id === 'product-1')?.imageUrl || '', imageHint: 'wooden chair', quantity: 2 }], customer: { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St' }, total: 300, createdAt: new Date(), status: 'Delivered' },
    { id: '2', items: [{ id: '6', name: 'Ergonomic Office Chair', price: 250, imageUrl: PlaceHolderImages.find(p => p.id === 'product-6')?.imageUrl || '', imageHint: 'office chair', quantity: 1 }], customer: { name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', address: '456 Oak Ave' }, total: 250, createdAt: new Date(Date.now() - 86400000), status: 'Pending' },
    { id: '3', items: [{ id: '2', name: 'Modern Velvet Sofa', price: 850, imageUrl: PlaceHolderImages.find(p => p.id === 'product-2')?.imageUrl || '', imageHint: 'velvet sofa', quantity: 1 }], customer: { name: 'Peter Jones', email: 'peter@example.com', phone: '555-555-5555', address: '789 Pine Ln' }, total: 850, createdAt: new Date(Date.now() - 172800000), status: 'Shipped' },
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

export function addCategory(categoryData: Omit<Category, 'id' | 'slug' | 'imageUrl' | 'imageHint'>) {
    const categories = getCategories();
    const newId = (Math.max(0, ...categories.map(c => parseInt(c.id, 10))) + 1).toString();
    const slug = categoryData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const newCategory: Category = {
        ...categoryData,
        id: newId,
        slug,
        imageUrl: `https://picsum.photos/seed/${slug}/400/400`,
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
