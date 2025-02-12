import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersSchema } from '../schema/users.base.schema';
import { IDocumentUser } from '../interface/interface.infoUser';

@Injectable()
export class GetCommonUsers {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<UsersSchema>,
  ) {}

  async getUserByEmail(email: string): Promise<IDocumentUser> {
    return await this.userModel.findOne({ email: email });
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id, { password: 0 });
  }

  async getPayerById(id: string) {
    return await this.userModel.findById(new Types.ObjectId(id), {
      email: 1,
      username: 1,
      zipCode: 1,
      street: 1,
      municipality: 1,
      state: 1,
      country: 1,
      currency: 1,
    });
  }
}

@Injectable()
export class GetSpecificPropUsers {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<UsersSchema>,
  ) {}

  async getEmailById(id: string): Promise<IDocumentUser> {
    return await this.userModel.findById(id, {
      _id: 0,
      email: 1,
    });
  }

  async getUserNameById(id: string) {
    return await this.userModel.findById(id, { name: 1, _id: 1 });
  }

  async getUserIdByEmail(email: string) {
    return await this.userModel.findOne({ email: email }, { _id: 1 });
  }

  async getCurrencyById(id: string) {
    return await this.userModel.findById(id, {
      _id: 0,
      currency: 1,
    });
  }

  async getInfoCreateOrder(id: string) {
    return await this.userModel.findById(id, {
      password: 0,
    });
  }
}
