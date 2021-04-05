import { Injectable } from '@angular/core';
import {Maps} from '../../models/maps';
import {Property} from '../../models/property';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  static formatPrice(price: number): any {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    });
    return formatter.format(price);
  }

  static mapsUbication(property: Property): Maps {
    const mapData: Maps = {} as Maps;
    mapData.lat = parseFloat(property.latitude);
    mapData.lng = parseFloat(property.longitude);
    mapData.zoom = 6;
    mapData.mapType = 'ROADMAP';

    return mapData;
  }
}
