import {Component, Input, OnInit} from '@angular/core';
import { IMaps } from '../../models/maps';

@Component({
  selector: 'app-map',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @Input() mapData: IMaps;

  constructor() {
  }

  ngOnInit(): void {
  }
}
