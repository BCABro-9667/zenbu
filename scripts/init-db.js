
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Avdhesh1:ya4XYnQUEtYhv5kr@cluster0.0uojesi.mongodb.net/zenbu';

// Models
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  name: { type: String, trim: true },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, required: true },
  galleryImageUrls: [{ type: String }],
  imageHint: { type: String, required: true },
  category: { type: String, required: true },
  isTopRated: { type: Boolean, default: false },
  isTopSale: { type: Boolean, default: false },
  isRecent: { type: Boolean, default: false },
  stock: { type: Number, required: true, min: 0 },
  videoUrl: { type: String },
  brochureUrl: { type: String },
  specifications: { type: Map, of: String },
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  imageUrl: { type: String, required: true },
  imageHint: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Category = mongoose.model('Category', CategorySchema);

async function initDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});

    // Create admin user
    const hashedPassword = await bcrypt.hash('Zenbu#kamalpuri@123', 10);
    const adminUser = new User({
      email: 'info@zenbu.com',
      password: hashedPassword,
      name: 'Admin User',
      isAdmin: true,
    });
    await adminUser.save();
    console.log('Admin user created');

    // Create categories
    const categories = [
      { id: '1', name: 'Locker Safes', slug: 'locker-safes', imageUrl: 'https://picsum.photos/seed/cat-safe/300/200', imageHint: 'locker safe' },
      { id: '2', name: 'Gullak', slug: 'gullak', imageUrl: 'https://picsum.photos/seed/cat-gullak/300/200', imageHint: 'money bank' },
      { id: '3', name: 'Chopping Boards', slug: 'chopping-boards', imageUrl: 'https://picsum.photos/seed/cat-board/300/200', imageHint: 'kitchen board' },
      { id: '4', name: 'Clothing Hangers', slug: 'clothing-hangers', imageUrl: 'https://picsum.photos/seed/cat-hanger/300/200', imageHint: 'closet hanger' },
      { id: '5', name: 'Mobile Stands', slug: 'mobile-stands', imageUrl: 'https://picsum.photos/seed/cat-stand/300/200', imageHint: 'phone holder' },
      { id: '6', name: 'Customizable Appliances', slug: 'customizable-appliances', imageUrl: 'https://picsum.photos/seed/cat-custom/300/200', imageHint: 'smart appliance' },
    ];

    for (const categoryData of categories) {
      const category = new Category(categoryData);
      await category.save();
    }
    console.log('Categories created');

    // Create sample products
    const products = [
      { id: '1', name: 'Digital Locker Safe', description: 'Secure your valuables with this high-tech digital safe.', longDescription: 'This digital locker safe offers top-notch security for your home or office. It features a programmable digital keypad, a solid steel construction, and concealed hinges for protection against theft. The interior is lined with soft material to prevent scratches to your valuables. It includes emergency override keys and pre-drilled holes for mounting.', price: 8000, imageUrl: 'https://picsum.photos/seed/safe/400/300', galleryImageUrls: ['https://picsum.photos/seed/safe-g1/400/300', 'https://picsum.photos/seed/safe-g2/400/300'], imageHint: 'digital safe', category: 'Locker Safes', isTopRated: true, isTopSale: false, isRecent: true, stock: 25 },
      { id: '2', name: 'Wooden Gullak (Money Bank)', description: 'A traditional yet stylish wooden money bank.', longDescription: 'Save in style with this beautifully crafted wooden gullak. Made from high-quality sheesham wood, it features a classic design with a coin slot on top. It’s not just a money bank, but also a beautiful decorative piece for your home. Perfect for teaching kids the value of saving.', price: 800, imageUrl: 'https://picsum.photos/seed/gullak/400/300', galleryImageUrls: ['https://picsum.photos/seed/gullak-g1/400/300', 'https://picsum.photos/seed/gullak-g2/400/300'], imageHint: 'wooden gullak', category: 'Gullak', isTopRated: false, isTopSale: true, isRecent: true, stock: 100 },
      { id: '3', name: 'Bamboo Chopping Board', description: 'Eco-friendly and durable bamboo chopping board.', longDescription: 'This bamboo chopping board is a must-have for any kitchen. Made from 100% natural bamboo, it is durable, long-lasting, and gentle on your knives. It features a built-in juice groove to prevent messes and is naturally antibacterial. Easy to clean and maintain.', price: 1200, imageUrl: 'https://picsum.photos/seed/board/400/300', galleryImageUrls: ['https://picsum.photos/seed/board-g1/400/300', 'https://picsum.photos/seed/board-g2/400/300'], imageHint: 'bamboo board', category: 'Chopping Boards', isTopRated: true, isTopSale: true, isRecent: false, stock: 50 },
      { id: '4', name: 'Stainless Steel Cloth Hanger', description: 'Set of 12 durable stainless steel hangers.', longDescription: 'Organize your closet with these sleek and durable stainless steel cloth hangers. Their slim design saves space, while the sturdy construction can hold heavy garments like coats and suits. They are rust-proof and feature a smooth finish to protect your clothes from snags.', price: 600, imageUrl: 'https://picsum.photos/seed/hanger/400/300', galleryImageUrls: ['https://picsum.photos/seed/hanger-g1/400/300', 'https://picsum.photos/seed/hanger-g2/400/300'], imageHint: 'steel hanger', category: 'Clothing Hangers', isTopRated: false, isTopSale: false, isRecent: true, stock: 200 },
      { id: '5', name: 'Adjustable Mobile Stand', description: 'A foldable and adjustable stand for your phone or tablet.', longDescription: 'Enjoy hands-free viewing with this adjustable mobile stand. It’s compatible with all smartphones and small tablets. The height and angle can be adjusted for comfortable viewing, making it perfect for video calls, watching movies, or following recipes. Its foldable design makes it portable and easy to carry.', price: 500, imageUrl: 'https://picsum.photos/seed/stand/400/300', galleryImageUrls: ['https://picsum.photos/seed/stand-g1/400/300', 'https://picsum.photos/seed/stand-g2/400/300'], imageHint: 'mobile stand', category: 'Mobile Stands', isTopRated: true, isTopSale: false, isRecent: true, stock: 150 },
      { id: '6', name: 'Customizable Smart Mug', description: 'A coffee mug that maintains your drink at the perfect temperature.', longDescription: 'Never drink cold coffee again! This customizable smart mug allows you to set and maintain your preferred drinking temperature via a smartphone app. You can even customize the LED color on the mug. It comes with a charging coaster and has a 1.5-hour battery life.', price: 10000, imageUrl: 'https://picsum.photos/seed/mug/400/300', galleryImageUrls: ['https://picsum.photos/seed/mug-g1/400/300', 'https://picsum.photos/seed/mug-g2/400/300'], imageHint: 'smart mug', category: 'Customizable Appliances', isTopRated: true, isTopSale: false, isRecent: true, stock: 30 },
    ];

    for (const productData of products) {
      const product = new Product(productData);
      await product.save();
    }
    console.log('Products created');

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

initDatabase();
