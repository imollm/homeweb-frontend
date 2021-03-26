import { Injectable } from '@angular/core';
import {EndPointMapper} from '../../api/end-point-mapper';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) { }

  async getImage(resource: string, id: string): Promise<Blob> {
    const endpoint = this.endPointMapper.getEndPointUrl('image', resource, id);
    return this.httpClient.get<Blob>(endpoint).toPromise();
  }
}
