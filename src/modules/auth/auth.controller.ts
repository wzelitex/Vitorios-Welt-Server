import { Controller, Post, Body } from '@nestjs/common';
import {
  CreateAuthLoginDto,
  CreateAuthSignupDto,
  SecurityAdminDto,
} from './dto/create.auth.dto';
import { AuthService } from './auth.service';
import { RoutesAuth } from './enums/routes.auth';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(RoutesAuth.renewAccessToken)
  renewAccessTokenClient(@Body('id') id: string) {
    return this.authService.renewAccessToken(id);
  }

  @Post(RoutesAuth.securityAdmin)
  securityAdmin(@Body() data: SecurityAdminDto) {
    return this.authService.securityAdmin(data);
  }

  @Post(RoutesAuth.login)
  async loginAdmin(@Body() data: CreateAuthLoginDto) {
    return await this.authService.login(data);
  }

  @Post(RoutesAuth.signupClient)
  async signupClient(@Body() data: CreateAuthSignupDto) {
    return await this.authService.signup(data, 'client');
  }

  @Post(RoutesAuth.signupAdmin)
  async signupAdmin(@Body() data: CreateAuthSignupDto) {
    return await this.authService.signup(data, 'admin');
  }
}
