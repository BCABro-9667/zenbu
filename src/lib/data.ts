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
    { id: 'prod-1', name: 'Minimalist Wooden Chair', description: 'A sleek chair with a minimalist design, perfect for any modern home.', longDescription: 'Crafted from solid oak, this chair is not only a piece of furniture but a work of art. The ergonomic design ensures comfort, while the natural wood grain brings a touch of nature indoors. It is finished with a water-resistant, non-toxic lacquer, making it durable and safe for families. Perfect for dining rooms, offices, or as a standalone accent piece.', price: 120.00, imageUrl: 'product-1', galleryImageUrls: ['gallery-1-1', 'gallery-1-2', 'gallery-1-3'], imageHint: 'wooden chair', category: 'Living Room', isTopRated: true, isTopSale: false, isRecent: true, stock: 15 },
    { id: 'prod-2', name: 'Modern Velvet Sofa', description: 'Luxurious and comfortable, this velvet sofa is a statement piece.', longDescription: 'Indulge in the opulence of our Modern Velvet Sofa. Upholstered in premium, stain-resistant velvet, this sofa features plush cushioning and a sturdy, kiln-dried hardwood frame. Its deep seats and elegant tufting make it the perfect centerpiece for any sophisticated living space. Available in a variety of rich colors to match your decor.', price: 850.00, imageUrl: 'product-2', galleryImageUrls: ['gallery-2-1', 'gallery-2-2', 'gallery-2-3'], imageHint: 'velvet sofa', category: 'Living Room', isTopRated: true, isTopSale: true, isRecent: false, stock: 8 },
    { id: 'prod-3', name: 'Sleek Metal Bookshelf', description: 'Organize your books with this durable and stylish metal bookshelf.', longDescription: 'This industrial-style bookshelf combines functionality with a modern aesthetic. Made from high-grade steel with a powder-coated finish, it offers five spacious shelves to display your favorite books and decor. The minimalist X-frame design ensures stability and adds a graphic element to your room.', price: 250.00, imageUrl: 'product-3', galleryImageUrls: ['gallery-3-1', 'gallery-3-2', 'gallery-3-3'], imageHint: 'metal bookshelf', category: 'Office', isTopRated: false, isTopSale: false, isRecent: true, stock: 20 },
    { id: 'prod-4', name: 'Round Marble Coffee Table', description: 'An elegant coffee table with a genuine marble top.', longDescription: 'Elevate your living room with this exquisite coffee table. Featuring a genuine Carrara marble top with unique veining, each table is one-of-a-kind. The sleek, geometric metal base provides a contemporary contrast and stable support. It\'s the perfect surface for your coffee, magazines, and decorative items.', price: 450.00, imageUrl: 'product-4', galleryImageUrls: ['gallery-4-1', 'gallery-4-2', 'gallery-4-3'], imageHint: 'marble table', category: 'Living Room', isTopRated: true, isTopSale: false, isRecent: false, stock: 12 },
    { id: 'prod-5', name: 'Upholstered Queen Bed', description: 'A comfortable and stylish bed frame with soft upholstery.', longDescription: 'Create a serene and inviting bedroom with our Upholstered Queen Bed. The headboard is covered in a soft, durable linen-blend fabric and features elegant button tufting. The solid wood frame and slats provide excellent support for your mattress without the need for a box spring. Sweet dreams await.', price: 600.00, imageUrl: 'product-5', galleryImageUrls: ['gallery-5-1', 'gallery-5-2', 'gallery-5-3'], imageHint: 'upholstered bed', category: 'Bedroom', isTopRated: false, isTopSale: true, isRecent: true, stock: 10 },
    { id: 'prod-6', name: 'Ergonomic Office Chair', description: 'Stay comfortable during long work hours with this ergonomic chair.', longDescription: 'Boost your productivity with a chair that’s designed for comfort. This ergonomic office chair features adjustable lumbar support, armrests, and seat height. The breathable mesh back keeps you cool, while the high-density foam cushion provides all-day comfort. Smooth-rolling casters make it easy to move around your workspace.', price: 350.00, imageUrl: 'product-6', galleryImageUrls: ['gallery-6-1', 'gallery-6-2', 'gallery-6-3'], imageHint: 'office chair', category: 'Office', isTopRated: true, isTopSale: true, isRecent: false, stock: 25 },
    { id: 'prod-7', name: 'Industrial Floor Lamp', description: 'Add a touch of industrial chic to your space with this floor lamp.', longDescription: 'Illuminate your space in style. This floor lamp features a sturdy metal base, an adjustable head, and a warm, ambient glow. Its design is inspired by vintage factory lighting, making it a great addition to any modern or industrial-themed room. An Edison-style LED bulb is included.', price: 180.00, imageUrl: 'product-7', galleryImageUrls: ['gallery-7-1', 'gallery-7-2', 'gallery-7-3'], imageHint: 'floor lamp', category: 'Living Room', isTopRated: false, isTopSale: false, isRecent: true, stock: 30 },
    { id: 'prod-8', name: 'Expandable Dining Table', description: 'Host dinner parties with ease with this expandable dining table.', longDescription: 'From intimate family dinners to large gatherings, this expandable dining table adapts to your needs. Crafted from solid acacia wood, it features a butterfly leaf that easily stores within the table. The clean lines and warm wood finish make it a versatile choice for any dining room.', price: 750.00, imageUrl: 'product-8', galleryImageUrls: ['gallery-8-1', 'gallery-8-2', 'gallery-8-3'], imageHint: 'dining table', category: 'Dining Room', isTopRated: true, isTopSale: false, isRecent: false, stock: 5 },
    { id: 'prod-9', name: 'Cozy Armchair', description: 'The perfect spot to curl up with a good book.', longDescription: 'Sink into the plush comfort of our Cozy Armchair. With its deep seat, soft, textured fabric, and generous cushioning, it’s the ideal chair for relaxing. The solid wood legs provide a touch of mid-century modern flair. This armchair will quickly become your favorite seat in the house.', price: 320.00, imageUrl: 'product-9', galleryImageUrls: ['gallery-9-1', 'gallery-9-2', 'gallery-9-3'], imageHint: 'armchair', category: 'Living Room', isTopRated: false, isTopSale: true, isRecent: true, stock: 18 },
    { id: 'prod-10', name: 'Modern TV Stand', description: 'A sleek and functional stand for your entertainment center.', longDescription: 'This TV stand offers a stylish and practical solution for your media storage needs. It features a combination of open shelving and closed cabinets, perfect for your devices, movies, and more. The clean, low-profile design complements any modern living room, and integrated cable management keeps wires tidy.', price: 280.00, imageUrl: 'product-10', galleryImageUrls: ['gallery-10-1', 'gallery-10-2', 'gallery-10-3'], imageHint: 'TV stand', category: 'Living Room', isTopRated: false, isTopSale: false, isRecent: false, stock: 22 },
    { id: 'prod-11', name: 'Floating Wall Shelves', description: 'Display your favorite items with these minimalist floating shelves.', longDescription: 'Create a personalized wall display with these simple yet elegant floating shelves. Made from durable MDF with a smooth finish, they appear to float on the wall thanks to concealed mounting hardware. They are perfect for showcasing photos, small plants, and collectibles in any room.', price: 90.00, imageUrl: 'product-11', galleryImageUrls: ['gallery-11-1', 'gallery-11-2', 'gallery-11-3'], imageHint: 'wall shelves', category: 'Bedroom', isTopRated: true, isTopSale: true, isRecent: true, stock: 40 },
    { id: 'prod-12', name: 'Patio Lounge Set', description: 'Enjoy the outdoors in comfort with this stylish lounge set.', longDescription: 'Transform your patio into an outdoor oasis. This 4-piece lounge set includes a loveseat, two armchairs, and a coffee table. It’s constructed from weather-resistant acacia wood and comes with thick, comfortable cushions covered in a fade-resistant fabric. Perfect for relaxing or entertaining guests.', price: 950.00, imageUrl: 'product-12', galleryImageUrls: ['gallery-12-1', 'gallery-12-2', 'gallery-12-3'], imageHint: 'patio set', category: 'Outdoor', isTopRated: true, isTopSale: false, isRecent: false, stock: 7 },
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
export const getProducts = (): Product[] => products.map(p => ({ ...p, imageUrl: findImage(p.imageUrl).imageUrl, imageHint: findImage(p.imageUrl).imageHint, galleryImageUrls: p.galleryImageUrls.map(id => findImage(id).imageUrl) }));
export const getProductById = (id: string): Product | undefined => {
    const product = products.find(p => p.id === id);
    return product ? { ...product, imageUrl: findImage(product.imageUrl).imageUrl, imageHint: findImage(product.imageUrl).imageHint, galleryImageUrls: product.galleryImageUrls.map(id => findImage(id).imageUrl) } : undefined;
}
export const getProductsByCategory = (categorySlug: string): Product[] => {
    const category = categories.find(c => c.slug === categorySlug);
    if (!category) return [];
    return products.filter(p => p.category === category.name).map(p => ({ ...p, imageUrl: findImage(p.imageUrl).imageUrl, imageHint: findImage(p.imageUrl).imageHint, galleryImageUrls: p.galleryImageUrls.map(id => findImage(id).imageUrl) }));
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
export const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(o => o.id === orderId);
}

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

export const updateCategory = (categoryId: string, categoryUpdate: Pick<Category, 'name'>) => {
    const categoryIndex = categories.findIndex(c => c.id === categoryId);
    if (categoryIndex !== -1) {
        const newSlug = categoryUpdate.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
        
        if (categories.some(c => c.slug === newSlug && c.id !== categoryId)) {
            throw new Error('Another category with this name already exists.');
        }

        categories[categoryIndex].name = categoryUpdate.name;
        categories[categoryIndex].slug = newSlug;
        
        return categories[categoryIndex];
    }
    return undefined;
}

export const deleteCategory = (categoryId: string) => {
    const categoryIndex = categories.findIndex(c => c.id === categoryId);
    if (categoryIndex !== -1) {
        categories.splice(categoryIndex, 1);
        return true;
    }
    return false;
}
