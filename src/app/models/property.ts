import {SafeUrl} from '@angular/platform-browser';
import {ICategory} from './category';
import {ICity} from './city';
import {IFeature} from './feature';
import {IUser} from './user';
import {ISale} from './sale';

export interface IProperty {
  id: number;
  user_id: string;
  category_id: number;
  city_id: number;
  title: string;
  reference: string;
  image: string;
  plot_meters: number;
  built_meters: number;
  rooms: number;
  baths: number;
  address: string;
  longitude: string;
  latitude: string;
  description: string;
  energetic_certification: string;
  sold: boolean;
  active: boolean;
  price: number;
  created_at: string;
  updated_at: string;
  imageBase64: SafeUrl;
  city: ICity;
  category: ICategory;
  features: IFeature[];
  owner: IUser;
  sales: ISale;
}
