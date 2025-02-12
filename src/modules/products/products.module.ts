import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsBaseSchemaFactory } from './schema/product.base.schema';

/* 
    Imports controllers
*/
import { AdminProductsControllerProtected } from './admin/admin.products.controller';
import { ClientProductsControllerPublic } from './client/client.products.controller';

/*
  imports services
*/
import { AdminProductService } from './admin/admin.products.service';
import {
  CreateCommonProducts,
  CreateSimpleOperationProducts,
} from './logic/create.products';
import {
  GetCommonProducts,
  GetSpecificPropsProducts,
} from './logic/get.products';
import { RemoveCommonProducts } from './logic/remove.products';
import { UpdateCommonProducts } from './logic/update.products';

/* 
    imports utils
*/
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { SanitizeService } from 'src/utils/SanitizeService.utils';
import { JwtService } from '@nestjs/jwt';
import { ClientProductService } from './client/client.products.service';
import { ImageService } from 'src/utils/ImageService.utils';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Products',
        schema: ProductsBaseSchemaFactory,
      },
    ]),
  ],
  controllers: [
    AdminProductsControllerProtected,
    ClientProductsControllerPublic,
  ],
  providers: [
    ResponseServerService,
    SanitizeService,
    AdminProductService,
    CreateCommonProducts,
    GetCommonProducts,
    RemoveCommonProducts,
    UpdateCommonProducts,
    JwtService,
    CreateSimpleOperationProducts,
    GetSpecificPropsProducts,
    ClientProductService,
    ImageService,
  ],
  exports: [CreateSimpleOperationProducts, GetSpecificPropsProducts],
})
export class ProductsModule {}
