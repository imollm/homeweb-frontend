import {Component, Input, OnInit} from '@angular/core';
import {SalesService} from '../../../../../services/_sale/sales.service';
import {ISale} from '../../../../../models/sale';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {ResponseStatus} from '../../../../../api/response-status';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {IActionButtons} from '../../../../../models/action-buttons';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';
import {Color, Label, SingleDataSet} from 'ng2-charts';
import {ChartOptions} from 'chart.js';

@Component({
  selector: 'app-dashboard-sales-admin-employee',
  templateUrl: './sales-admin-employee.component.html',
  styleUrls: ['./sales-admin-employee.component.css']
})
export class SalesAdminEmployeeComponent implements OnInit {

  @Input() role: string;

  title: string;
  subTitle = 'Vendes';

  lastSales: ISale[] = [];
  lastSalesTable: IDashboardTable = {} as IDashboardTable;
  lastSalesTableActions: IActionButtons = {
    active: true,
    resource: 'sales',
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
  salesBySellersChartOptions: (ChartOptions & { annotation: any }) = {
  annotation: undefined,
  responsive: true,
  scales: {
    xAxes: [{}],
    yAxes: [{
        id: 'y-axis-0',
        position: 'left',
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
    },
    title: {
      display: false,
      text: ''
    }
  };

  constructor(
    private salesService: SalesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.title = this.role === 'admin' ? 'Admin' : 'Employee';
    this.title += ' Dashboard';
    this.getLastSales();
    this.getChartData();
  }

  private getLastSales(): void {
    this.salesService.getIndex(this.limit).then((response) => {
      if (response.success) {
        this.lastSales = this.role === 'admin' ? response.data.last : response.data;
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

    this.lastSalesTable.title = this.role === 'admin' ? 'Darreres vendes' : 'Les teves vendes';
    this.lastSalesTable.inverse = false;

    if (this.role === 'admin') {
      this.lastSalesTable.colsName = [
        {colName: 'reference', text: 'Ref. propietat'},
        {colName: 'seller', text: 'Venedor'},
        {colName: 'buyer', text: 'Comprador'},
        {colName: 'date', text: 'Data venda'},
        {colName: 'amount', text: 'Preu venda'}
      ];
      for (const sale of this.lastSales) {
        data.push({
          id: sale.hash_id,
          reference: sale.property.reference,
          seller: sale.seller.name,
          buyer: sale.buyer.name,
          date: sale.date,
          amount: HelpersService.formatPrice(sale.amount)
        });
      }
      this.lastSalesTable.data = data;
    } else if (this.role === 'employee') {
      this.lastSalesTable.colsName = [
        {colName: 'reference', text: 'Ref. propietat'},
        {colName: 'buyer', text: 'Comprador'},
        {colName: 'date', text: 'Data venda'},
        {colName: 'amount', text: 'Preu venda'}
      ];
      for (const sale of this.lastSales) {
        data.push({
          id: sale.hash_id,
          reference: sale.property.reference,
          buyer: sale.buyer.name,
          date: sale.date,
          amount: HelpersService.formatPrice(sale.amount)
        });
      }
      this.lastSalesTable.data = data;
    }
  }

  limitSales(evt: EventTarget): void {
    this.limit = (evt as HTMLInputElement).value;
    this.resetChartDataAndLabels().then(() => {
      this.ngOnInit();
    });
  }

  private resetChartDataAndLabels(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.salesByCategoriesChartData.splice(0, this.salesByCategoriesChartData.length);
      this.salesByCitiesChartData.splice(0, this.salesByCitiesChartData.length);
      this.salesByCountriesChartData.splice(0, this.salesByCountriesChartData.length);
      this.salesBySellersChartData.splice(0, this.salesBySellersChartData.length);
      this.salesByCategoriesChartLabels.splice(0, this.salesByCategoriesChartLabels.length);
      this.salesByCitiesChartLabels.splice(0, this.salesByCitiesChartLabels.length);
      this.salesByCountriesChartLabels.splice(0, this.salesByCountriesChartLabels.length);
      this.salesBySellersChartLabels.splice(0, this.salesBySellersChartLabels.length);
      resolve(true);
    });
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

  haveSystemSales(): boolean {
    return this.salesByCategoriesChartData.length > 0 || this.salesByCitiesChartData.length > 0 || this.salesByCountriesChartData.length > 0 || this.salesBySellersChartData.length > 0;
  }
}
