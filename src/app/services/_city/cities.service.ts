import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';
import {ICity} from '../../models/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  resource = 'cities';

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) { }

  getAllCities(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'index');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  createCity(city: ICity): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'create');
    return this.httpClient.post<ApiResponseI>(endpoint, city).toPromise();
  }

  updateCity(city: ICity): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'update');
    return this.httpClient.put<ApiResponseI>(endpoint, city).toPromise();
  }

  getCityById(cityId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'getById', cityId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  deleteCity(cityId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'delete', cityId);
    return this.httpClient.delete<ApiResponseI>(endpoint).toPromise();
  }
}
