import {Component, Input, OnInit} from '@angular/core';
import {Property} from '../../../models/property';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() property: Property;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
