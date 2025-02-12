import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AuthSchema extends Document {
  @Prop({ required: true })
  token: string;

  @Prop({ required: true, ref: 'Users' })
  userId: string;
}

export const AuthSchemaFactory = SchemaFactory.createForClass(AuthSchema);
