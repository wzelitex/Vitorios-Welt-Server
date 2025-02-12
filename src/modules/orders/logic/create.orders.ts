import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OrdersSchema } from '../schema/orders.schema';
import { PaymentsService } from 'src/utils/PaymentService.utils';
import { IPaymentItems } from 'src/types/payments.types';
import { IOrderDocument } from '../interface/interface.crete.orders';
import { GetCommonShoppings } from 'src/modules/shoppings/logic/get.shoppings';
import { RemoveCommonShoppings } from 'src/modules/shoppings/logic/remove.shoppings';
import { CreateSimpleOperationProducts } from 'src/modules/products/logic/create.products';
import { GetSpecificPropsProducts } from 'src/modules/products/logic/get.products';
import { CreateCommonShoppings } from 'src/modules/shoppings/logic/create.shoppings';
import { CreateShoppingDto } from 'src/modules/shoppings/client/dto/create.shopping.dto';
import { ICreateShopping } from 'src/modules/products/interface/interface.order.function';

@Injectable()
export class CreateCommonOrders {
  constructor(
    @InjectModel('Orders') private readonly orderModel: Model<OrdersSchema>,
    private readonly paymentsService: PaymentsService,
    private readonly getCommonShoppings: GetCommonShoppings,
    private readonly removeCommonShoppings: RemoveCommonShoppings,
    private readonly createSimpleOperationProducts: CreateSimpleOperationProducts,
    private readonly GetSpecificPropsProducts: GetSpecificPropsProducts,
  ) {}

  async saveDocumentOrders(data: IOrderDocument[], currency: string) {
    const itemsPayment: IPaymentItems[] = [];

    for (const item of data) {
      const product =
        await this.GetSpecificPropsProducts.getProductDataForCreateNewOrder(
          item.productId.toString(),
        );

      const newOrder = new this.orderModel({
        userId: new Types.ObjectId(item.userId),
        productId: new Types.ObjectId(item.productId),
        quantity: item.quantity,
        total: item.total,
        date: new Date(),
        status: 'pending',
        size: item.sizes,
      });

      const newDocumentOrder = await newOrder.save();
      await this.createSimpleOperationProducts.substractQuantityById(
        item.productId.toString(),
        item.quantity,
      );

      itemsPayment.push({
        _id: newDocumentOrder._id,
        name: product.name,
        currency_id: currency,
        price: product.price,
        quantity: item.quantity,
        total: newDocumentOrder.total,
      });
    }

    return itemsPayment;
  }
}

@Injectable()
export class SetStatusOrders {
  constructor(
    @InjectModel('Orders')
    private readonly orderModel: Model<OrdersSchema>,
    private readonly createDocumentShoppping: CreateCommonShoppings,
  ) {}

  async setStatusOrderCompleted(
    id: string,
    userId: string,
    data: ICreateShopping,
  ): Promise<boolean> {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) return false;

    await this.createDocumentShoppping.createDocumentShoppings(
      [data],
      userId,
      'completed',
    );

    return true;
  }

  async setStatusOrderCanceled(id: string) {
    return this.orderModel.findByIdAndUpdate(id, { status: 'canceled' });
  }
}
