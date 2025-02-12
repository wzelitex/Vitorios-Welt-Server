import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RoutesOrdersAdmin } from '../enums/routes.orders';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

/*
    import services
*/
import { AdminOrdersService } from './admin.orders.service';
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { StatusCode } from 'src/enums/StatusCode';

@UseGuards(AuthGuard('jwt'))
@Controller('api/admin/orders')
export class AdminOrderController {
  constructor(
    private readonly adminOrdersService: AdminOrdersService,
    private readonly responseService: ResponseServerService,
  ) {}

  @Get(RoutesOrdersAdmin.getOrders)
  getOrders(@Query('offset') offset: string, @Req() req: Request) {
    if (req.user.rol === 'client')
      return this.responseService.error(StatusCode.UNAUTHORIZED, '');

    return this.adminOrdersService.getOrders(offset);
  }

  @Get(RoutesOrdersAdmin.getDetailsOrders)
  getDetailsOrders(@Param('id') id: string, @Req() req: Request) {
    if (req.user.rol === 'client')
      return this.responseService.error(StatusCode.UNAUTHORIZED, '');

    return this.adminOrdersService.getDetailsOrders(id);
  }

  @Get(RoutesOrdersAdmin.getFilterOrders)
  getFilterOrders(
    @Param('filter') filter: string,
    @Query('offset') offset: string,
    @Req() req: Request,
  ) {
    if (req.user.rol === 'client')
      return this.responseService.error(StatusCode.UNAUTHORIZED, '');

    return this.adminOrdersService.getFilterOrders(filter, offset);
  }

  @Post(RoutesOrdersAdmin.postComplete)
  postCompleteOrder(@Param('id') id: string) {
    return this.adminOrdersService.postCompleteOrder(id);
  }
}
