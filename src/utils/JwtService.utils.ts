import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSecretKeys } from 'src/enums/Jwt.enums';

@Injectable()
export class JWTService {
  constructor(private readonly jwtService: JwtService) {}

  // POST generate newToken
  async generateNewTokenAccess(
    userId: any,
    email: string,
    rol: string,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      { userId, rol, email: email },
      {
        secret: JwtSecretKeys.access,
        expiresIn: '1d',
      },
    );
  }

  async generateNewTokenRefresh(userId: any) {
    return await this.jwtService.signAsync(
      { userId: userId },
      {
        secret: JwtSecretKeys.refresh,
        expiresIn: '90d',
      },
    );
  }
}
