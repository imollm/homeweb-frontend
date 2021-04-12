import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IProperty} from '../../models/property';
import {ApiResponseI} from '../../models/api-response';
import {EndPointMapper} from '../../api/end-point-mapper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  private readonly resource: string;
  properties: IProperty[] = [] as IProperty[];

  constructor(private httpClient: HttpClient, private endPointMapper: EndPointMapper) {
    this.resource = 'properties';
  }

  async getProperties(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'index');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  createProperty(property: IProperty): Observable<IProperty> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'create');
    return this.httpClient.post<IProperty>(endpoint, property);
  }

  async getLastProperties(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'last');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  async getPropertyById(propertyId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'showById', propertyId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }
}
