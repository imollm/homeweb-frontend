import {Component, OnInit} from '@angular/core';
import {Property} from '../../models/property';
import {PropertiesService} from '../../services/property/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  properties: Property[];
  property: Property;

  constructor(private propertiesService: PropertiesService) {
    this.properties = [];
  }

  ngOnInit(): void {
    // this.property = new Property();
    // this.property.user_id = '';
    // this.property.category_id = 2;
    // this.property.city_id = 1;
    // this.property.title = 'Titol de la propietat';
    // this.property.reference = 'GGGGG';
    // this.property.plot_meters = 100;
    // this.property.built_meteres = 90;
    // this.property.address = 'skdjflaksdjf';
    // this.property.longitude = 100;
    // this.property.latitude = 200;
    // this.property.description = 'lsadkfjlkajsdf';
    // this.property.energetic_certificate = 'obtained';
    // this.property.sold = false;
    // this.property.active = true;
    // this.property.price = 100000;
    // console.log(this.property);
    // this.propertiesService.createProperty(this.property).subscribe(res => {
    //   console.log(res);
    // });
    this.propertiesService.getProperties().subscribe((res) => {
      if (res.data) {
        this.properties = res.data.map(item => new Property(item));
      }
    });
  }

}
