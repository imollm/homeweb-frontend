import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';
import {IUser} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  resource = 'users';

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) { }

  getOwners(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'owners');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getCustomers(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'customers');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getEmployees(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'employees');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  updateUser(user: IUser): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'update');
    return this.httpClient.put<ApiResponseI>(endpoint, user).toPromise();
  }
}
