import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ShoppingsSchema } from '../schema/shoppings.schema';
import { CreateShoppingDto } from '../client/dto/create.shopping.dto';
import { GetSpecificPropsProducts } from 'src/modules/products/logic/get.products';

@Injectable()
export class CreateCommonShoppings {
  constructor(
    @InjectModel('Shoppings')
    private readonly shoppingsModel: Model<ShoppingsSchema>,
    private readonly getSpecificPropsProducts: GetSpecificPropsProducts,
  ) {}

  async createDocumentShoppings(
    data: CreateShoppingDto[],
    userId: string,
    status: 'pending' | 'completed' | 'cancel',
  ) {
    const newDocuments = [];
    const isArrayData = !Array.isArray(data) ? [data] : data;

    for (const item of isArrayData) {
      const product =
        await this.getSpecificPropsProducts.getProductForCreateShoppingdById(
          item.productId,
        );

      if (!product) continue;

      const newDocument = new this.shoppingsModel({
        userId: new Types.ObjectId(userId),
        productId: new Types.ObjectId(item.productId),
        quantity: item.quantity,
        color: product.colors,
        skin: product.skin,
        total: item.quantity * product.price,
        status: status,
        size: item.size,
      });

      newDocuments.push(newDocument);
    }

    return await this.shoppingsModel.insertMany(newDocuments);
  }
}
