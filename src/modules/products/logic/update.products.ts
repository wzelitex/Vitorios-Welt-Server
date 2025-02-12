import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsBaseSchema } from '../schema/product.base.schema';
import { IFunctionCreateProduct } from '../interface/interfaceLogicProducts';

@Injectable()
export class UpdateCommonProducts {
  constructor(
    @InjectModel('Products')
    private readonly productModel: Model<ProductsBaseSchema>,
  ) {}

  async updateDocumentProductById(
    id: string,
    data: IFunctionCreateProduct,
  ): Promise<boolean> {
    const product = await this.productModel.findById(id);
    if (!product) return false;

    if (data.name) product.name = data.name;
    if (data.description) product.description = data.description;
    if (data.price) product.price = data.price;
    if (data.quantity) product.quantity = data.quantity;
    if (data.colors) product.colors = data.colors;
    if (data.sizes) product.sizes = data.sizes;
    if (data.skin) product.skin = data.skin;
    if (data.type) product.type = data.type;

    await product.save();
    return true;
  }
}
