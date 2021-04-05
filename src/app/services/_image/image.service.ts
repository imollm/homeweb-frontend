import { Injectable } from '@angular/core';
import {EndPointMapper} from '../../api/end-point-mapper';
import {HttpClient} from '@angular/common/http';
import {ApiResponseI} from '../../models/api-response';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper,
    private sanitizer: DomSanitizer
  ) { }

  sanitizeBase64EncodedImage(fileName: string, resource: string): any {
    return new Promise((resolve, reject) => {
      this.getBase64ImageEncoded(fileName, resource).then((base64ImageEncoded) => {
        const objectUrl = 'data:image/' + this.getImageExtension(fileName) + ';base64,' + base64ImageEncoded;
        resolve(this.sanitizer.bypassSecurityTrustUrl(objectUrl));
      });
    });
  }

  private async getBase64ImageEncoded(id: string, resource: string): Promise<any> {
    const base64Encoded = await this.getImage(resource, id);
    return base64Encoded.data;
  }

  private getImageExtension(fileName: string): string {
    return fileName.split('.')[1];
  }

  private async getImage(resource: string, id: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl('image', resource, id);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }
}
