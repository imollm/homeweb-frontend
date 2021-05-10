import { Component, OnInit } from '@angular/core';
import {SalesService} from '../../../../../services/_sale/sales.service';
import {ISale} from '../../../../../models/sale';
import {ResponseStatus} from '../../../../../api/response-status';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';

@Component({
  selector: 'app-purchases-customer',
  templateUrl: './purchases-customer.component.html',
  styleUrls: ['./purchases-customer.component.css']
})
export class PurchasesCustomerComponent implements OnInit {

  title = 'Customer Dashboard';
  subTitle = 'Compres';

  purchases: ISale[] = [];

  purchasesTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: true,
    resource: 'sales',
    actions: {view: true, edit: false, delete: false}
  } as IActionButtons;

  constructor(
    private salesService: SalesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getMyPurchases();
  }

  private getMyPurchases(): void {
    this.salesService.purchasesOfCustomer().then((response) => {
      if (response.success) {
        this.purchases = response.data;
      }
    }).then(() => this.setPurchasesTable() )
      .catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setPurchasesTable(): void {
    const data = [];
    this.purchasesTable.title = 'Les teves compres';
    this.purchasesTable.inverse = false;
    this.purchasesTable.colsName = [
      {colName: 'reference', text: 'Ref. propietat'},
      {colName: 'seller', text: 'Venedor'},
      {colName: 'date', text: 'Data'},
      {colName: 'price', text: 'Preu de compra'}
    ];
    this.purchases.map((p) => {
      data.push({
        id: p.hash_id,
        reference: p.property.reference,
        seller: p.seller.name,
        date: p.date,
        price: p.amount
      });
    });
    this.purchasesTable.data = data;
  }

}
