import {Component, OnInit} from '@angular/core';
import {IProperty} from '../../models/property';
import {ActivatedRoute, Router} from '@angular/router';
import {PropertiesService} from '../../services/_property/properties.service';
import {ApiResponseI} from '../../models/api-response';
import {ImageService} from '../../services/_image/image.service';
import {IMaps} from '../../models/maps';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  property: IProperty = {} as IProperty;
  propertyId: string;
  mapData: IMaps = {} as IMaps;

  constructor(
    private activatedRoute: ActivatedRoute,
    private propertiesService: PropertiesService,
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.propertyId = this.activatedRoute.snapshot.params.id;
    this.getPropertyById().then((res) => {
      if (!res.success) {
        this.router.navigate(['**']);
      } else {
        this.property = res.data;
        this.getBase64Image();
        this.setLocation();
      }
    });
  }

  private async getPropertyById(): Promise<ApiResponseI> {
    return await this.propertiesService.getPropertyById(this.propertyId);
  }

  private getBase64Image(): void {
    this.imageService.sanitizeBase64EncodedImage(this.property.image, 'properties').then((imageDecoded) => {
      this.property.imageBase64 = imageDecoded;
    });
  }

  private setLocation(): void {
    this.mapData.lat = parseFloat(this.property.latitude);
    this.mapData.lng = parseFloat(this.property.longitude);
    this.mapData.zoom = 6;
    this.mapData.mapType = 'ROADMAP';
  }

}
