import {Component, OnInit} from '@angular/core';
import {Property} from '../../models/property';
import {ActivatedRoute, Router} from '@angular/router';
import {PropertiesService} from '../../services/_property/properties.service';
import {ApiResponseI} from '../../models/api-response';

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
      }
    });
  }

  private async getPropertyById(): Promise<ApiResponseI> {
    return await this.propertiesService.getPropertyById(this.propertyId);
  }

}
