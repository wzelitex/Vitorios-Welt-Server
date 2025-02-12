import { ShoppingsSchemaFactory } from './schema/shoppings.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { GetCommonShoppings } from './logic/get.shoppings';
import { RemoveCommonShoppings } from './logic/remove.shoppings';
import { AdminShoppingControllerProtected } from './admin/admin.shoppings.controller';
import { ClientShoppingController } from './client/client.shoppings.controller';
import { CreateCommonShoppings } from './logic/create.shoppings';
import { ClientShoppigsService } from './client/client.shoppings.service';
import { AdminShoppingService } from './admin/admin.shoppings.service';
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { ProductsModule } from '../products/products.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Shoppings',
        schema: ShoppingsSchemaFactory,
      },
    ]),
    ProductsModule,
  ],
  controllers: [AdminShoppingControllerProtected, ClientShoppingController],
  providers: [
    GetCommonShoppings,
    RemoveCommonShoppings,
    CreateCommonShoppings,
    ClientShoppigsService,
    AdminShoppingService,
    ResponseServerService,
    JwtService,
  ],
  exports: [GetCommonShoppings, RemoveCommonShoppings, CreateCommonShoppings],
})
export class ShoppingsModule {}
