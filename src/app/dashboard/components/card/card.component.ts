import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IDashboardCard} from '../../../models/dashboard-card';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {

  @Input() toShow: IDashboardCard = {} as IDashboardCard;
  data: IDashboardCard = {} as IDashboardCard;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes.toShow.currentValue;
  }

}
