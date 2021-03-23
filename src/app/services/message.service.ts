import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ISearch} from '../models/search';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSource = new BehaviorSubject<ISearch>({});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: ISearch): void {
    this.messageSource.next(message);
  }
}
