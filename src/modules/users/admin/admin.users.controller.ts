import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { AdminUsersService } from './admin.users.service';

@Controller()
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}
}
