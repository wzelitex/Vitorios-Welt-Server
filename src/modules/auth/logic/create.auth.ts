import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IRequestGenerateAccessToken,
  IRequestGenerateRefreshToken,
  IResponseCreateDocumentAuth,
} from '../interface/interfaceFunctions.create';
import { JwtSecretKeys } from 'src/enums/Jwt.enums';
import * as bcrypt from 'bcrypt';
import { AuthSchema } from '../schema/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CreateCommonAuth {
  constructor(
    @InjectModel('Auth') private readonly authModel: Model<AuthSchema>,
    private readonly jwtService: JwtService,
  ) {}

  generateAccessToken(data: IRequestGenerateAccessToken) {
    return this.jwtService.sign(data, {
      secret: JwtSecretKeys.access,
      expiresIn: '1d',
    });
  }

  generateRefreshToken(data: IRequestGenerateRefreshToken) {
    return this.jwtService.sign(data, {
      expiresIn: '90d',
      secret: JwtSecretKeys.refresh,
    });
  }

  async createDocumentTokens(
    token: string,
    userId: Types.ObjectId,
  ): Promise<IResponseCreateDocumentAuth> {
    const newDocument = new this.authModel({
      token: token,
      userId: userId,
    });

    const documentSaved = await newDocument.save();

    return documentSaved.toObject() as IResponseCreateDocumentAuth;
  }
}

@Injectable()
export class BcryptService {
  constructor(private readonly jwtService: JwtService) {}
  private readonly salt = 10;

  private async generateSaltAround() {
    return await bcrypt.genSalt(this.salt);
  }

  async hasher(value: string) {
    const salt = await this.generateSaltAround();
    return await bcrypt.hash(value, salt);
  }

  async compare(value: string, compareValue: string): Promise<boolean> {
    return await bcrypt.compare(value, compareValue);
  }
}
