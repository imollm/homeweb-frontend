import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../../models/user';
import {IJwtResponse} from '../../models/jwt-response';
import {tap} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import {IAuthService} from './auth-service-interface';
import {Router} from '@angular/router';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';

@Injectable()
export class AuthService implements IAuthService {

  private registerEndPoint: string;
  private loginEndPoint: string;
  private logoutEndPoint: string;
  private userEndPoint: string;
  private resource = 'auth';
  private token: string | null | undefined;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private endPointMapper: EndPointMapper
  ) {
    this.registerEndPoint = this.endPointMapper.getEndPointUrl(this.resource, 'register');
    this.loginEndPoint = this.endPointMapper.getEndPointUrl(this.resource, 'login');
    this.logoutEndPoint = this.endPointMapper.getEndPointUrl(this.resource, 'logout');
    this.userEndPoint = this.endPointMapper.getEndPointUrl(this.resource, 'user');
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

  logout(from: string): void {
      this.httpClient.get<IJwtResponse>(this.logoutEndPoint).subscribe((res) => {
        if (res.success) {
          this.removeToken().then((removed) => {
            if (removed) {
              from === 'dashboard'
                ? this.router.navigate(['../home'])
                : window.location.reload();
            }
          });
        }
      });
  }

  private removeToken(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.token = '';
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('EXPIRES_IN');
      resolve(true);
    });
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

  async getAuthUser(): Promise<any> {
    return this.httpClient.get<ApiResponseI>(this.userEndPoint).toPromise();
  }
}
