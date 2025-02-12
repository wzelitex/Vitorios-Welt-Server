import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoriesSchema } from '../schema/categories.scheme';
import { UpdateCategoryDto } from '../dto/update-categories-dto';

@Injectable()
export class UpdateCommonCategories {
  constructor(
    @InjectModel('Categories')
    private readonly categoriesModel: Model<CategoriesSchema>,
  ) {}

  async updateDocumentCategory(
    id: string,
    data: UpdateCategoryDto,
  ): Promise<boolean> {
    const category = await this.categoriesModel.findByIdAndUpdate(id, data);
    if (!category) return false;
    return true;
  }
}
