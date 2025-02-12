import { Injectable } from '@nestjs/common';

/*
    import utils
*/
import { ResponseServerService } from 'src/utils/ResponseServer.utils';
import { SanitizeService } from 'src/utils/SanitizeService.utils';

/*
    import services
*/
import { GetCommonUsers } from '../users/logic/get.users';
import { BcryptService, CreateCommonAuth } from './logic/create.auth';
import {
  CreateAuthLoginDto,
  CreateAuthSignupDto,
  SecurityAdminDto,
} from './dto/create.auth.dto';
import { StatusCode } from 'src/enums/StatusCode';
import { MessageGetUsers } from '../users/enum/message.users';
import { CreateCommonUsers } from '../users/logic/create.users';
import { MessageAuth } from './enums/message.auth';
import { CommonResponse } from 'src/types/CommonResponse.types';
import {
  KEY_SECURITY_ADMIN,
  USERNAME_SECURITY_ADMIN,
} from 'src/enums/Security.enums';
import { JwtService } from '@nestjs/jwt';
import { JwtSecretKeys } from 'src/enums/Jwt.enums';
import { JWTService } from 'src/utils/JwtService.utils';
import { GetCommonAuth } from './logic/get.auth';
import { IResponseAuth } from './interface/interfaceFunctions.create';

@Injectable()
export class AuthService {
  constructor(
    private readonly createCommonAuth: CreateCommonAuth,
    private readonly getCommonUsers: GetCommonUsers,
    private readonly responseService: ResponseServerService,
    private readonly sanitizeService: SanitizeService,
    private readonly bcryptService: BcryptService,
    private readonly createCommonUser: CreateCommonUsers,
    private readonly jwtService: JwtService,
    private readonly JWTService: JWTService,
    private readonly getCommonAuth: GetCommonAuth,
  ) {}

  async renewAccessToken(id: string) {
    const document = await this.getCommonAuth.getDocumentById(id);
    if (!document)
      return this.responseService.error(
        StatusCode.NOT_FOUND,
        'Token no encontrado.',
      );

    const verifyToken = await this.jwtService.verifyAsync(document.token, {
      secret: JwtSecretKeys.refresh,
    });

    if (!verifyToken)
      return this.responseService.error(StatusCode.CONFLICT, 'Token invalido.');

    const newAccessToken = await this.JWTService.generateNewTokenAccess(
      verifyToken.userId,
      verifyToken.email,
      verifyToken.rol,
    );

    return this.responseService.success(StatusCode.OK, 'Token renovado.', {
      access_token: newAccessToken,
      id: document._id,
    });
  }

  securityAdmin(data: SecurityAdminDto) {
    const isMatched =
      data.password === KEY_SECURITY_ADMIN &&
      data.username === USERNAME_SECURITY_ADMIN;

    if (!isMatched)
      return this.responseService.error(
        StatusCode.CONFLICT,
        'Datos incorrectos.',
      );

    return this.responseService.success(StatusCode.OK, 'Datos correctos.');
  }

  async login(
    data: CreateAuthLoginDto,
  ): Promise<CommonResponse<IResponseAuth>> {
    const user = await this.getCommonUsers.getUserByEmail(data.email);
    if (!user)
      return this.responseService.error(
        StatusCode.NOT_FOUND,
        MessageGetUsers.notFound,
      );

    const matchPassword = await this.bcryptService.compare(
      data.password,
      user.password,
    );

    if (!matchPassword)
      return this.responseService.error(
        StatusCode.CONFLICT,
        MessageAuth.passwordNoMatched,
      );

    const accessToken = this.createCommonAuth.generateAccessToken({
      email: data.email,
      rol: user.role,
      userId: user._id.toString(),
    });

    const refreshToken = this.createCommonAuth.generateRefreshToken({
      rol: user.role,
      userId: user._id.toString(),
    });

    const newDocumentToken = await this.createCommonAuth.createDocumentTokens(
      refreshToken,
      user._id,
    );

    return {
      success: true,
      message: '',
      status: 201,
      data: {
        access_token: accessToken,
        id: newDocumentToken._id,
      },
    };
  }

  async signup(
    data: CreateAuthSignupDto,
    rol: 'client' | 'admin',
  ): Promise<CommonResponse> {
    const user = await this.getCommonUsers.getUserByEmail(data.email);
    if (user)
      return this.responseService.error(
        StatusCode.CONFLICT,
        MessageAuth.userAuthenticated,
        true,
      );

    const hashedPassword = await this.bcryptService.hasher(data.password);
    const newDocument = await this.createCommonUser.createDocumentUser({
      ...data,
      role: rol,
      password: hashedPassword,
    });

    const accessToken = this.createCommonAuth.generateAccessToken({
      email: data.email,
      rol: rol,
      userId: newDocument._id.toString(),
    });

    const refreshToken = this.createCommonAuth.generateRefreshToken({
      rol: rol,
      userId: newDocument._id.toString(),
    });

    const newDocumentToken = await this.createCommonAuth.createDocumentTokens(
      refreshToken,
      newDocument._id,
    );

    return {
      success: true,
      status: 201,
      message: MessageAuth.userAuthenticated,
      data: { access_token: accessToken, id: newDocumentToken._id },
    };
  }
}
