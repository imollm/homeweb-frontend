import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';

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

  async getPropertiesByCategoryId(categoryId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'propertiesByCategoryId', categoryId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  async getCategoryById(categoryId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'getById', categoryId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  async createCategory(category: FormData): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'create');
    return this.httpClient.post<ApiResponseI>(endpoint, category).toPromise();
  }

  async updateCategory(category: FormData): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'update');
    return this.httpClient.post<ApiResponseI>(endpoint, category).toPromise();
  }
}
