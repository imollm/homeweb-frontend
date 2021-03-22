import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Property} from '../../models/property';
import {ApiResponseI} from '../../models/api-response';
import {EndPointMapper} from '../../api/end-point-mapper';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  private readonly resource: string;
  private endpointMapper: EndPointMapper;

  constructor(private httpClient: HttpClient) {
    this.endpointMapper = new EndPointMapper();
    this.resource = 'properties';
  }

  getProperties(): Observable<ApiResponseI> {
    return this.httpClient
      .get<ApiResponseI>(this.endpointMapper.getEndPointUrl(this.resource, 'all'), {headers: this.endpointMapper.getBaseHeaders('')});
  }

}
