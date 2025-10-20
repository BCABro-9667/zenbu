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
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  imageHint: string;
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
  createdAt: string;
  status: OrderStatus;
};
