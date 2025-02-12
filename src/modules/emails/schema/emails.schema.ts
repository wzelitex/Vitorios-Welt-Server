import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class ContactSchema extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Users' })
  to: Types.ObjectId;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true, default: Date.now() })
  date: Date;
}

export const ContactSchemaFactory = SchemaFactory.createForClass(ContactSchema);
