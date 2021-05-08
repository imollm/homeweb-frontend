import { Component, OnInit } from '@angular/core';
import {IPriceChange} from '../../../../../models/price-change';
import {PricesService} from '../../../../../services/_price/prices.service';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {ResponseStatus} from '../../../../../api/response-status';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';
import {IActionButtons} from '../../../../../models/action-buttons';

@Component({
  selector: 'app-dashboard-prices-admin',
  templateUrl: './prices-admin.component.html',
  styleUrls: ['./prices-admin.component.css']
})
export class PricesAdminComponent implements OnInit {

  title = 'Admin Dashboard';
  subTitle = 'Canvis de preu';
  changes: IPriceChange[] = [];
  pricesTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: false
  } as IActionButtons;

  constructor(
    private pricesService: PricesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getLastPriceChanges();
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
      {colName: 'price', text: 'Preu inicial'},
      {colName: 'start', text: 'Inici'},
      {colName: 'end', text: 'Fi'}
    ];
    this.changes.map((c) => {
      data.push({
        reference: c.property.reference,
        amount: HelpersService.formatPrice(c.amount),
        price: c.property.price,
        start: HelpersService.formatDate(c.start),
        end: c.end !== '' ? HelpersService.formatDate(c.end) : '-'
      });
      this.pricesTable.data = data;
    });
  }
}
