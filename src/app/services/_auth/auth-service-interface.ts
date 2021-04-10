import {IUser} from '../../models/user';
import {Observable} from 'rxjs';
import {IJwtResponse} from '../../models/jwt-response';
import {ApiResponseI} from '../../models/api-response';

export interface IAuthService {
  login(user: IUser): Observable<IJwtResponse>;
  register(user: IUser): Observable<IJwtResponse>;
  getToken(): string;
  logout(from: string): void;
  isLogged(): boolean;
  getAuthUser(): Promise<ApiResponseI>;
}
