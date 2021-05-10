import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {IPriceChange} from '../../../../../models/price-change';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {PricesService} from '../../../../../services/_price/prices.service';
import {ResponseStatus} from '../../../../../api/response-status';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';

@Component({
  selector: 'app-dashboard-prices-owner',
  templateUrl: './prices-owner.component.html',
  styleUrls: ['./prices-owner.component.css']
})
export class PricesOwnerComponent implements OnInit {

  title = 'Owner Dashboard';
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
    this.getPriceHistoryOfMyProperties();
  }

  private getPriceHistoryOfMyProperties(): void {
    this.pricesService.getPriceChangesOfPropertiesOwnedByOwner().then((response) => {
      if (response.success) {
        this.changes = response.data;
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => this.setPriceChangesTable())
      .catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setPriceChangesTable(): void {
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
        end: c.end !== null ? HelpersService.formatDate(c.end) : '-'
      });
      this.pricesTable.data = data;
    });
  }
}
