import { Injectable } from '@angular/core';
import {EndPointMapper} from '../../api/end-point-mapper';
import {HttpClient} from '@angular/common/http';
import {ApiResponseI} from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) { }

  async getImage(resource: string, id: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl('image', resource, id);

    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getImageExtension(fileName: string): string {
    return fileName.split('.')[1];
  }
}
