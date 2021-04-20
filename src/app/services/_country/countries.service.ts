import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  resource = 'countries';

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) { }

  getCountries(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'index');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getProperties(countryId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'getProperties', countryId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getCities(countryId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'getCities', countryId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }
}
