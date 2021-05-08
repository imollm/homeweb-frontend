import { Component, OnInit } from '@angular/core';
import {ICity} from '../../../../../models/city';
import {IProperty} from '../../../../../models/property';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {ResponseStatus} from '../../../../../api/response-status';
import {CitiesService} from '../../../../../services/_city/cities.service';

@Component({
  selector: 'app-dashboard-cities-admin',
  templateUrl: './cities-admin.component.html',
  styleUrls: ['./cities-admin.component.css']
})
export class CitiesAdminComponent implements OnInit {

  title = 'Admin Dashboard';
  subTitle = 'Ciutats';

  cities: ICity[] = [];
  properties: IProperty[] = [];

  citiesTable: IDashboardTable = {} as IDashboardTable;
  citiesTableActions: IActionButtons = {
    active: true,
    resource: 'cities',
    actions: {
      view: true,
      edit: true,
      delete: true
    }
  } as IActionButtons;

  constructor(
    private citiesService: CitiesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getCities();
  }

  private getCities(): void {
    this.citiesService.getAllCities().then((response) => {
      if (response.success) {
        this.cities = response.data;
      }
    }).then(() => {
      this.citiesTable.title = 'Llistat de tots els països';
      this.citiesTable.colsName = [
        {colName: 'id', text: 'ID'},
        {colName: 'name', text: 'Nom'},
        {colName: 'countryName', text: 'País'},
        {colName: 'numProperties', text: 'Propietats'}
      ];
    }).then(() => {
      this.prepareData();
      this.citiesTable.data = this.cities;
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private prepareData(): void {
    for (const city of this.cities) {
      if (city.country) {
        city.countryName = city.country.name;
      }
      if (city.properties_count.length > 0) {
        city.numProperties = city.properties_count[0].aggregate;
      } else {
        city.numProperties = 0;
      }
    }
  }
}
