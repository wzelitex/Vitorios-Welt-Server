import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/*
    Schema products base 
*/

@Schema()
export class ProductsBaseSchema extends Document {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  colors: string[];

  @Prop({ required: true })
  sizes: string[];

  @Prop({ required: true })
  skin: string[];

  @Prop({ required: true })
  type: string;
}

export const ProductsBaseSchemaFactory =
  SchemaFactory.createForClass(ProductsBaseSchema);
