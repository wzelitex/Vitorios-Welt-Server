import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ShoppingsSchema } from '../schema/shoppings.schema';

@Injectable()
export class RemoveCommonShoppings {
  constructor(
    @InjectModel('Shoppings')
    private readonly shoppingsModel: Model<ShoppingsSchema>,
  ) {}

  async removeShoppingFromCart(id: string): Promise<boolean> {
    const shoppings = await this.shoppingsModel.deleteMany({
      userId: new Types.ObjectId(id),
    });

    if (!shoppings) return false;
    return true;
  }

  async removeShoppingById(id: string) {
    return this.shoppingsModel.findByIdAndDelete(id);
  }
}
