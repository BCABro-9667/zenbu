import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  dateCreated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);