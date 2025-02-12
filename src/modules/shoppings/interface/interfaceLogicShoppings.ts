import { Types, Document } from 'mongoose';

export interface IReturnShoppings extends Document {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  date: Date;
  total: number;
}
