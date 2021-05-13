import {IProperty} from './property';

export interface IPriceChange {
  hash_id: string;
  property_id: string;
  start: string;
  amount: number;
  end: string;
  property: IProperty;
}
