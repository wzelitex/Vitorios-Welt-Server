import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesSchema } from '../schema/categories.scheme';

@Injectable()
export class DeleteCommonCategories {
  constructor(
    @InjectModel('Categories')
    private readonly categoryModel: Model<CategoriesSchema>,
  ) {}

  async deleteCategory(id: string): Promise<boolean> {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if (!category) return false;
    return true;
  }
}
