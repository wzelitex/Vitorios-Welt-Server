import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientUsersService } from './client.users.service';
import { RoutesUsersClient } from '../enum/routes.users';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
  ClientUserUpdateLocationDto,
  ClientUsersUpdateDto,
} from '../dto/update.users.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api/client/users')
export class ClientUsersController {
  constructor(private readonly clientUsersService: ClientUsersService) {}

  @Get(RoutesUsersClient.getInfo)
  getInfo(@Req() req: Request) {
    const userId = req.user.userId;
    return this.clientUsersService.getInfo(userId);
  }

  @Get(RoutesUsersClient.getEmail)
  getEmail(@Req() req: Request) {
    const userId = req.user.userId;
    return this.clientUsersService.getEmail(userId);
  }

  @Patch(RoutesUsersClient.putInfo)
  putInfo(@Req() req: Request, @Body() data: ClientUsersUpdateDto) {
    return this.clientUsersService.putInfo(req.user.userId, data);
  }

  @Patch(RoutesUsersClient.putLocation)
  putLocation(@Req() req: Request, @Body() data: ClientUserUpdateLocationDto) {
    return this.clientUsersService.putLocation(req.user.userId, data);
  }
}
