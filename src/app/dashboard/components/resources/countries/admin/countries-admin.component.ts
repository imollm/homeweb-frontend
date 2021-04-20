import { Component, OnInit } from '@angular/core';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {Color, Label} from 'ng2-charts';
import {AlertService} from '../../../../../_alert/alert.service';
import {CountriesService} from '../../../../../services/_country/countries.service';
import {ICountry} from '../../../../../models/country';
import {ICity} from '../../../../../models/city';
import {IProperty} from '../../../../../models/property';
import {ResponseStatus} from '../../../../../api/response-status';
import {ChartDataSets} from 'chart.js';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';

@Component({
  selector: 'app-dashboard-countries-admin',
  templateUrl: './countries-admin.component.html',
  styleUrls: ['./countries-admin.component.css']
})
export class CountriesAdminComponent implements OnInit {

  title = 'Admin Dashboard';
  subTitle = 'Països';

  countries: ICountry[] = [];
  cities: ICity[] = [];
  properties: IProperty[] = [];

  countriesTable: IDashboardTable = {} as IDashboardTable;
  countriesTableActions: IActionButtons = {
    active: true,
    resource: 'countries',
    actions: {
      view: true,
      edit: true,
      delete: true
    }
  } as IActionButtons;

  chartData: ChartDataSets[] = [
    {data: [], label: 'Ciutats'},
    {data: [], label: 'Propietats'}
  ];
  chartLabels: Label[] = [];
  chartColors: Color[] = [{
    backgroundColor: [
      HelpersService.randomColor(),
      HelpersService.randomColor()
    ]
  }];
  chartLegend = true;

  constructor(
    private countriesService: CountriesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  private getCountries(): void {
    this.countriesService.getCountries().then((response) => {
      if (response.success) {
        this.countries = response.data;
      }
    }).then(() => {
      this.getCitiesAndPropertiesAndPrepareChart();
    }).then(() => {
      console.log(this.chartData);
      console.log(this.chartLabels);
      this.countriesTable.title = 'Llistat de tots els països';
      this.countriesTable.colsName = [
        {colName: 'id', text: 'ID'},
        {colName: 'name', text: 'Nom'},
        {colName: 'numCities', text: 'Ciutats'},
        {colName: 'numProperties', text: 'Propietats'}
      ];
      this.countriesTable.data = this.countries;
    });
  }

  private getCitiesAndPropertiesAndPrepareChart(): void {
    this.countries.map((country) => {
      this.countriesService.getCities(String(country.id)).then((response) => {
        if (response.success) {
          country.cities = response.data.cities;
          country.numCities = country.cities.length;
          this.chartData[0].data.push(country.numCities);
        }
      }).then(() => {
        this.countriesService.getProperties(String(country.id)).then((response) => {
          if (response.success) {
            country.properties = response.data.properties;
            country.numProperties = country.properties.length;
            this.chartData[1].data.push(country.numProperties);
            this.chartLabels.push(country.name);
          }
        }).catch((error) => {
          this.alertService.error(ResponseStatus.displayErrorMessage(error));
          console.error(error);
        });
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    });
  }
}
