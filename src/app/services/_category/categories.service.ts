import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';
import {end} from "@popperjs/core";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories = [];
  resource = 'categories';

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) { }

  async getAllCategories(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'index');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  async getPropertiesByCategory(category: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'properties', category);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }
}
