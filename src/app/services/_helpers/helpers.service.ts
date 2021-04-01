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

  static EnergeticCertificate(status: string): string {
    switch (status) {
      case 'in process':
        return 'En procés';
      case 'obtained':
        return 'Obtingut';
      case 'pending':
        return 'Pendent';
      default:
        return 'Desconegut';
    }
  }
}
