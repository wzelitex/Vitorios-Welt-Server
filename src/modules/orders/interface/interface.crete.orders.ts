import {
  IGeneralInfoUsers,
  ILocationUsers,
} from 'src/modules/users/interface/interface.infoUser';
import { Types } from 'mongoose';

export interface IRealizeOrders extends IGeneralInfoUsers, ILocationUsers {}

export interface IOrderDocument {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  sizes: string;
  total: number;
  status: 'pending' | 'completed' | 'canceled';
}
