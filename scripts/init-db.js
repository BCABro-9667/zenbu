require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zenbu';

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
      {
        name: 'Living Room',
        slug: 'living-room',
        imageUrl: '/api/placeholder/300/200',
        imageHint: 'Modern living room furniture collection',
      },
      {
        name: 'Bedroom',
        slug: 'bedroom',
        imageUrl: '/api/placeholder/300/200',
        imageHint: 'Comfortable bedroom furniture',
      },
      {
        name: 'Dining Room',
        slug: 'dining-room',
        imageUrl: '/api/placeholder/300/200',
        imageHint: 'Elegant dining room sets',
      },
      {
        name: 'Office',
        slug: 'office',
        imageUrl: '/api/placeholder/300/200',
        imageHint: 'Professional office furniture',
      },
    ];

    for (const categoryData of categories) {
      const category = new Category(categoryData);
      await category.save();
    }
    console.log('Categories created');

    // Create sample products
    const products = [
      {
        name: 'Modern Sofa Set',
        description: 'Comfortable 3-seater sofa with matching chairs',
        longDescription: 'This modern sofa set features premium upholstery and ergonomic design. Perfect for contemporary living spaces.',
        price: 45000,
        imageUrl: '/api/placeholder/400/300',
        galleryImageUrls: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
        imageHint: 'Modern sofa set in living room',
        category: 'Living Room',
        isTopRated: true,
        isTopSale: false,
        isRecent: true,
        stock: 10,
        specifications: {
          'Material': 'Premium Fabric',
          'Dimensions': '200cm x 90cm x 80cm',
          'Color': 'Grey',
        },
      },
      {
        name: 'King Size Bed',
        description: 'Solid wood king size bed with storage',
        longDescription: 'Crafted from premium hardwood, this king size bed offers both comfort and functionality with built-in storage.',
        price: 35000,
        imageUrl: '/api/placeholder/400/300',
        galleryImageUrls: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
        imageHint: 'King size bed in bedroom',
        category: 'Bedroom',
        isTopRated: false,
        isTopSale: true,
        isRecent: false,
        stock: 5,
        specifications: {
          'Material': 'Solid Wood',
          'Dimensions': '200cm x 200cm x 100cm',
          'Color': 'Natural Wood',
        },
      },
      {
        name: 'Dining Table Set',
        description: '6-seater dining table with matching chairs',
        longDescription: 'Elegant dining table set perfect for family gatherings. Features premium wood finish and comfortable seating.',
        price: 28000,
        imageUrl: '/api/placeholder/400/300',
        galleryImageUrls: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
        imageHint: 'Dining table set in dining room',
        category: 'Dining Room',
        isTopRated: true,
        isTopSale: true,
        isRecent: false,
        stock: 8,
        specifications: {
          'Material': 'Engineered Wood',
          'Dimensions': '180cm x 90cm x 75cm',
          'Color': 'Brown',
        },
      },
      {
        name: 'Office Desk',
        description: 'Ergonomic office desk with drawers',
        longDescription: 'Professional office desk designed for productivity. Features multiple drawers and cable management.',
        price: 22000,
        imageUrl: '/api/placeholder/400/300',
        galleryImageUrls: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
        imageHint: 'Office desk in workspace',
        category: 'Office',
        isTopRated: false,
        isTopSale: false,
        isRecent: true,
        stock: 12,
        specifications: {
          'Material': 'MDF with Laminate',
          'Dimensions': '120cm x 60cm x 75cm',
          'Color': 'White',
        },
      },
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
