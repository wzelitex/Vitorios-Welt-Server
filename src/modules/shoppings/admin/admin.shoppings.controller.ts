import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { RoutesShoppingAdmin } from '../enums/routes.shoppings.enums';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { StatusCode } from 'src/enums/StatusCode';

/*
    import services
*/
import { AdminShoppingService } from './admin.shoppings.service';
import { ResponseServerService } from 'src/utils/ResponseServer.utils';

@UseGuards(AuthGuard('jwt'))
@Controller('api/admin/shoppings')
export class AdminShoppingControllerProtected {
  constructor(
    private readonly adminShoppingService: AdminShoppingService,
    private readonly responseService: ResponseServerService,
  ) {}

  @Get(RoutesShoppingAdmin.getShoppings)
  getShoppings(@Query('offset') offset: string, @Req() req: Request) {
    const user = req.user;
    if (user.rol === 'client')
      return this.responseService.error(StatusCode.UNAUTHORIZED, '');

    return this.adminShoppingService.getShoppings(user.userId, offset);
  }

  @Get(RoutesShoppingAdmin.getDetailsShoppings)
  getDetailsShopping(@Param('id') id: string, @Req() req: Request) {
    if (req.user.rol === 'client')
      return this.responseService.error(StatusCode.UNAUTHORIZED, '');

    return this.adminShoppingService.getDetailsShopping(id);
  }

  @Get(RoutesShoppingAdmin.getFilterShoppings)
  getFilterShoppings(@Req() req: Request) {
    if (req.user.rol === 'client')
      return this.responseService.error(StatusCode.UNAUTHORIZED, '');

    return this.adminShoppingService.getFilterShoppings();
  }
}
