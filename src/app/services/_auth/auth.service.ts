import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../../models/user';
import {IJwtResponse} from '../../models/jwt-response';
import {tap} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import {IAuthService} from './auth-service-interface';
import {Router} from '@angular/router';
import {EndPointMapper} from '../../api/end-point-mapper';

@Injectable()
export class AuthService implements IAuthService {

  registerEndPoint: string;
  loginEndPoint: string;
  logoutEndPoint: string;
  resource = 'auth';
  authSubject = new BehaviorSubject(false);
  private token: string | null | undefined;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private endPointMapper: EndPointMapper
  ) {
    this.registerEndPoint = this.endPointMapper.getEndPointUrl(this.resource, 'register');
    this.loginEndPoint = this.endPointMapper.getEndPointUrl(this.resource, 'login');
    this.logoutEndPoint = this.endPointMapper.getEndPointUrl(this.resource, 'logout');
  }

  register(user: IUser): Observable<IJwtResponse> {
    return this.httpClient.post<IJwtResponse>(this.registerEndPoint,
      user).pipe(tap(
      (res: IJwtResponse) => {
        if (res.success) {
          // guardar token
          this.saveToken(res.dataUser.accessToken);
          this.router.navigate(['login']);
        }
      }
    ));
  }

  login(user: IUser): Observable<IJwtResponse> {
    return this.httpClient.post<IJwtResponse>(this.loginEndPoint,
      user).pipe(tap(
      (res: IJwtResponse) => {
        if (res.success) {
          // guardar token
          this.saveToken(res.dataUser.accessToken);
          this.router.navigate(['dashboard']);
        }
      }
    ));
  }

  logout(): Observable<IJwtResponse> {
    return this.httpClient.get<IJwtResponse>(this.logoutEndPoint)
      .pipe(tap(
        (res: IJwtResponse) => {
          if (res.success) {
            this.token = '';
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('EXPIRES_IN');
            this.router.navigate(['home']);
          }
        }
      ));
  }

  private saveToken(token: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    // localStorage.setItem('EXPIRES_IN', expiresIn);
    this.token = token;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token as string;
  }

  isLogged(): boolean {
    return this.getToken() !== null;
  }
}
