import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CategoriesSchema extends Document {
  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  image: string;
}

export const CategoriesSchemaFactory =
  SchemaFactory.createForClass(CategoriesSchema);
