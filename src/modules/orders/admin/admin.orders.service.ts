import { Injectable } from '@nestjs/common';

/*
    import utils
*/
import { GetCommonOrders } from '../logic/get.orders';
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { StatusCode } from 'src/enums/StatusCode';
import { MessageOrders } from '../enums/message.orders';
import { SetStatusOrders } from '../logic/create.orders';

@Injectable()
export class AdminOrdersService {
  constructor(
    private readonly getCommonOrders: GetCommonOrders,
    private readonly responseServer: ResponseServerService,
    private readonly setStatusOrders: SetStatusOrders,
  ) {}

  async getOrders(offset: string) {
    const orders = await this.getCommonOrders.getTableOrders(offset);
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

  async getDetailsOrders(id: string) {
    const order = await this.getCommonOrders.getDetailsOrders(id);
    if (!order)
      return this.responseServer.error(
        StatusCode.NOT_FOUND,
        MessageOrders.orderNotFound,
      );
    return this.responseServer.success(
      StatusCode.OK,
      MessageOrders.orderFound,
      order,
    );
  }

  async getFilterOrders(filter: string, offset: string) {}

  async postCompleteOrder(id: string) {
    const order = await this.getCommonOrders.getDetailsOrders(id);
    if (!order)
      return this.responseServer.error(
        StatusCode.NOT_FOUND,
        MessageOrders.orderNotFound,
      );

    await this.setStatusOrders.setStatusOrderCompleted(
      id,
      order.userId._id.toString(),
      {
        productId: order.productId._id.toString(),
        quantity: order.quantity,
        size: order.size.toString(),
      },
    );

    return this.responseServer.success(
      StatusCode.OK,
      MessageOrders.orderCompleted,
    );
  }
}
