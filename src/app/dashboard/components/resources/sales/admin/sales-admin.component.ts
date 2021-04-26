import { Component, OnInit } from '@angular/core';
import {SalesService} from '../../../../../services/_sale/sales.service';
import {ISale} from '../../../../../models/sale';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {ResponseStatus} from '../../../../../api/response-status';
import {AlertService} from '../../../../../_alert/alert.service';
import {IActionButtons} from '../../../../../models/action-buttons';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';
import {Color, Label, SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-dashboard-sales-admin',
  templateUrl: './sales-admin.component.html',
  styleUrls: ['./sales-admin.component.css']
})
export class SalesAdminComponent implements OnInit {

  title = 'Admin Dashboard';
  subTitle = 'Vendes';

  lastSales: ISale[] = [];
  lastSalesTable: IDashboardTable = {} as IDashboardTable;
  lastSalesTableActions: IActionButtons = {
    active: true,
    actions: {
      view: true,
      edit: true,
      delete: false
    }
  } as IActionButtons;
  limit: string;

  salesChartData: any;
  salesByCountriesChartLabels: Label[] = [];
  salesByCountriesChartData: SingleDataSet = [];
  salesByCountriesChartDataColors: Color[] = [{backgroundColor: [] = []}];

  salesByCitiesChartLabels: Label[] = [];
  salesByCitiesChartData: SingleDataSet = [];
  salesByCitiesChartDataColors: Color[] = [{backgroundColor: [] = []}];

  salesByCategoriesChartLabels: Label[] = [];
  salesByCategoriesChartData: SingleDataSet = [];
  salesByCategoriesChartDataColors: Color[] = [{backgroundColor: [] = []}];

  salesBySellersChartLabels: Label[] = [];
  salesBySellersChartData: SingleDataSet = [];
  salesBySellersChartDataColors: Color[] = [{backgroundColor: [] = []}];

  constructor(
    private salesService: SalesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getLastSales();
    this.getChartData();
  }

  private getLastSales(): void {
    this.salesService.getIndex(this.limit).then((response) => {
      if (response.success) {
        this.lastSales = response.data.last;
      }
    }).then(() => {
      this.prepareSalesDataTable();
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private getChartData(): void {
    this.salesService.salesBy().then((response) => {
      if (response.success) {
        this.salesChartData = response.data;
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => {
      this.salesByCategoriesChart();
      this.salesByCountriesChart();
      this.salesByCitiesChart();
      this.salesBySellersChart();
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private prepareSalesDataTable(): void {
    const data = [];

    this.lastSalesTable.title = 'Darreres vendes';
    this.lastSalesTable.inverse = false;
    this.lastSalesTable.colsName = [
      {colName: 'reference', text: 'Ref. propietat'},
      {colName: 'seller', text: 'Venedor'},
      {colName: 'buyer', text: 'Comprador'},
      {colName: 'date', text: 'Data venda'},
      {colName: 'amount', text: 'Preu venda'}
    ];
    for (const sale of this.lastSales) {
      data.push({
        reference: sale.property.reference,
        seller: sale.seller.name,
        buyer: sale.buyer.name,
        date: sale.date,
        amount: HelpersService.formatPrice(sale.amount)
      });
    }
    this.lastSalesTable.data = data;
  }

  limitSales(evt: EventTarget): void {
    this.limit = (evt as HTMLInputElement).value;
    this.ngOnInit();
  }

  private salesByCountriesChart(): void {
    if (this.salesChartData.byCountries && this.salesChartData.byCountries.length > 0) {
      const colorsOfChart = [];
      for (const element of this.salesChartData.byCountries) {
        this.salesByCountriesChartLabels.push(element.country);
        this.salesByCountriesChartData.push(element.amount);
        colorsOfChart.push(HelpersService.randomColor());
      }
      this.salesByCountriesChartDataColors[0].backgroundColor = colorsOfChart;
    }
  }

  private salesByCitiesChart(): void {
    if (this.salesChartData.byCities && this.salesChartData.byCities.length > 0) {
      const colorsOfChart = [];
      for (const element of this.salesChartData.byCities) {
        this.salesByCitiesChartLabels.push(element.city);
        this.salesByCitiesChartData.push(element.amount);
        colorsOfChart.push(HelpersService.randomColor());
      }
      this.salesByCitiesChartDataColors[0].backgroundColor = colorsOfChart;
    }
  }

  private salesByCategoriesChart(): void {
    if (this.salesChartData.byCategories && this.salesChartData.byCategories.length > 0) {
      const colorsOfChart = [];
      for (const element of this.salesChartData.byCategories) {
        this.salesByCategoriesChartLabels.push(element.category);
        this.salesByCategoriesChartData.push(element.amount);
        colorsOfChart.push(HelpersService.randomColorWithTransparency('.7'));
      }
      this.salesByCategoriesChartDataColors[0].backgroundColor = colorsOfChart;
    }
  }

  private salesBySellersChart(): void {
    if (this.salesChartData.bySellers && this.salesChartData.bySellers.length > 0) {
      const colorsOfChart = [];
      for (const element of this.salesChartData.bySellers) {
        this.salesBySellersChartLabels.push(element.employee);
        this.salesBySellersChartData.push(element.amount);
        colorsOfChart.push(HelpersService.randomColor());
      }
      this.salesBySellersChartDataColors[0].backgroundColor = colorsOfChart;
    }
  }
}
