import { Injectable } from '@angular/core';
import moment from 'moment/moment';

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
    return moment(timestamp).locale('ca').format('LL');
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

  static getActualMonth(): number {
    const date = new Date();
    return Number(date.getMonth() + 1);
  }

  static extractMonthOfStringDate(date: string): number {
    const dateSplit = date.split('-');
    return Number(dateSplit[1]);
  }

  static capitalize(s: string): string {
    if (typeof s !== 'string') { return ''; }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
