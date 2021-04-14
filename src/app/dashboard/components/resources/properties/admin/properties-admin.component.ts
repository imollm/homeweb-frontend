import { Component, OnInit } from '@angular/core';
import {PropertiesService} from '../../../../../services/_property/properties.service';
import {IDashboardTable} from '../../../../../models/dashboard-table';

@Component({
  selector: 'app-dashboard-properties-admin',
  templateUrl: './properties-admin.component.html',
  styleUrls: ['./properties-admin.component.css']
})
export class PropertiesAdminComponent implements OnInit {

  title = 'Admin Dashboard';
  subTitle = 'Propietats';

  propertiesTable: IDashboardTable = {} as IDashboardTable;
  propertiesTableActions = true;

  constructor(
    private propertiesService: PropertiesService
  ) { }

  ngOnInit(): void {
    this.getAllProperties();
  }

  private getAllProperties(): void {
    this.propertiesService.getProperties().then((response) => {
      if (response.success) {
        this.propertiesTable.title    = 'Llistat de totes les propietats';
        this.propertiesTable.data     = response.data;
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
      }
    });
  }
}
