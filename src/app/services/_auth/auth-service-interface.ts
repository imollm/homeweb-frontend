import {IUser} from '../../models/user';
import {Observable} from 'rxjs';
import {IJwtResponse} from '../../models/jwt-response';

export interface IAuthService {
  login(user: IUser): Observable<IJwtResponse>;
  register(user: IUser): Observable<IJwtResponse>;
  getToken(): string;
  logout(): void;
  isLogged(): boolean;
}
