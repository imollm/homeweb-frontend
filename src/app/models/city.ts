import {IProperty} from './property';
import {ICountry} from './country';

export interface ICity {
  id: number;
  name: string;
  country_id: number;
  latitude: number;
  longitude: number;
  country?: ICountry;
  properties?: IProperty[];
  countryName: string;
  numCities?: number;
  numProperties?: number;
  properties_count?: any;
}
