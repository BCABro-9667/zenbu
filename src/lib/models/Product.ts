import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  _id: string;
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
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  galleryImageUrls: [{
    type: String,
  }],
  imageHint: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isTopRated: {
    type: Boolean,
    default: false,
  },
  isTopSale: {
    type: Boolean,
    default: false,
  },
  isRecent: {
    type: Boolean,
    default: false,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  videoUrl: {
    type: String,
  },
  brochureUrl: {
    type: String,
  },
  specifications: {
    type: Map,
    of: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);