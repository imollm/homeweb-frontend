import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class RangePriceService {

  rangeOfPrices = [];

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) { }

  async getRangeOfPrices(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl('rangePrice', 'index');

    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }
}
