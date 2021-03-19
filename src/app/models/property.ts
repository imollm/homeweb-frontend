import { EnergeticCertificate } from './energeticCertificate';

export class Property {

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  id: number;
  user_id: number;
  category_id: number;
  city_id: number;
  title: string;
  reference: string;
  plot_meters: number;
  built_meteres: number;
  address: string;
  longitude: string;
  latitude: string;
  description: string;
  energetic_certificate: EnergeticCertificate;
  sold: boolean;
  active: boolean;
  price: number;
  created_at: string;
  updated_at: string;

}
