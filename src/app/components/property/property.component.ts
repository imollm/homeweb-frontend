import {Component, OnInit} from '@angular/core';
import {Property} from '../../models/property';
import {ActivatedRoute, Router} from '@angular/router';
import {PropertiesService} from '../../services/_property/properties.service';
import {ApiResponseI} from '../../models/api-response';
import {ImageService} from '../../services/_image/image.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  property: Property;
  propertyId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private propertiesService: PropertiesService,
    private imageService: ImageService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.propertyId = this.activatedRoute.snapshot.params.id;
    this.getPropertyById().then((res) => {
      if (!res.success) {
        this.router.navigate(['**']);
      } else {
        this.property = res.data;
        console.log(this.property);
        this.getBase64Image();
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

}
