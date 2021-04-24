import {IProperty} from './property';
import {IUser} from './user';

export interface ITour {
  property_id: number;
  customer_id: number;
  employee_id: number;
  date: string;
  time: string;
  hash_id: string;
  property?: IProperty;
  employee?: IUser;
  customer?: IUser;
}
