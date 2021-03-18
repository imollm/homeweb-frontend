import {UserI} from '../models/user';
import {Observable} from 'rxjs';
import {JwtResponseI} from '../models/jwt-response';

export interface AuthServiceI {
  login(user: UserI): Observable<JwtResponseI>;
  register(user: UserI): Observable<JwtResponseI>;
  logout(): void;
}
