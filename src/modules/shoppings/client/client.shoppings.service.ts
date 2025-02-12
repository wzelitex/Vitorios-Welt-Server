import { Injectable } from '@nestjs/common';
import { CreateShoppingDto } from './dto/create.shopping.dto';
import { CreateCommonShoppings } from '../logic/create.shoppings';
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { StatusCode } from 'src/enums/StatusCode';
import {
  MessageDeleteShoppings,
  MessageGetShoppings,
  MessagePostShoppings,
  MessagePutShoppings,
} from '../enums/message.shoppings.enums';
import { GetCommonShoppings } from '../logic/get.shoppings';
import { RemoveCommonShoppings } from '../logic/remove.shoppings';

@Injectable()
export class ClientShoppigsService {
  constructor(
    private readonly createCommonShoppings: CreateCommonShoppings,
    private readonly getCommonShoppings: GetCommonShoppings,
    private readonly responseService: ResponseServerService,
    private readonly removeCommonShoppings: RemoveCommonShoppings,
  ) {}

  async getShoppingByStatus(
    userId: string,
    offset: string,
    status: 'completed' | 'pending',
  ) {
    const shoppings = await this.getCommonShoppings.getShoppingsByStatus(
      userId,
      offset,
      status,
    );
    if (!shoppings || shoppings.length === 0)
      return this.responseService.error(
        StatusCode.NOT_FOUND,
        MessageGetShoppings.getNotFoundShoppings,
      );
    return this.responseService.success(
      StatusCode.OK,
      MessageGetShoppings.getFoundShoppings,
      shoppings,
    );
  }

  async getFilterShoppings(userId: string, filter: string, offset: string) {}

  async postNewShopping(userId: string, data: CreateShoppingDto[]) {
    await this.createCommonShoppings.createDocumentShoppings(
      data,
      userId,
      'pending',
    );

    return this.responseService.success(
      StatusCode.CREATED,
      MessagePostShoppings.newShoppingCart,
    );
  }

  async deleteShoppingCart(id: string) {
    const response =
      await this.removeCommonShoppings.removeShoppingFromCart(id);
    if (!response)
      return this.responseService.error(
        StatusCode.NOT_FOUND,
        MessageGetShoppings.getNotFoundShoppings,
      );
    return this.responseService.success(
      StatusCode.OK,
      MessageDeleteShoppings.deleteShopping,
    );
  }
}
