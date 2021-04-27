import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EndPointMapper} from "../../api/end-point-mapper";
import {ApiResponseI} from "../../models/api-response";
import {IFeature} from '../../models/feature';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  private readonly resource = 'features';

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) { }

  getFeatures(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'index');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  createFeature(feature: IFeature): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'create');
    return this.httpClient.post<ApiResponseI>(endpoint, feature).toPromise();
  }

  updateFeature(feature: IFeature): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'update');
    return this.httpClient.put<ApiResponseI>(endpoint, feature).toPromise();
  }

  deleteFeature(featureId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'delete', featureId);
    return this.httpClient.delete<ApiResponseI>(endpoint).toPromise();
  }

  getFeatureById(featureId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'getById', featureId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }
}
