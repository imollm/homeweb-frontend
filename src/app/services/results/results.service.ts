import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ISearch} from '../../models/search';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  url: string;

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) { }

  async getShowByFilter(searchParams: ISearch): Promise<any> {
    const endpoint = this.endPointMapper.getEndPointUrl('properties', 'showByFilter');

    await this.prepareUrlWithGetParams(endpoint, searchParams);

    return this.httpClient.get<ApiResponseI>(this.url).toPromise();
  }

  private async prepareUrlWithGetParams(url: string, params: ISearch): Promise<void> {
    let urlModified = url;

    Object.keys(params).map((key, index) => {
      if (index === 0) {
        urlModified += '?' + key + '=' + params[key];
      } else {
        urlModified += '&' + key + '=' + params[key];
      }
    });
    this.url = urlModified;
  }
}
