import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesSchema } from '../schema/categories.scheme';

@Injectable()
export class GetCommonCategories {
  constructor(
    @InjectModel('Categories')
    private readonly categoriesModel: Model<CategoriesSchema>,
  ) {}

  async getAllCategories() {
    return await this.categoriesModel.find();
  }
}
