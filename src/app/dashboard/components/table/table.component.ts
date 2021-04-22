import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IDashboardTable} from '../../../models/dashboard-table';
import {HelpersService} from '../../../services/_helpers/helpers.service';
import {faTimes, faEye, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {IActionButtons} from '../../../models/action-buttons';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() toShow: IDashboardTable = {} as IDashboardTable;
  @Input() actionButtons: IActionButtons;
  dataTable: IDashboardTable = {} as IDashboardTable;

  faView = faEye;
  faEdit = faPencilAlt;
  faDelete = faTimes;

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

  _isNumber(value: any): boolean {
    return HelpersService.isNumber(value);
  }

  _isString(value: any): boolean {
    return HelpersService.isString(value);
  }
}
