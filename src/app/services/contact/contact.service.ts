import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointMapper} from '../../api/end-point-mapper';
import {Observable} from 'rxjs';
import {ApiResponseI} from '../../models/api-response';
import {IContact} from '../../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) { }

  sendEmail(data: IContact): Observable<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl('contact', 'send');

    const url = this.appendParamsToUrl(endpoint, data);

    return this.httpClient.get<ApiResponseI>(url);
  }

  private appendParamsToUrl(endpoint: string, data: IContact): string {
    let url = endpoint;

    Object.keys(data).map((key, index) => {
      if (index === 0) {
        url += '?' + key + '=' + data[key];
      }
      url += '&' + key + '=' + data[key];
    });
    return url;
  }
}
