import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

/*
    import controllers
*/
import { AuthController } from './auth.controller';

/*
    import services
*/
import { AuthService } from './auth.service';

/*
    import utils
*/
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { CreateCommonAuth, BcryptService } from './logic/create.auth';
import { SanitizeService } from 'src/utils/SanitizeService.utils';
import { CreateCommonUsers } from '../users/logic/create.users';
import { JWTService } from 'src/utils/JwtService.utils';
import { JwtSecretKeys } from 'src/enums/Jwt.enums';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/middleware/auth.middleware';
import { AuthSchemaFactory } from './schema/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GetCommonAuth } from './logic/get.auth';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Auth',
        schema: AuthSchemaFactory,
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    JwtModule,
    JwtModule.register({
      global: true,
      secret: JwtSecretKeys.access,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    GetCommonAuth,
    AuthService,
    ResponseServerService,
    CreateCommonAuth,
    BcryptService,
    SanitizeService,
    CreateCommonUsers,
    JWTService,
    JwtStrategy,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
