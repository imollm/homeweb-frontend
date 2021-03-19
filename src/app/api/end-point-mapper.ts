import {isNil} from 'ramda';
import * as apiConfig from './endpoints.json';
import {sprintf} from 'sprintf-js';
import {HttpHeaders} from '@angular/common/http';

export class EndPointMapper {

  private baseUrl: string;
  private baseHeaders: {
    accept: string;
    authorization: string;
  };
  private readonly endpoints: {};

  constructor() {
    this.baseUrl = apiConfig.baseUrl;
    this.baseHeaders = apiConfig.headers;
    this.endpoints = apiConfig.endpoints;

  }

  getEndPointUrl(resource: string = '', action: string = '', id: string = ''): string {
    if (isNil(resource) && isNil(action)) {
      throw new Error('Resource and action can not be empty');
    }
    if (this.endpoints.hasOwnProperty(resource) && this.endpoints[resource].hasOwnProperty(action)) {
      let url = this.baseUrl.concat(this.endpoints[resource][action].uri);
      if (!isNil(id)) {
        url = sprintf(url, id);
      }
      return url;
    } else {
      throw new Error('Endpoint have no resource or resource have no action');
    }
  }

  getBaseHeaders(token: string = ''): HttpHeaders {
    const headers = new HttpHeaders();

    headers.set('Accept', this.baseHeaders.accept);

    if (!isNil(token)) {
      headers.set('Authorization', this.baseHeaders.authorization);
    }
    return headers;
  }
}
