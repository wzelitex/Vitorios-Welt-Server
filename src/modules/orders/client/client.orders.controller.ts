import {
  Controller,
  Post,
  Body,
  Param,
  Query,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RotuesOrdersClient } from '../enums/routes.orders';
import { Request } from 'express';

/*
    import services
*/
import { ClientOrdersService } from './client.orders.service';
import { CreateOrderDto } from '../dto/create.order.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/client/orders')
export class ClientOrdersController {
  constructor(private readonly clientOrdersService: ClientOrdersService) {}

  @Get(RotuesOrdersClient.getOrders)
  getOrders(@Req() req: Request, @Query('offset') offset: string) {
    const userId = req.user.userId;
    return this.clientOrdersService.getOrders(userId, offset, 'pending');
  }

  @Get(RotuesOrdersClient.getFilterOrders)
  getFilterOrders(
    @Req() req: Request,
    @Param('filter') filter: string,
    @Query('offset') offset: string,
  ) {
    const userId = req.user.userId;
    return this.clientOrdersService.getFilterOrders(userId, filter, offset);
  }

  @Post(RotuesOrdersClient.postOrder)
  postOrder(@Req() req: Request, @Body() data: CreateOrderDto) {
    const userId = req.user.userId;
    return this.clientOrdersService.postOrderById(userId, data);
  }

  @Post(RotuesOrdersClient.postOrderFromCart)
  postOrderFromCart(@Req() req: Request) {
    const userId = req.user.userId;
    return this.clientOrdersService.postOrderFromCart(userId);
  }

  @Post(RotuesOrdersClient.postCancel)
  postCancelOrder(@Param('id') id: string) {
    return this.clientOrdersService.postCancelOrder(id);
  }
}
