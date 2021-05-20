import {IRole} from './role';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
  address: string;
  fiscal_id: string;
  role_id?: number;
  role: IRole;
}
