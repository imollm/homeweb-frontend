import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import {AuthServiceI} from './auth-service-interface';
import { environment } from '../app.environment';

@Injectable()
export class AuthService implements AuthServiceI {
  AUTH_SERVER: string;
  authSubject = new BehaviorSubject(false);
  private token: string | null | undefined;

  constructor(private httpClient: HttpClient) {
    this.AUTH_SERVER = environment.apiHost;
  }

  register(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/auth/register`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken);
          }
        }
    ));
  }

  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/auth/login`,
      user).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
          // guardar token
          this.saveToken(res.dataUser.accessToken);
        }
      }
    ));
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
  }

  private saveToken(token: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    // localStorage.setItem('EXPIRES_IN', expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token as string;
  }
}
