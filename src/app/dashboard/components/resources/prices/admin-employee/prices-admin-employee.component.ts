import { Component, OnInit } from '@angular/core';
import {IPriceChange} from '../../../../../models/price-change';
import {PricesService} from '../../../../../services/_price/prices.service';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {ResponseStatus} from '../../../../../api/response-status';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';
import {IActionButtons} from '../../../../../models/action-buttons';
import {AuthService} from '../../../../../services/_auth/auth.service';
import {IAuthUser} from '../../../../../models/auth-user';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-dashboard-prices-admin-employee',
  templateUrl: './prices-admin-employee.component.html',
  styleUrls: ['./prices-admin-employee.component.css']
})
export class PricesAdminEmployeeComponent implements OnInit {

  title: string;
  subTitle = 'Canvis de preu';

  authUser: IAuthUser = {} as IAuthUser;
  changes: IPriceChange[] = [];
  pricesTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: true,
    resource: 'prices',
    actions: {view: true, edit: false, delete: false}
  } as IActionButtons;

  constructor(
    private pricesService: PricesService,
    private alertService: AlertService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAuthUser();
  }

  private getAuthUser(): void {
    this.authService.getAuthUser().then((response) => {
      if (response.success) {
        this.authUser = response.data[0];
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => {
      this.title = HelpersService.capitalize(this.authUser.role.name) + ' Dashboard';
      this.getLastPriceChanges();
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private getLastPriceChanges(): void {
    this.pricesService.getAllPriceChanges().then((response) => {
      if (response.success) {
        this.changes = response.data;
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => {
      this.setPricesTable();
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setPricesTable(): void {
    const data = [];
    this.pricesTable.title = 'Darrers canvis de preu';
    this.pricesTable.inverse = false;
    this.pricesTable.colsName = [
      {colName: 'reference', text: 'Referència'},
      {colName: 'amount', text: 'Preu'},
      {colName: 'price', text: 'Preu actual'},
      {colName: 'start', text: 'Inici'},
      {colName: 'end', text: 'Fi'}
    ];
    this.changes.map((c) => {
      data.push({
        id: c.property_id,
        reference: c.property.reference,
        amount: HelpersService.formatPrice(c.amount),
        price: c.property.price,
        start: c.start,
        end: c.end !== null ? c.end : '-'
      });
      this.pricesTable.data = data;
    });
  }
}
