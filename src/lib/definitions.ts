
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
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
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
  createdAt: Date;
  status: OrderStatus;
};

export type Lead = {
    id: string;
    name: string;
    email?: string;
    phone: string;
    message: string;
    dateCreated: Date;
}

    