import {Component, Input, OnInit} from '@angular/core';
import {PropertiesService} from '../../../../../services/_property/properties.service';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {IActionButtons} from '../../../../../models/action-buttons';
import {ResponseStatus} from '../../../../../api/response-status';
import {IProperty} from '../../../../../models/property';

@Component({
  selector: 'app-dashboard-properties-admin-employee',
  templateUrl: './properties-admin-employee.component.html',
  styleUrls: ['./properties-admin-employee.component.css']
})
export class PropertiesAdminEmployeeComponent implements OnInit {

  @Input() role: string;

  title: string;
  subTitle = 'Propietats';

  propertiesTable: IDashboardTable = {} as IDashboardTable;
  propertiesTableActions: IActionButtons = {
    actions: {}
  } as IActionButtons;

  properties: IProperty[] = [];
  limit: string;

  constructor(
    private propertiesService: PropertiesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getAllProperties();
    this.title = this.role === 'admin' ? 'Admin' : 'Employee';
    this.title += ' Dashboard';
  }

  private getAllProperties(): void {
    this.propertiesService.getProperties().then((response) => {
      if (response.success) {
        this.properties = response.data;
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => {
      this.propertiesTable.title    = 'Llistat de totes les propietats';
      this.propertiesTable.data     = this.properties;
      this.propertiesTable.colsName = [
        {colName: 'id', text: 'ID'},
        {colName: 'reference', text: 'Referència'},
        {colName: 'title', text: 'Títol'},
        {colName: 'price', text: 'Preu'},
        {colName: 'plot_meters', text: 'Mts. solar'},
        {colName: 'built_meters', text: 'Mts. const.'},
        {colName: 'rooms', text: 'Habitacions'},
        {colName: 'baths', text: 'Banys'}
      ];
      this.setActionButtonsByRole();
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setActionButtonsByRole(): void {
    this.propertiesTableActions.active = true;
    this.propertiesTableActions.resource = 'properties';
    this.propertiesTableActions.actions.view = true;
    this.propertiesTableActions.actions.edit = true;
    this.propertiesTableActions.actions.delete = this.role === 'admin';
  }
}
