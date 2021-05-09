import { Component, OnInit } from '@angular/core';
import {IProperty} from '../../../../../models/property';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {PropertiesService} from '../../../../../services/_property/properties.service';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {ResponseStatus} from '../../../../../api/response-status';

@Component({
  selector: 'app-dashboard-properties-customer',
  templateUrl: './properties-customer.component.html',
  styleUrls: ['./properties-customer.component.css']
})
export class PropertiesCustomerComponent implements OnInit {

  title = 'Customer Dashboard';
  subTitle = 'Propietats';

  properties: IProperty[] = [];
  propertiesTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: true,
    resource: 'properties',
    actions: {view: true, edit: false, delete: false}
  } as IActionButtons;

  limit = '3';

  constructor(
    private propertiesService: PropertiesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getProperties();
  }

  limitProperties(evt: EventTarget): void {
    this.limit = (evt as HTMLInputElement).value;
    this.ngOnInit();
  }

  private getProperties(): void {
    this.propertiesService.getPropertiesWithLimit(this.limit).then((response) => {
      if (response.success) {
        this.properties = response.data;
      }
    }).then(() => {
      if (this.properties.length > 0) {
        this.setPropertiesTable();
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setPropertiesTable(): void {
    this.propertiesTable.title = 'Darreres propietats afegides';
    this.propertiesTable.inverse = false;
    this.propertiesTable.colsName = [
      {colName: 'id', text: 'ID'},
      {colName: 'reference', text: 'Referència'},
      {colName: 'title', text: 'Títol'},
      {colName: 'price', text: 'Preu'},
      {colName: 'plot_meters', text: 'Mts. solar'},
      {colName: 'built_meters', text: 'Mts. const.'},
      {colName: 'rooms', text: 'Habitacions'},
      {colName: 'baths', text: 'Banys'}
    ];
    this.propertiesTable.data = this.properties;
  }
}
