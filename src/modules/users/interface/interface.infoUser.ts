import { Document, Types } from 'mongoose';

export interface IGeneralInfoUsers {
  username: string;
  email: string;
  phone: number;
  lada: number;
  role: string;
  password: string;
}

export interface ILocationUsers {
  number: string;
  street: string;
  cologne: string;
  zipCode: number;
  municipality: string;
  state: string;
  country: string;
}

export interface IDocumentUser
  extends IGeneralInfoUsers,
    ILocationUsers,
    Document {
  _id: Types.ObjectId;
}
