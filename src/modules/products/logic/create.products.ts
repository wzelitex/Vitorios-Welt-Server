import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsBaseSchema } from 'src/modules/products/schema/product.base.schema';
import { IFunctionCreateProduct } from '../interface/interfaceLogicProducts';
import { SanitizeService } from 'src/utils/SanitizeService.utils';

@Injectable()
export class CreateCommonProducts {
  constructor(
    @InjectModel('Products')
    private readonly productModel: Model<ProductsBaseSchema>,
    private readonly sanitizeService: SanitizeService,
  ) {}

  async createDocumentsProducts(data: IFunctionCreateProduct[]) {
    const newDocument = [];

    for (const item of data) {
      item.name = this.sanitizeService.sanitizeString(item.name);
      item.description = this.sanitizeService.sanitizeString(item.description);
      item.colors = this.sanitizeService.sanitizeArray(item.colors);
      item.sizes = this.sanitizeService.sanitizeArray(item.sizes);
      item.skin = this.sanitizeService.sanitizeArray(item.skin);

      newDocument.push(new this.productModel(item));
    }

    return await this.productModel.insertMany(newDocument);
  }
}

@Injectable()
export class CreateSimpleOperationProducts {
  constructor(
    @InjectModel('Products')
    private readonly productModel: Model<ProductsBaseSchema>,
  ) {}

  async substractQuantityById(id: string, quantity: number): Promise<boolean> {
    const product = await this.productModel.findById(id, {
      _id: 1,
      quantity: 1,
    });

    if (!product || quantity > product.quantity) return false;

    product.quantity -= quantity;
    await product.save();
    return true;
  }

  async addQuantityById(id: string, quantity: number): Promise<boolean> {
    const product = await this.productModel.findByIdAndUpdate(id, {
      $inc: { quantity },
    });
    if (!product) return false;
    return true;
  }
}
