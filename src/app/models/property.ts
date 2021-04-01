import {SafeUrl} from '@angular/platform-browser';
import {ICategory} from './category';

export class Property {

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
  longitude: number;
  latitude: number;
  description: string;
  energetic_certificate: string;
  sold: boolean;
  active: boolean;
  price: number;
  created_at: string;
  updated_at: string;
  safeUrl: SafeUrl;
  city: ICategory;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

}
