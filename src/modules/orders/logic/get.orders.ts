import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OrdersSchema } from '../schema/orders.schema';

@Injectable()
export class GetCommonOrders {
  constructor(
    @InjectModel('Orders') private readonly orderModel: Model<OrdersSchema>,
  ) {}

  private readonly limitDocumentsByRequest = 10;

  async getDocumentOrders(
    userId: string,
    offset: string,
    status: 'completed' | 'cancel' | 'pending',
  ) {
    return await this.orderModel
      .find({ userId: new Types.ObjectId(userId), status: status })
      .populate('productId', 'name size image price')
      .skip(parseInt(offset, 10))
      .limit(this.limitDocumentsByRequest);
  }

  async getTableOrders(offset: string) {
    return await this.orderModel
      .find({ status: 'pending' })
      .populate('userId', 'username')
      .populate('productId', 'name')
      .skip(parseInt(offset, 10))
      .limit(this.limitDocumentsByRequest);
  }

  async getDetailsOrders(id: string) {
    return await this.orderModel
      .findById(id)
      .populate('productId', 'image name')
      .populate('userId', 'username phone email lada');
  }
}
