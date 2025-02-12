import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  IUpdateLocationUser,
  IUpdateUser,
} from '../interface/interfaceFunction.update';
import { UsersSchema } from '../schema/users.base.schema';
import { SanitizeService } from 'src/utils/SanitizeService.utils';

@Injectable()
export class UpdateCommonUsers {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<UsersSchema>,
    private readonly sanitizeService: SanitizeService,
  ) {}

  async updateGeneralDataById(
    userId: string,
    data: IUpdateUser,
  ): Promise<boolean> {
    if (data.username) this.sanitizeService.sanitizeString(data.username);
    if (data.email) this.sanitizeService.sanitizeString(data.email);

    await this.userModel.findByIdAndUpdate(
      userId,
      {
        username: data.username,
        email: data.email,
        phone: data.phone,
        lada: data.lada,
      },
      {
        new: true,
      },
    );
    return true;
  }

  async updateLocationDataById(
    userId: string,
    data: IUpdateLocationUser,
  ): Promise<boolean> {
    if (data.street) this.sanitizeService.sanitizeString(data.street);
    if (data.cologne) this.sanitizeService.sanitizeString(data.cologne);
    if (data.municipality)
      this.sanitizeService.sanitizeString(data.municipality);
    if (data.state) this.sanitizeService.sanitizeString(data.state);
    if (data.country) this.sanitizeService.sanitizeString(data.country);

    await this.userModel.findByIdAndUpdate(
      userId,
      {
        street: data.street,
        zipCode: data.zipCode,
        cologne: data.cologne,
        municipality: data.municipality,
        state: data.state,
        country: data.country,
        number: data.number,
      },
      {
        new: true,
      },
    );
    return true;
  }
}
