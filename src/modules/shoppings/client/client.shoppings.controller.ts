import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateShoppingDto } from './dto/create.shopping.dto';

import { ClientShoppigsService } from './client.shoppings.service';
import { RoutesShoppingClient } from '../enums/routes.shoppings.enums';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/client/shoppings')
export class ClientShoppingController {
  constructor(private readonly clientShoppingsService: ClientShoppigsService) {}

  @Get(RoutesShoppingClient.getShoppingsFromCart)
  async getShoppingsFromCart(
    @Query('offset') offset: string,
    @Req() req: Request,
  ) {
    return await this.clientShoppingsService.getShoppingByStatus(
      req.user.userId,
      offset,
      'pending',
    );
  }

  @Get(RoutesShoppingClient.getShoppingsHistory)
  getShoppingsHistory(@Query('offset') offset: string, @Req() req: Request) {
    const userId = req.user.userId;
    return this.clientShoppingsService.getShoppingByStatus(
      userId,
      offset,
      'completed',
    );
  }

  @Get(RoutesShoppingClient.getFilterShoppings)
  getFilterShoppings(
    @Param('filter') filter: string,
    @Query('offset') offset: string,
    @Req() req: Request,
  ) {
    const userId = req.user.userId;
    return this.clientShoppingsService.getFilterShoppings(
      userId,
      filter,
      offset,
    );
  }

  @Post(RoutesShoppingClient.postNewShopping)
  async postNewShopping(
    @Body() data: CreateShoppingDto[],
    @Req() req: Request,
  ) {
    const user = req.user;
    return await this.clientShoppingsService.postNewShopping(user.userId, data);
  }

  @Delete(RoutesShoppingClient.deleteShoppingCart)
  deleteShoppingFromCart(@Param('id') id: string) {
    return this.clientShoppingsService.deleteShoppingCart(id);
  }
}
