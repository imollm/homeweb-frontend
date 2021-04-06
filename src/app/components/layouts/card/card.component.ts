import {Component, Input, OnInit} from '@angular/core';
import {IProperty} from '../../../models/property';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() property: IProperty;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
