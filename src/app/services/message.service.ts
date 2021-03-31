import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSource = new BehaviorSubject<any>({});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: any): void {
    this.messageSource.next(message);
  }
}
