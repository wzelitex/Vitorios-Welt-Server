import { Document } from 'mongoose';

export interface IRequestGenerateRefreshToken {
  userId: string;
  rol: string;
}

export interface IRequestGenerateAccessToken
  extends IRequestGenerateRefreshToken {
  email: string;
}

export interface IResponseAuth {
  access_token: string;
  id: string;
}

export interface IResponseCreateDocumentAuth extends Document {
  token: string;
  userId: string;
  _id: string;
}
