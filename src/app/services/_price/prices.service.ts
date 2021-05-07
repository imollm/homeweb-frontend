import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';
import {IPriceChange} from '../../models/price-change';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  private readonly resource: string;

  constructor(private httpClient: HttpClient, private endPointMapper: EndPointMapper) {
    this.resource = 'prices';
  }

  createPriceChange(changePrice: IPriceChange): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'create');
    return this.httpClient.post<ApiResponseI>(endpoint, changePrice).toPromise();
  }

  getPriceChangesByPropertyId(propertyId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'show', propertyId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getAllPriceChanges(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'index');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

}
