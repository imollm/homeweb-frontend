import { Component, OnInit } from '@angular/core';
import {IDashboardCard} from '../../../../models/dashboard-card';
import {HelpersService} from '../../../../services/_helpers/helpers.service';
import {SalesService} from '../../../../services/_sale/sales.service';
import {IDashboardTable} from '../../../../models/dashboard-table';
import {PropertiesService} from '../../../../services/_property/properties.service';

@Component({
  selector: 'app-dashboard-home-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  totalProperties: IDashboardCard = {} as IDashboardCard;
  totalSales: IDashboardCard = {} as IDashboardCard;
  totalAmountOfSales: IDashboardCard = {} as IDashboardCard;
  totalSalesLastMonth: IDashboardCard = {} as IDashboardCard;

  dataTable: IDashboardTable = {} as IDashboardTable;

  constructor(
    private salesService: SalesService,
    private propertiesService: PropertiesService
  ) { }

  ngOnInit(): void {
    this.getHome();
  }

  private getHome(): void {
    this.salesService.getIndex().then((response) => {
      if (response.success) {
        this.totalSales.title           = 'Total propietats venudes';
        this.totalSales.value           = response.data.sales;
        this.totalAmountOfSales.title   = 'Total vendes';
        this.totalAmountOfSales.value   = HelpersService.formatPrice(response.data.amount);
        this.totalSalesLastMonth.title  = 'Total vendes darrer mes';
        this.totalSalesLastMonth.value  = HelpersService.formatPrice(response.data.month);
      }
    });
    this.propertiesService.getLastProperties().then((response) => {
      if (response.success) {
        this.dataTable.title            = 'Darreres propietats afegides';
        this.dataTable.data             = response.data;
        this.dataTable.colsName         = [
          {colName: 'reference', text: 'Referència'},
          {colName: 'title', text: 'Títol'},
          {colName: 'price', text: 'Preu'},
          {colName: 'built_meters', text: 'Metres edificats'}
        ];
      }
    });
    this.propertiesService.getProperties().then((response) => {
      if (response.success) {
        this.totalProperties.title      = 'Propietats visibles';
        this.totalProperties.value      = response.data.length;
      }
    });
  }
}
