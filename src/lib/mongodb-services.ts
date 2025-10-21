import connectDB from './mongodb';
import Product from './models/Product';
import Category from './models/Category';
import Order from './models/Order';
import Lead from './models/Lead';
import User from './models/User';
import type { IProduct, ICategory, IOrder, ILead, IUser, ICartItem, ICustomer } from './models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Product Services
export async function getProducts(): Promise<IProduct[]> {
  await connectDB();
  return await Product.find().sort({ createdAt: -1 });
}

export async function getProductById(id: string): Promise<IProduct | null> {
  await connectDB();
  return await Product.findById(id);
}

export async function createProduct(productData: Partial<IProduct>): Promise<IProduct> {
  await connectDB();
  const product = new Product(productData);
  return await product.save();
}

export async function updateProduct(id: string, productData: Partial<IProduct>): Promise<IProduct | null> {
  await connectDB();
  return await Product.findByIdAndUpdate(id, productData, { new: true });
}

export async function deleteProduct(id: string): Promise<boolean> {
  await connectDB();
  const result = await Product.findByIdAndDelete(id);
  return !!result;
}

// Category Services
export async function getCategories(): Promise<ICategory[]> {
  await connectDB();
  return await Category.find().sort({ createdAt: -1 });
}

export async function getCategoryById(id: string): Promise<ICategory | null> {
  await connectDB();
  return await Category.findById(id);
}

export async function getCategoryBySlug(slug: string): Promise<ICategory | null> {
  await connectDB();
  return await Category.findOne({ slug });
}

export async function createCategory(categoryData: Partial<ICategory>): Promise<ICategory> {
  await connectDB();
  const category = new Category(categoryData);
  return await category.save();
}

export async function updateCategory(id: string, categoryData: Partial<ICategory>): Promise<ICategory | null> {
  await connectDB();
  return await Category.findByIdAndUpdate(id, categoryData, { new: true });
}

export async function deleteCategory(id: string): Promise<boolean> {
  await connectDB();
  const result = await Category.findByIdAndDelete(id);
  return !!result;
}

// Order Services
export async function getOrders(): Promise<IOrder[]> {
  await connectDB();
  return await Order.find().sort({ createdAt: -1 });
}

export async function getOrderById(id: string): Promise<IOrder | null> {
  await connectDB();
  return await Order.findById(id);
}

export async function createOrder(orderData: {
  items: ICartItem[];
  customer: ICustomer;
  total: number;
}): Promise<IOrder> {
  await connectDB();
  const order = new Order(orderData);
  return await order.save();
}

export async function updateOrderStatus(id: string, status: string): Promise<IOrder | null> {
  await connectDB();
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
}

// Lead Services
export async function getLeads(): Promise<ILead[]> {
  await connectDB();
  return await Lead.find().sort({ createdAt: -1 });
}

export async function createLead(leadData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<ILead> {
  await connectDB();
  const lead = new Lead(leadData);
  return await lead.save();
}

// User Services
export async function getUserByEmail(email: string): Promise<IUser | null> {
  await connectDB();
  return await User.findOne({ email });
}

export async function createUser(userData: {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  address?: string;
  isAdmin?: boolean;
}): Promise<IUser> {
  await connectDB();
  
  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  
  const user = new User({
    ...userData,
    password: hashedPassword,
  });
  
  return await user.save();
}

export async function validateUser(email: string, password: string): Promise<IUser | null> {
  await connectDB();
  const user = await User.findOne({ email });
  
  if (!user) {
    return null;
  }
  
  const isValidPassword = await bcrypt.compare(password, user.password);
  
  if (!isValidPassword) {
    return null;
  }
  
  return user;
}

export async function generateToken(user: IUser): Promise<string> {
  return jwt.sign(
    { 
      userId: user._id, 
      email: user.email, 
      isAdmin: user.isAdmin 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function verifyToken(token: string): Promise<any> {
  return jwt.verify(token, JWT_SECRET);
}