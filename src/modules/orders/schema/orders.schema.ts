import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/*
    Order schema
*/

@Schema()
export class OrdersSchema extends Document {
  _id: Types.ObjectId;

  @Prop({ required: true, ref: 'Users' })
  userId: Types.ObjectId;

  @Prop({ required: true, ref: 'Products' })
  productId: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true, default: Date.now() })
  date: Date;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true, default: 'pending' })
  status: 'pending' | 'completed' | 'cancel';
}

export const OrdersSchemaFactory = SchemaFactory.createForClass(OrdersSchema);
