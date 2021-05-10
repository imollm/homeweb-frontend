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

  getProperties(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'index');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  createProperty(property: IProperty): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'create');
    return this.httpClient.post<ApiResponseI>(endpoint, property).toPromise();
  }

  updateProperty(property: IProperty): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'update', String(property.id));
    return this.httpClient.put<ApiResponseI>(endpoint, property).toPromise();
  }

  getLastProperties(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'last');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getLastActiveProperties(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'lastActive');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getPropertyById(propertyId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'showById', propertyId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getActiveProperties(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'active');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  setVisibilityOnWeb(propertyId: string, status: string): Promise<ApiResponseI> {
    let endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'setActive', propertyId);
    endpoint += '/' + status;
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  deleteProperty(propertyId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'delete', propertyId);
    return this.httpClient.delete<ApiResponseI>(endpoint).toPromise();
  }

  getForSaleProperties(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'forSale');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getPropertiesWithLimit(limit: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'byLimit', limit);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getMyProperties(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'ownedByOwner');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }
}
