import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IProperty} from '../../models/property';
import {ApiResponseI} from '../../models/api-response';
import {EndPointMapper} from '../../api/end-point-mapper';

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

  async createProperty(property: IProperty): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'create');
    return this.httpClient.post<ApiResponseI>(endpoint, property).toPromise();
  }

  async updateProperty(property: IProperty): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'update', String(property.id));
    return this.httpClient.put<ApiResponseI>(endpoint, property).toPromise();
  }

  async getLastProperties(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'last');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  async getLastActiveProperties(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'lastActive');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  async getPropertyById(propertyId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'showById', propertyId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  async getActiveProperties(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'active');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  async setVisibilityOnWeb(propertyId: string, status: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'setActive', propertyId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }
}
