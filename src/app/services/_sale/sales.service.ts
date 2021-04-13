import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';

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

  async getIndex(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'index');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  async getLastYear(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'actualYear');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }
}
