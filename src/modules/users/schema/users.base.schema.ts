import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/*
    User schema
*/

@Schema()
export class UsersSchema extends Document {
  @Prop({ default: '' })
  username: string;

  @Prop({ default: '' })
  password: string;

  @Prop({ default: '' })
  email: string;

  @Prop({ default: 0 })
  phone: number;

  @Prop({ default: 0 })
  lada: number;

  @Prop({ required: false, default: '' })
  number: string;

  @Prop({ required: false, default: '' })
  street: string;

  @Prop({ required: false, default: 0 })
  zipCode: number;

  @Prop({ required: false, default: '' })
  cologne: string;

  @Prop({ required: false, default: '' })
  municipality: string;

  @Prop({ required: false, default: '' })
  state: string;

  @Prop({ required: false, default: '' })
  country: string;

  @Prop({ required: true, default: 'MXN' })
  currency: string;

  @Prop({ required: false, default: '' })
  role: string;
}

export const UserSchemaFactory = SchemaFactory.createForClass(UsersSchema);
