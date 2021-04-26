import { Injectable } from '@angular/core';

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

  static formatMeters(meters: string): string {
    return meters + ' m<sup>2</sup>';
  }

  static formatDate(timestamp: string): string {
    return new Date(timestamp).toLocaleDateString('es-ES');
  }

  static isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  static isString(value: any): boolean {
    return typeof value === 'string';
  }

  static randomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  static randomColorWithTransparency(transparency: string): string {
    const r = () => Math.random() * 256 >> 0;
    return `rgba(${r()}, ${r()}, ${r()}, ${transparency})`;
  }
}
