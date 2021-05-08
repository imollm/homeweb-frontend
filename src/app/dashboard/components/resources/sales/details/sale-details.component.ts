import { Component, OnInit } from '@angular/core';
import {ISale} from '../../../../../models/sale';
import {SalesService} from '../../../../../services/_sale/sales.service';
import {ActivatedRoute} from '@angular/router';
import {ResponseStatus} from '../../../../../api/response-status';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {IDashboardCard} from '../../../../../models/dashboard-card';
import {IUser} from '../../../../../models/user';
import {IProperty} from '../../../../../models/property';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {HelpersService} from "../../../../../services/_helpers/helpers.service";

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.css']
})
export class SaleDetailsComponent implements OnInit {

  sale: ISale = {
    property: {} as IProperty,
    seller: {} as IUser,
    buyer: {} as IUser,
  } as ISale;
  saleId: string;

  propertyCard: IDashboardCard = {} as IDashboardCard;
  dateCard: IDashboardCard = {} as IDashboardCard;
  sellerCard: IDashboardCard = {} as IDashboardCard;
  buyerCard: IDashboardCard = {} as IDashboardCard;

  propertyTable: IDashboardTable = {} as IDashboardTable;
  sellerTable: IDashboardTable = {} as IDashboardTable;
  buyerTable: IDashboardTable = {} as IDashboardTable;
  saleTable: IDashboardTable = {} as IDashboardTable;

  actionButtons: IActionButtons = {
    active: false,
    resource: 'sales',
    actions: { view: false, edit: false, delete: false }
  } as IActionButtons;

  constructor(
    private saleService: SalesService,
    private activateRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.saleId = this.activateRoute.snapshot.params.id;
    this.getSale();
  }

  private getSale(): void {
    this.saleService.getSaleByHashId(this.saleId).then((response) => {
      if (response.success) {
        this.sale = response.data;
      }
    }).then(() => {
      this.setCards();
      this.setTables();
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setCards(): void {
    this.propertyCard.title = 'Ref. propietat';
    this.propertyCard.value = this.sale.property.reference;
    this.dateCard.title = 'Data venda';
    this.dateCard.value = this.sale.date;
    this.sellerCard.title = 'Venedor';
    this.sellerCard.value = this.sale.seller.name;
    this.buyerCard.title = 'Comprador';
    this.buyerCard.value = this.sale.buyer.name;
  }

  private setTables(): void {
    this.setPropertyTable();
    this.setSellerTable();
    this.setBuyerTable();
    this.setSaleTable();
  }

  private setPropertyTable(): void {
    this.propertyTable.title = 'Detalls propietat';
    this.propertyTable.inverse = true;
    this.propertyTable.colsName = [
      {colName: 'reference', text: 'Ref.'},
      {colName: 'title', text: 'Títol'},
      {colName: 'price', text: 'Preu'}
    ];
    this.propertyTable.data = {
      reference: this.sale.property.reference,
      title: this.sale.property.title,
      price: HelpersService.formatPrice(this.sale.property.price)
    };
  }

  private setSellerTable(): void {
    this.sellerTable.title = 'Detalls venedor';
    this.sellerTable.inverse = true;
    this.sellerTable.colsName = [
      {colName: 'fiscal_id', text: 'NIF'},
      {colName: 'name', text: 'Nom'},
      {colName: 'email', text: 'Email'}
    ];
    this.sellerTable.data = {
      fiscal_id: this.sale.seller.fiscal_id,
      name: this.sale.seller.name,
      email: this.sale.seller.email
    };
  }

  private setBuyerTable(): void {
    this.buyerTable.title = 'Detalls comprador';
    this.buyerTable.inverse = true;
    this.buyerTable.colsName = [
      {colName: 'fiscal_id', text: 'NIF'},
      {colName: 'name', text: 'Nom'},
      {colName: 'email', text: 'Email'}
    ];
    this.buyerTable.data = {
      fiscal_id: this.sale.buyer.fiscal_id,
      name: this.sale.buyer.name,
      email: this.sale.buyer.email
    };
  }

  private setSaleTable(): void {
    this.saleTable.title = 'Detalls venda';
    this.saleTable.inverse = true;
    this.saleTable.colsName = [
      {colName: 'hash_id', text: 'ID'},
      {colName: 'amount', text: 'Preu'},
      {colName: 'date', text: 'Data'}
    ];
    this.saleTable.data = {
      hash_id: this.sale.hash_id,
      amount: HelpersService.formatPrice(this.sale.amount),
      date: this.sale.date
    };
  }

}
