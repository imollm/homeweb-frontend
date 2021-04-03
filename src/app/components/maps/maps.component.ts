import {Component, Input, OnInit} from '@angular/core';
import { Maps } from '../../models/maps';
import {Property} from '../../models/property';
import {HelpersService} from '../../services/_helpers/helpers.service';

@Component({
  selector: 'app-map',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @Input() property: Property;
  mapData: Maps = {} as Maps;

  constructor() {
  }

  ngOnInit(): void {
    this.mapData = HelpersService.mapsUbication(this.property);
  }

}
