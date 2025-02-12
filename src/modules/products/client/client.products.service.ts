import { Injectable } from '@nestjs/common';
import { GetCommonProducts } from '../logic/get.products';
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { StatusCode } from 'src/enums/StatusCode';
import { MessageGetProduct } from '../enums/messageProducts.enums';

@Injectable()
export class ClientProductService {
  constructor(
    private readonly getCommonProducts: GetCommonProducts,
    private readonly responseServer: ResponseServerService,
  ) {}

  async getProductSearcher(text: string) {
    const products = await this.getCommonProducts.getProductByRelated(text);
    if (!products || products.length === 0)
      return this.responseServer.error(
        StatusCode.NOT_FOUND,
        MessageGetProduct.productNotFound,
      );
    return this.responseServer.success(
      StatusCode.OK,
      MessageGetProduct.getProduct,
      products,
    );
  }

  async getProductsRandom() {
    const products = await this.getCommonProducts.getProductsRandom();
    if (!products || products.length === 0)
      return this.responseServer.error(
        StatusCode.NOT_FOUND,
        MessageGetProduct.productNotFound,
      );

    return this.responseServer.success(
      StatusCode.OK,
      MessageGetProduct.getProduct,
      products,
    );
  }
}
