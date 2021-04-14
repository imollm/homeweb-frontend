import {ICity} from './city';

export interface ICountry {
  id: number;
  name: number;
  cities?: ICity[];
}
