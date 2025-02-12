import { Injectable } from '@nestjs/common';

/*
    import utils
*/
import { ResponseServerService } from 'src/utils/ResponseServer.utils';

/*
    import services
*/
import { GetCommonShoppings } from '../logic/get.shoppings';
import { StatusCode } from 'src/enums/StatusCode';
import { MessageGetShoppings } from '../enums/message.shoppings.enums';

@Injectable()
export class AdminShoppingService {
  constructor(
    private readonly getCommonShoppings: GetCommonShoppings,
    private readonly responseService: ResponseServerService,
  ) {}

  async getShoppings(userId: string, offset: string) {
    const shoppings =
      await this.getCommonShoppings.getDocumentShoppings(offset);
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

  async getDetailsShopping(id: string) {
    const shopping = await this.getCommonShoppings.getDetailsShopping(id);
    if (!shopping)
      return this.responseService.error(
        StatusCode.NOT_FOUND,
        MessageGetShoppings.getNotFoundShoppings,
      );
    return this.responseService.success(
      StatusCode.NOT_FOUND,
      MessageGetShoppings.getFoundShoppings,
      shopping,
    );
  }

  async getFilterShoppings() {}
}
