import {ICity} from './city';
import {IProperty} from './property';

export interface ICountry {
  id: number;
  name: string;
  code: string;
  cities?: ICity[];
  properties?: IProperty[];
  numCities?: number;
  numProperties?: number;
  latitude: number;
  longitude: number;
}
