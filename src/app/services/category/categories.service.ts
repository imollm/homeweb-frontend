import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories = [];

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) { }

  async getAllCategories(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl('categories', 'index');

    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }
}
