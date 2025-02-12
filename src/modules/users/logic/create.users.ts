import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersSchema } from '../schema/users.base.schema';
import { ICreateUser } from '../interface/interfaceFunction.create';
import { SanitizeService } from 'src/utils/SanitizeService.utils';
import { IDocumentUser } from '../interface/interface.infoUser';

@Injectable()
export class CreateCommonUsers {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<UsersSchema>,
    private readonly sanitizeService: SanitizeService,
  ) {}

  async createDocumentUser(data: ICreateUser): Promise<IDocumentUser> {
    this.sanitizeService.sanitizeString(data.username);
    this.sanitizeService.sanitizeString(data.email);

    const newUser = new this.userModel(data);

    const newDocument = await newUser.save();
    return newDocument.toObject() as IDocumentUser;
  }
}
