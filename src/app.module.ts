import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/*
  import modules
*/
import { ProductsModule } from './modules/products/products.module';
import { OrderModule } from './modules/orders/orders.module';
import { ShoppingsModule } from './modules/shoppings/shoppings.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { EmailModule } from './modules/emails/email.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/vitorios_welt'),
    ProductsModule,
    OrderModule,
    ShoppingsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    EmailModule,
  ],
})
export class AppModule {}
