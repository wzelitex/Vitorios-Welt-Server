import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ShoppingsSchema } from '../schema/shoppings.schema';
import { IShoppings } from '../interface/interface.shoppings';
import { IReturnShoppings } from '../interface/interfaceLogicShoppings';

@Injectable()
export class GetCommonShoppings {
  constructor(
    @InjectModel('Shoppings')
    private readonly shoppingsModel: Model<ShoppingsSchema>,
  ) {}

  private readonly limitDocumentsByRequest = 10;

  async getDocumentShoppings(offset: string) {
    return await this.shoppingsModel
      .find({ status: 'completed' })
      .populate('userId', 'username')
      .populate('productId', 'name')
      .limit(this.limitDocumentsByRequest)
      .skip(parseInt(offset));
  }

  async getShoppingsFromCart(userId: string): Promise<IShoppings[]> {
    return await this.shoppingsModel.find({
      userId: new Types.ObjectId(userId),
      status: 'pending',
    });
  }

  async getShoppingsByStatus(
    userId: string,
    offset: string,
    status: 'pending' | 'completed',
  ): Promise<IReturnShoppings[]> {
    return await this.shoppingsModel
      .find(
        { userId: new Types.ObjectId(userId), status: status },
        {
          userId: 1,
          productId: 1,
          quantity: 1,
          total: 1,
          date: 1,
          status: 1,
          size: 1,
        },
      )
      .populate('userId', 'username')
      .populate('productId', 'name image price')
      .limit(this.limitDocumentsByRequest)
      .skip(parseInt(offset, 10))
      .lean<IReturnShoppings[]>();
  }

  async getDetailsShopping(id: string): Promise<IReturnShoppings> {
    return await this.shoppingsModel
      .findById(id, {
        userId: 1,
        productId: 1,
        quantity: 1,
        total: 1,
        date: 1,
      })
      .populate('userId', 'username')
      .populate('productId', 'name')
      .lean<IReturnShoppings>();
  }
}
