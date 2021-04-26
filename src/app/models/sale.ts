import {IUser} from './user';
import {IProperty} from './property';

export interface ISale {
  'property_id': number;
  'buyer_id': number;
  'seller_id': number;
  'date': string;
  'amount': number;
  'hash_id': string;
  'created_at': string;
  'updated_at': string;
  'property'?: IProperty;
  'buyer'?: IUser;
  'seller'?: IUser;
}
