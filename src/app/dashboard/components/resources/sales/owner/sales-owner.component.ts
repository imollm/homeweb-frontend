import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {PropertiesService} from '../../../../../services/_property/properties.service';
import {ResponseStatus} from '../../../../../api/response-status';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';
import {IProperty} from '../../../../../models/property';
import {Color, Label, SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-dashboard-sales-owner',
  templateUrl: './sales-owner.component.html',
  styleUrls: ['./sales-owner.component.css']
})
export class SalesOwnerComponent implements OnInit {

  title = 'Owner Dashboard';
  subTitle = 'Vendes';

  sealedProperties: IProperty[] = [];
  salesByYear: any[] = [];

  salesTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {} as IActionButtons;

  chartData: SingleDataSet[] = [];
  chartLabels: Label[] = [];
  chartColors: Color[] = [];
  chartLegend = false;

  constructor(
    private alertService: AlertService,
    private propertiesService: PropertiesService
  ) { }

  ngOnInit(): void {
    this.getSales();
  }

  private getSales(): void {
    this.propertiesService.getMyProperties().then((response) => {
      if (response.success) {
        this.sealedProperties = response.data.sealed_properties;
        this.salesByYear = response.data.sales_by_year;
      }
    }).then(() => {
      this.setSalesTable();
      this.setSalesChart();
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setSalesTable(): void {
    this.salesTable.title = 'Propietats venudes';
    this.salesTable.inverse = false;
    this.salesTable.colsName = [
      {colName: 'reference', text: 'Ref. propietat'},
      {colName: 'price', text: 'Preu inicial'},
      {colName: 'amount', text: 'Preu venda'},
      {colName: 'date', text: 'Venuda dia'}
    ];
    const sealedData = [];
    this.sealedProperties.map((property) => {
      sealedData.push({
        reference: property.reference,
        price: property.price,
        amount: HelpersService.formatPrice(property.sales[0].amount),
        date: property.sales[0].date
      });
    });
    this.salesTable.data = sealedData;
  }

  private setSalesChart(): void {
    this.salesByYear.map((year) => {
      this.chartData.push(year.amount);
      this.chartLabels.push(year.year);
    });
    this.chartColors = [
      {
        backgroundColor: 'rgb(220,27,118)',
        borderColor: 'rgb(121,5,58)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(111,118,132,0.8)'
      }
    ];
  }
}
