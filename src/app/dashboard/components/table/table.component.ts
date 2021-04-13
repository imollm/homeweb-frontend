import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IDashboardTable} from '../../../models/dashboard-table';
import {HelpersService} from '../../../services/_helpers/helpers.service';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() toShow: IDashboardTable = {} as IDashboardTable;
  dataTable: IDashboardTable = {} as IDashboardTable;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataTable = changes.toShow.currentValue;
  }

  formatPrice(price: any): string {
    return HelpersService.formatPrice(price);
  }

  formatMeters(meters: any): string {
    return HelpersService.formatMeters(meters);
  }

  formatDate(timestamp: string): string {
    return HelpersService.formatDate(timestamp);
  }
}
