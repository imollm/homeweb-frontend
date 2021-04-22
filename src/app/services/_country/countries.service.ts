import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';
import {ICountry} from '../../models/country';

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

  getCitiesAndProperties(countryId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'getCitiesAndProperties', countryId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  createCountry(country: ICountry): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'create');
    return this.httpClient.post<ApiResponseI>(endpoint, country).toPromise();
  }

  getCountryById(countryId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'getById', countryId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }
}
