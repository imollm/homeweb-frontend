import {IRole} from './role';

export interface IAuthUser {
  'id': number;
  'name': string;
  'email': string;
  'email_verified_at': string;
  'phone': string;
  'address': string;
  'fiscal_id': string;
  'role_id': number;
  'created_at': string;
  'updated_at': string;
  'role': IRole;
}
