import {IProperty} from './property';

export interface IPriceChange {
  'property_id': string;
  'start': string;
  'amount': number;
  'end': string;
  property: IProperty;
}
