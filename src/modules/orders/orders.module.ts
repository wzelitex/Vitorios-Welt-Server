import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersSchemaFactory } from './schema/orders.schema';
import { ShoppingsModule } from '../shoppings/shoppings.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';

/*
    import controllers
*/
import { AdminOrderController } from './admin/admin.orders.controller';
import { ClientOrdersController } from './client/client.orders.controller';

/*
    import services
*/
import { AdminOrdersService } from './admin/admin.orders.service';
import { ClientOrdersService } from './client/client.orders.service';

/*
    import utils
*/
import { SetStatusOrders, CreateCommonOrders } from './logic/create.orders';
import { GetCommonOrders } from './logic/get.orders';
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { PaymentsService } from 'src/utils/PaymentService.utils';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Orders',
        schema: OrdersSchemaFactory,
      },
    ]),
    ShoppingsModule,
    ProductsModule,
    UsersModule,
  ],
  controllers: [AdminOrderController, ClientOrdersController],
  providers: [
    ResponseServerService,
    GetCommonOrders,
    SetStatusOrders,
    CreateCommonOrders,
    PaymentsService,
    AdminOrdersService,
    ClientOrdersService,
  ],
})
export class OrderModule {}
