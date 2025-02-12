import { Document, Types } from 'mongoose';

export interface IShoppings extends Document {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  total: number;
  date: Date;
  status: 'pending' | 'completed' | 'cancel';
  size: string;
}
