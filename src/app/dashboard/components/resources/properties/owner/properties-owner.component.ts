import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../../../../../services/_property/properties.service';
import {ResponseStatus} from '../../../../../api/response-status';
import {IProperty} from '../../../../../models/property';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';

@Component({
  selector: 'app-dashboard-properties-owner',
  templateUrl: './properties-owner.component.html',
  styleUrls: ['./properties-owner.component.css']
})
export class PropertiesOwnerComponent implements OnInit {

  title = 'Owner Dashboard';
  subTitle = 'Propietats';

  propertiesRegistered: IProperty[] = [];
  visibleProperties: IProperty[] = [];
  sealedProperties: IProperty[] = [];
  totalSealedAmount: number;

  propertiesRegisteredTable: IDashboardTable = {} as IDashboardTable;
  visiblePropertiesTable: IDashboardTable = {} as IDashboardTable;
  sealedPropertiesTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: true,
    resource: 'properties',
    actions: {view: true, edit: true, delete: false}
  } as IActionButtons;

  constructor(
    private propertiesService: PropertiesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getMyProperties();
  }

  private getMyProperties(): void {
    this.propertiesService.getMyProperties().then((response) => {
      if (response.success) {
        this.propertiesRegistered = response.data.properties;
        this.visibleProperties = response.data.visible_properties;
        this.sealedProperties = response.data.sealed_properties;
        this.totalSealedAmount = response.data.total_sealed_amount;
      }
    }).then(() => {
      this.setTablesInfo();
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setTablesInfo(): void {
    this.propertiesRegisteredTable.title = 'Propietats registrades';
    this.visiblePropertiesTable.title = 'Propietats visibles';
    this.sealedPropertiesTable.title = 'Propietats venudes';

    this.propertiesRegisteredTable.inverse = false;
    this.visiblePropertiesTable.inverse = false;
    this.sealedPropertiesTable.inverse = false;

    this.propertiesRegisteredTable.colsName = [
      {colName: 'reference', text: 'Ref. propietat'},
      {colName: 'baths', text: 'Banys'},
      {colName: 'rooms', text: 'Habitacions'},
      {colName: 'plot_meters', text: 'Mts parcel·la'},
      {colName: 'built_meters', text: 'Mts. construïts'},
      {colName: 'created_at', text: 'Registrada dia'}
    ];
    this.visiblePropertiesTable.colsName = [
      {colName: 'reference', text: 'Ref. propietat'},
      {colName: 'baths', text: 'Banys'},
      {colName: 'rooms', text: 'Habitacions'},
      {colName: 'plot_meters', text: 'Mts parcel·la'},
      {colName: 'built_meters', text: 'Mts. construïts'},
      {colName: 'created_at', text: 'Registrada dia'}
    ];
    this.sealedPropertiesTable.colsName = [
      {colName: 'reference', text: 'Ref. propietat'},
      {colName: 'price', text: 'Preu inicial'},
      {colName: 'amount', text: 'Preu venda'},
      {colName: 'date', text: 'Venuda dia'}
    ];

    this.propertiesRegisteredTable.data = this.propertiesRegistered;
    this.visiblePropertiesTable.data = this.visibleProperties;

    const sealedData = [];
    this.sealedProperties.map((property) => {
      sealedData.push({
        reference: property.reference,
        price: property.price,
        amount: HelpersService.formatPrice(property.sales[0].amount),
        date: property.sales[0].date
      });
    });
    this.sealedPropertiesTable.data = sealedData;
  }

}
