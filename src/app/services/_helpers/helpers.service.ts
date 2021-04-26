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

  static dateFromJsonToDate(date: any): string {
    let dateFormatted = String(date.year) + '-';
    if (date.month < 10) {
      dateFormatted += '0' + String(date.month) + '-';
    } else {
      dateFormatted += String(date.month) + '-';
    }
    if (date.day < 10) {
      dateFormatted += '0' + String(date.day);
    } else {
      dateFormatted += String(date.day);
    }
    return dateFormatted;
  }

  static timeFromJsonToTime(time: any = {}): string {
    let timeFormatted = '';
    if (time.hour < 10) {
      timeFormatted = '0' + String(time.hour);
    } else {
      timeFormatted = String(time.hour);
    }
    timeFormatted += ':';
    if (time.minute < 10) {
      timeFormatted += '0' + String(time.minute);
    } else {
      timeFormatted += String(time.minute);
    }
    timeFormatted += ':';
    if (time.second < 10) {
      timeFormatted += '0' + String(time.second);
    } else {
      timeFormatted += String(time.second);
    }
    return timeFormatted;
  }
}
