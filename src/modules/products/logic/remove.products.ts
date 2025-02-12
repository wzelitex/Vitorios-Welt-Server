import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsBaseSchema } from '../schema/product.base.schema';

@Injectable()
export class RemoveCommonProducts {
  constructor(
    @InjectModel('Products')
    private readonly productModel: Model<ProductsBaseSchema>,
  ) {}

  async removeDocumentProductById(id: string): Promise<boolean> {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) return false;
    return true;
  }
}
