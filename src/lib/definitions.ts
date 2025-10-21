import { Timestamp } from "firebase/firestore";

export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  imageUrl: string;
  galleryImageUrls: string[];
  imageHint: string;
  category: string;
  isTopRated: boolean;
  isTopSale: boolean;
  isRecent: boolean;
  stock: number;
  videoUrl?: string;
  brochureUrl?: string;
  specifications?: Record<string, string>;
  createdAt?: Timestamp;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  imageHint: string;
  createdAt?: Timestamp;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  quantity: number;
};

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

export type Order = {
  id: string;
  items: CartItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  total: number;
  createdAt: Timestamp;
  status: OrderStatus;
};

export type Lead = {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    dateCreated: Timestamp;
}
