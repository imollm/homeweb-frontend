import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ILocation, IMaps} from '../../models/maps';

@Component({
  selector: 'app-map',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @Input() mapData: IMaps;
  @Output() markerLocation = new EventEmitter<ILocation>();

  constructor() {
  }

  ngOnInit(): void {
  }

  getLocation(evt: google.maps.MouseEvent): void {
    const location = {
      lat: evt.latLng.lat(),
      lng: evt.latLng.lng()
    } as ILocation;
    this.markerLocation.emit(location);
  }
}
