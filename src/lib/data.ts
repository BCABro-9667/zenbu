import type { Product, Category, Order } from './definitions';
import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

const categories: Category[] = [
  { id: 'cat-1', name: 'Living Room', slug: 'living-room', imageUrl: 'category-1', imageHint: 'sofa' },
  { id: 'cat-2', name: 'Bedroom', slug: 'bedroom', imageUrl: 'category-2', imageHint: 'bed' },
  { id: 'cat-3', name: 'Dining Room', slug: 'dining-room', imageUrl: 'category-3', imageHint: 'dining table' },
  { id: 'cat-4', name: 'Office', slug: 'office', imageUrl: 'category-4', imageHint: 'office desk' },
  { id: 'cat-5', name: 'Outdoor', slug: 'outdoor', imageUrl: 'category-5', imageHint: 'patio chair' },
];

const products: Product[] = [
    { id: 'prod-1', name: 'Minimalist Wooden Chair', description: 'A sleek chair with a minimalist design, perfect for any modern home.', price: 120.00, imageUrl: 'product-1', imageHint: 'wooden chair', category: 'Living Room', isTopRated: true, isTopSale: false, isRecent: true, stock: 15 },
    { id: 'prod-2', name: 'Modern Velvet Sofa', description: 'Luxurious and comfortable, this velvet sofa is a statement piece.', price: 850.00, imageUrl: 'product-2', imageHint: 'velvet sofa', category: 'Living Room', isTopRated: true, isTopSale: true, isRecent: false, stock: 8 },
    { id: 'prod-3', name: 'Sleek Metal Bookshelf', description: 'Organize your books with this durable and stylish metal bookshelf.', price: 250.00, imageUrl: 'product-3', imageHint: 'metal bookshelf', category: 'Office', isTopRated: false, isTopSale: false, isRecent: true, stock: 20 },
    { id: 'prod-4', name: 'Round Marble Coffee Table', description: 'An elegant coffee table with a genuine marble top.', price: 450.00, imageUrl: 'product-4', imageHint: 'marble table', category: 'Living Room', isTopRated: true, isTopSale: false, isRecent: false, stock: 12 },
    { id: 'prod-5', name: 'Upholstered Queen Bed', description: 'A comfortable and stylish bed frame with soft upholstery.', price: 600.00, imageUrl: 'product-5', imageHint: 'upholstered bed', category: 'Bedroom', isTopRated: false, isTopSale: true, isRecent: true, stock: 10 },
    { id: 'prod-6', name: 'Ergonomic Office Chair', description: 'Stay comfortable during long work hours with this ergonomic chair.', price: 350.00, imageUrl: 'product-6', imageHint: 'office chair', category: 'Office', isTopRated: true, isTopSale: true, isRecent: false, stock: 25 },
    { id: 'prod-7', name: 'Industrial Floor Lamp', description: 'Add a touch of industrial chic to your space with this floor lamp.', price: 180.00, imageUrl: 'product-7', imageHint: 'floor lamp', category: 'Living Room', isTopRated: false, isTopSale: false, isRecent: true, stock: 30 },
    { id: 'prod-8', name: 'Expandable Dining Table', description: 'Host dinner parties with ease with this expandable dining table.', price: 750.00, imageUrl: 'product-8', imageHint: 'dining table', category: 'Dining Room', isTopRated: true, isTopSale: false, isRecent: false, stock: 5 },
    { id: 'prod-9', name: 'Cozy Armchair', description: 'The perfect spot to curl up with a good book.', price: 320.00, imageUrl: 'product-9', imageHint: 'armchair', category: 'Living Room', isTopRated: false, isTopSale: true, isRecent: true, stock: 18 },
    { id: 'prod-10', name: 'Modern TV Stand', description: 'A sleek and functional stand for your entertainment center.', price: 280.00, imageUrl: 'product-10', imageHint: 'TV stand', category: 'Living Room', isTopRated: false, isTopSale: false, isRecent: false, stock: 22 },
    { id: 'prod-11', name: 'Floating Wall Shelves', description: 'Display your favorite items with these minimalist floating shelves.', price: 90.00, imageUrl: 'product-11', imageHint: 'wall shelves', category: 'Bedroom', isTopRated: true, isTopSale: true, isRecent: true, stock: 40 },
    { id: 'prod-12', name: 'Patio Lounge Set', description: 'Enjoy the outdoors in comfort with this stylish lounge set.', price: 950.00, imageUrl: 'product-12', imageHint: 'patio set', category: 'Outdoor', isTopRated: true, isTopSale: false, isRecent: false, stock: 7 },
];

let orders: Order[] = [];

// Helper to find an image from placeholder data
const findImage = (id: string): ImagePlaceholder => {
    const image = PlaceHolderImages.find(img => img.id === id);
    if (!image) {
        // Return a default/fallback image if not found
        return {
            id: 'not-found',
            description: 'Image not found',
            imageUrl: 'https://picsum.photos/seed/notfound/400/400',
            imageHint: 'placeholder',
        };
    }
    return image;
};

// Public API
export const getProducts = (): Product[] => products.map(p => ({ ...p, imageUrl: findImage(p.imageUrl).imageUrl, imageHint: findImage(p.imageUrl).imageHint }));
export const getProductById = (id: string): Product | undefined => {
    const product = products.find(p => p.id === id);
    return product ? { ...product, imageUrl: findImage(product.imageUrl).imageUrl, imageHint: findImage(product.imageUrl).imageHint } : undefined;
}
export const getProductsByCategory = (categorySlug: string): Product[] => {
    const category = categories.find(c => c.slug === categorySlug);
    if (!category) return [];
    return products.filter(p => p.category === category.name).map(p => ({ ...p, imageUrl: findImage(p.imageUrl).imageUrl, imageHint: findImage(p.imageUrl).imageHint }));
}
export const getCategories = (): Category[] => categories.map(c => ({ ...c, imageUrl: findImage(c.imageUrl).imageUrl, imageHint: findImage(c.imageUrl).imageHint }));
export const getCategoryBySlug = (slug: string): Category | undefined => {
    const category = categories.find(c => c.slug === slug);
    return category ? { ...category, imageUrl: findImage(category.imageUrl).imageUrl, imageHint: findImage(category.imageUrl).imageHint } : undefined;
}
export const getHeroSliderImages = (): ImagePlaceholder[] => {
    return PlaceHolderImages.filter(img => img.id.startsWith('hero-'));
}
export const getBannerImage = (): ImagePlaceholder => findImage('banner-1');

// Admin/Orders API
export const getOrders = (): Order[] => orders;
export const addOrder = (order: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const newOrder: Order = {
        id: `order-${Date.now()}`,
        ...order,
        createdAt: new Date().toISOString(),
        status: 'Pending',
    };
    orders.unshift(newOrder); // Add to the beginning of the array
    return newOrder;
}
export const updateOrderStatus = (orderId: string, status: Order['status']): Order | undefined => {
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        return orders[orderIndex];
    }
    return undefined;
}

// Admin/Products API
export const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
        id: `prod-${Date.now()}`,
        ...product,
    };
    products.unshift(newProduct);
    return newProduct;
}
export const updateProduct = (productId: string, productUpdate: Partial<Product>) => {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...productUpdate };
        return products[productIndex];
    }
    return undefined;
}

export const deleteProduct = (productId: string) => {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        return true;
    }
    return false;
}

// Admin/Categories API
export const addCategory = (category: Pick<Category, 'name'>) => {
    const slug = category.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
    
    if (categories.some(c => c.slug === slug)) {
        throw new Error('Category with this name already exists.');
    }

    const newCategory: Category = {
        id: `cat-${Date.now()}`,
        name: category.name,
        slug: slug,
        imageUrl: 'category-new',
        imageHint: category.name.toLowerCase().split(' ').slice(0,2).join(' '),
    };
    categories.unshift(newCategory);
    return newCategory;
}

export const deleteCategory = (categoryId: string) => {
    const categoryIndex = categories.findIndex(c => c.id === categoryId);
    if (categoryIndex !== -1) {
        categories.splice(categoryIndex, 1);
        return true;
    }
    return false;
}
