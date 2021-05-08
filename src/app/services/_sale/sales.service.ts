import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';
import {ISale} from '../../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private readonly resource: string;

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) {
    this.resource = 'sales';
  }

  getIndex(limit: string = '5'): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'index', limit);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getLastYear(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'actualYear');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  createSale(sale: ISale): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'create');
    return this.httpClient.post<ApiResponseI>(endpoint, sale).toPromise();
  }

  updateSale(sale: ISale): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'update');
    return this.httpClient.put<ApiResponseI>(endpoint, sale).toPromise();
  }

  getSaleByHashId(saleHashId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'showByHashId', saleHashId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  salesBy(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'salesBy');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  salesOfSeller(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'salesOfSeller');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }
}
