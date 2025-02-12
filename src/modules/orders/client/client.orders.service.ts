import { Injectable } from '@nestjs/common';

/*
    import utils
*/
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { GetCommonOrders } from '../logic/get.orders';
import { CreateCommonOrders, SetStatusOrders } from '../logic/create.orders';
import { GetCommonShoppings } from 'src/modules/shoppings/logic/get.shoppings';
import { StatusCode } from 'src/enums/StatusCode';
import { MessageGetShoppings } from 'src/modules/shoppings/enums/message.shoppings.enums';
import { IOrderDocument } from '../interface/interface.crete.orders';
import { PaymentsService } from 'src/utils/PaymentService.utils';
import {
  GetCommonUsers,
  GetSpecificPropUsers,
} from 'src/modules/users/logic/get.users';
import { MessageOrders } from '../enums/message.orders';
import { CreateOrderDto } from '../dto/create.order.dto';
import { Types } from 'mongoose';
import { GetSpecificPropsProducts } from 'src/modules/products/logic/get.products';
import { MessageGetProduct } from 'src/modules/products/enums/messageProducts.enums';
import { CreateSimpleOperationProducts } from 'src/modules/products/logic/create.products';
import { RemoveCommonShoppings } from 'src/modules/shoppings/logic/remove.shoppings';

@Injectable()
export class ClientOrdersService {
  constructor(
    private readonly responseServer: ResponseServerService,
    private readonly getCommonOrders: GetCommonOrders,
    private readonly createCommonOrders: CreateCommonOrders,
    private readonly setStatusOrders: SetStatusOrders,
    private readonly getCommonShoppings: GetCommonShoppings,
    private readonly paymentsService: PaymentsService,
    private readonly getSpecificPropUsers: GetSpecificPropUsers,
    private readonly createSimpleOperationProducts: CreateSimpleOperationProducts,
    private readonly getSpecificPropsProducts: GetSpecificPropsProducts,
    private readonly removeCommonShoppings: RemoveCommonShoppings,
    private readonly getCommonUsers: GetCommonUsers,
  ) {}

  async getOrders(
    userId: string,
    offset: string,
    status: 'completed' | 'cancel' | 'pending',
  ) {
    const orders = await this.getCommonOrders.getDocumentOrders(
      userId,
      offset,
      status,
    );
    if (!orders || orders.length === 0)
      return this.responseServer.error(
        StatusCode.NOT_FOUND,
        MessageOrders.orderNotFound,
      );

    return this.responseServer.success(
      StatusCode.OK,
      MessageOrders.orderFound,
      orders,
    );
  }

  async getFilterOrders(userId: string, filter: string, offset: string) {}

  async postOrderFromCart(userId: string) {
    const shoppings =
      await this.getCommonShoppings.getShoppingsFromCart(userId);

    if (!shoppings || shoppings.length === 0)
      return this.responseServer.error(
        StatusCode.NOT_FOUND,
        MessageGetShoppings.getNotFoundShoppings,
      );

    const newArrayDocument: IOrderDocument[] = shoppings.map((item) => {
      return {
        userId: item.userId,
        productId: item.productId,
        quantity: item.quantity,
        sizes: item.size,
        total: item.total,
        status: 'pending',
      };
    });

    const user = await this.getCommonUsers.getPayerById(userId);
    const orderSaved = await this.createCommonOrders.saveDocumentOrders(
      newArrayDocument,
      user.currency,
    );

    await this.removeCommonShoppings.removeShoppingFromCart(userId);

    const response = await this.paymentsService.payOrders(orderSaved, user, {
      userId: userId,
    });

    return this.responseServer.success(
      StatusCode.OK,
      MessageOrders.orderCreated,
      response.init_point,
    );
  }

  async postOrderById(userId: string, data: CreateOrderDto) {
    const user = await this.getCommonUsers.getPayerById(userId);

    const product =
      await this.getSpecificPropsProducts.getProductDataForCreateNewOrder(
        data.productId.toString(),
      );

    if (!product)
      return this.responseServer.error(
        StatusCode.NOT_FOUND,
        MessageGetProduct.productNotFound,
      );

    const newDocument: IOrderDocument[] = [
      {
        productId: new Types.ObjectId(data.productId),
        quantity: data.quantity,
        sizes: data.sizes,
        status: 'pending',
        userId: new Types.ObjectId(userId),
        total: data.quantity * product.price,
      },
    ];

    const orderSaved = await this.createCommonOrders.saveDocumentOrders(
      newDocument,
      user.currency,
    );

    const response = await this.paymentsService.payOrders(orderSaved, user, {
      userId: userId,
    });

    return this.responseServer.success(
      StatusCode.CREATED,
      MessageOrders.orderCreated,
      response.init_point,
    );
  }

  async postCancelOrder(id: string) {
    const order = await this.getCommonOrders.getDetailsOrders(id);
    if (!order)
      return this.responseServer.error(
        StatusCode.NOT_FOUND,
        MessageOrders.orderNotFound,
      );

    const orderCanceled = await this.setStatusOrders.setStatusOrderCanceled(id);
    await this.createSimpleOperationProducts.addQuantityById(
      orderCanceled.productId.toString(),
      order.quantity,
    );

    this.responseServer.success(StatusCode.OK, MessageOrders.orderCanceled);
  }
}
