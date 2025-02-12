import { Controller, Get, Param, Query } from '@nestjs/common';
import { RotuesProductsClient } from '../enums/routes.products.enums';

/*
    import services
*/
import { ClientProductService } from './client.products.service';
import { AdminProductService } from '../admin/admin.products.service';

@Controller('api/client/products')
export class ClientProductsControllerPublic {
  constructor(
    private readonly productAdminService: AdminProductService,
    private readonly productClientService: ClientProductService,
  ) {}

  @Get(RotuesProductsClient.getProductsSearcher)
  getProductSearcher(@Query('text') text: string) {
    return this.productClientService.getProductSearcher(text);
  }

  @Get(RotuesProductsClient.getProductsRandom)
  getProductsRandom() {
    return this.productClientService.getProductsRandom();
  }

  @Get(RotuesProductsClient.getDetailsProducts)
  getProductById(@Param('id') id: string) {
    return this.productAdminService.getProductById(id);
  }

  @Get(RotuesProductsClient.getProducts)
  getProducts(@Query('offset') offset: string) {
    return this.productAdminService.getProducts(offset);
  }

  @Get(RotuesProductsClient.getTypeProducts)
  getProductsByType(
    @Param('type') type: string,
    @Query('offset') offset: string,
  ) {
    return this.productAdminService.getProductsByType(type, offset);
  }
}
