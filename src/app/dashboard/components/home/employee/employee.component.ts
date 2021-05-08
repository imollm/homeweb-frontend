import { Component, OnInit } from '@angular/core';
import {IDashboardCard} from '../../../../models/dashboard-card';
import {HelpersService} from '../../../../services/_helpers/helpers.service';
import {SalesService} from '../../../../services/_sale/sales.service';
import {PropertiesService} from '../../../../services/_property/properties.service';
import {IDashboardTable} from '../../../../models/dashboard-table';
import {IActionButtons} from '../../../../models/action-buttons';
import {AlertService} from '../../../../services/_alert/alert.service';
import {ResponseStatus} from '../../../../api/response-status';
import {ISale} from '../../../../models/sale';
import {ToursService} from '../../../../services/_tour/tours.service';
import {ITour} from '../../../../models/tour';

@Component({
  selector: 'app-dashboard-home-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  title = 'Employee Dashboard';
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

  toursTable: IDashboardTable = {} as IDashboardTable;

  sales: ISale[] = [];
  tours: ITour[] = [];
  totalSalesAmount = 0;
  totalSalesLastMonthAmount = 0;

  constructor(
    private salesService: SalesService,
    private propertiesService: PropertiesService,
    private alertService: AlertService,
    private tourService: ToursService
  ) { }

  ngOnInit(): void {
    this.getHome();
  }

  private getHome(): void {
    this.propertiesService.getActiveProperties().then((response) => {
      if (response.success) {
        this.totalProperties.title      = 'Propietats visibles';
        this.totalProperties.value      = response.data.length;
      } else {
        this.alertService.warn(response.message);
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });

    this.salesService.salesOfSeller().then((response) => {
      if (response.success) {
        this.sales = response.data;
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => this.getTotalSales())
      .then(() => {
      this.totalSales.title           = 'Has venut propietats';
      this.totalSales.value           = this.sales.length.toString();
      this.totalAmountOfSales.title   = 'Has venut per valor';
      this.totalAmountOfSales.value   = HelpersService.formatPrice(this.totalSalesAmount);
      this.totalSalesLastMonth.title  = 'Has venut aquest mes per valor';
      this.totalSalesLastMonth.value  = HelpersService.formatPrice(this.totalSalesLastMonthAmount);
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });

    this.propertiesService.getLastProperties().then((response) => {
      if (response.success) {
        this.dataTable.title            = 'Darreres propietats afegides';
        this.dataTable.data             = response.data;
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

    this.tourService.getToursByEmployee().then((response) => {
      if (response.success) {
        this.tours = response.data;
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => this.setToursTable())
      .catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private getTotalSales(): void {
    const month = HelpersService.getActualMonth();
    this.sales.map((sale) => {
      this.totalSalesAmount += sale.amount;
      if (HelpersService.extractMonthOfStringDate(sale.date) === month) {
        this.totalSalesLastMonthAmount += sale.amount;
      }
    });
  }

  private setToursTable(): void {
    const data = [];
    this.toursTable.title = 'Les teves visites';
    this.toursTable.inverse = false;
    this.toursTable.colsName = [
      {colName: 'reference', text: 'Ref. propietat'},
      {colName: 'day', text: 'Dia'},
      {colName: 'hour', text: 'Hora'},
      {colName: 'customer', text: 'Client'},
      {colName: 'customerPhone', text: 'Tlf. client'}
    ];
    this.tours.map((tour) => {
      data.push({
        reference: tour.property.reference,
        day: tour.date,
        hour: tour.time,
        customer: tour.customer.name,
        customerPhone: tour.customer.phone
      });
    });
    this.toursTable.data = data;
  }
}
