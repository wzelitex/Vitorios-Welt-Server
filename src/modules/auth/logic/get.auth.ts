import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthSchema } from '../schema/auth.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GetCommonAuth {
  constructor(
    @InjectModel('Auth') private readonly authModel: Model<AuthSchema>,
  ) {}

  async getDocumentById(id: string) {
    return await this.authModel.findById(id);
  }
}
