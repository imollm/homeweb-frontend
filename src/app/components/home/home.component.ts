import { Component, OnInit } from '@angular/core';
import { Property } from '../../models/property';
import { PropertiesService } from '../../services/property/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  properties: Property[];

  constructor(private propertiesService: PropertiesService) {
    this.properties = [];
  }

  ngOnInit(): void {
    this.propertiesService.getProperties().subscribe((res) => {
      if (res.data) {
        this.properties = res.data.map(item => new Property(item));
      }
    });
  }

}
