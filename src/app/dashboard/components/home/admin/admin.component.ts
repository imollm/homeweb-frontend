import { Component, OnInit } from '@angular/core';
import {IDashboardCard} from '../../../../models/dashboard-card';
import {HelpersService} from '../../../../services/_helpers/helpers.service';
import {SalesService} from '../../../../services/_sale/sales.service';
import {IDashboardTable} from '../../../../models/dashboard-table';
import {PropertiesService} from '../../../../services/_property/properties.service';
import {Color, Label, SingleDataSet} from 'ng2-charts';
import {IActionButtons} from '../../../../models/action-buttons';
import {ResponseStatus} from '../../../../api/response-status';
import {AlertService} from '../../../../services/_alert/alert.service';
import {ChartOptions} from 'chart.js';
import {IProperty} from '../../../../models/property';
import {ISale} from '../../../../models/sale';

@Component({
  selector: 'app-dashboard-home-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  title = 'Admin Dashboard';
  subTitle = 'Home';
  actualYear: number;

  totalProperties: IDashboardCard = {} as IDashboardCard;
  totalSales: IDashboardCard = {} as IDashboardCard;
  totalAmountOfSales: IDashboardCard = {} as IDashboardCard;
  totalSalesLastMonth: IDashboardCard = {} as IDashboardCard;

  dataTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: false
  } as IActionButtons;

  chartData: SingleDataSet[] = [];
  chartLabels: Label[] = [];
  chartColors: Color[] = [];
  chartLegend = false;
  chartOptions: (ChartOptions & {annotation: any}) = {
    annotation: undefined,
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 100000,
          callback: (value, index, values) => {
            value = value.toString();
            let separated = [];
            separated = value.split(/(?=(?:...)*$)/);
            return separated.join('.') + ' €';
          }
        }
      }]
    }
  };

  lastProperties: IProperty[] = [];
  sales = [];

  constructor(
    private salesService: SalesService,
    private propertiesService: PropertiesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getHome();
    this.actualYear = (new Date()).getFullYear();
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
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });

    this.propertiesService.getLastProperties().then((response) => {
      if (response.success) {
        this.dataTable.title            = 'Darreres propietats afegides';
        this.lastProperties             = response.data;
        this.dataTable.data             = this.lastProperties;
        this.dataTable.colsName         = [
          {colName: 'reference', text: 'Referència'},
          {colName: 'title', text: 'Títol'},
          {colName: 'price', text: 'Preu'},
          {colName: 'built_meters', text: 'Metres edificats'},
          {colName: 'created_at', text: 'Creat dia'}
        ];
        this.dataTable.inverse = false;
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });

    this.propertiesService.getActiveProperties().then((response) => {
      if (response.success) {
        this.totalProperties.title      = 'Propietats visibles';
        this.totalProperties.value      = response.data.length;
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });

    this.salesService.getLastYear().then((response) => {
      if (response.success) {
        this.sales = response.data;
        this.sales.map((sale) => {
          this.chartLabels.push(sale.mes);
          this.chartData.push(sale.amount);
        });
      }
    }).then(() => {
      this.setSalesChartConfig();
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setSalesChartConfig(): void {
    this.chartColors = [
      { // green
        backgroundColor: 'rgb(126,219,53)',
        borderColor: 'green',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
  }
}
