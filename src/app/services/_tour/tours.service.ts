import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ApiResponseI} from '../../models/api-response';
import {ITour} from '../../models/tour';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  resource = 'tours';

  constructor(
    private httpClient: HttpClient,
    private endPointMapper: EndPointMapper
  ) { }

  getAllTours(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'index');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getLastTours(limit: string = '3'): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'show', limit);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getByPropertyId(propertyId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'getByPropertyId', propertyId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  createTour(tour: ITour): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'create');
    return this.httpClient.post<ApiResponseI>(endpoint, tour).toPromise();
  }

  updateTour(tour: ITour): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'update');
    return this.httpClient.put<ApiResponseI>(endpoint, tour).toPromise();
  }

  deleteTour(tourId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'delete', tourId);
    return this.httpClient.delete<ApiResponseI>(endpoint).toPromise();
  }

  getByHashId(hashId: string): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'showByHashId', hashId);
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getToursByEmployee(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'toursOfEmployee');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }

  getToursByOwner(): Promise<ApiResponseI> {
    const endpoint = this.endPointMapper.getEndPointUrl(this.resource, 'toursOfOwner');
    return this.httpClient.get<ApiResponseI>(endpoint).toPromise();
  }
}
