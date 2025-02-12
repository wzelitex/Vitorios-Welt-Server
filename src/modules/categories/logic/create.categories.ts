import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesSchema } from '../schema/categories.scheme';
import { CreateCategoryDto } from '../dto/create-categories-dto';
import { SanitizeService } from 'src/utils/SanitizeService.utils';

@Injectable()
export class CreateCommonCategories {
  constructor(
    @InjectModel('Categories')
    private readonly categoriesModel: Model<CategoriesSchema>,
    private readonly sanitizeService: SanitizeService,
  ) {}

  async createDocumentCategory(data: CreateCategoryDto, image: string) {
    this.sanitizeService.sanitizeString(data.category);
    const newCategory = new this.categoriesModel({
      image: image,
      category: data.category,
    });
    return await newCategory.save();
  }
}
