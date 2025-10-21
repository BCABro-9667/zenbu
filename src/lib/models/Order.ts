import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  quantity: number;
}

export interface ICustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface IOrder extends Document {
  _id: string;
  items: ICartItem[];
  customer: ICustomer;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  imageHint: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
}, { _id: false });

const CustomerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
}, { _id: false });

const OrderSchema = new Schema<IOrder>({
  items: [CartItemSchema],
  customer: CustomerSchema,
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
