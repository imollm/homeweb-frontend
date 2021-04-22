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
    {data: [], label: 'Ciutats', backgroundColor: HelpersService.randomColor()},
    {data: [], label: 'Propietats', backgroundColor: HelpersService.randomColor()}
  ];
  chartLabels: Label[] = [];
  chartColors: Color[] = [];
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
    for (const country of this.countries) {
      this.countriesService.getCitiesAndProperties(String(country.id)).then((response) => {
        if (response.success) {
          this.chartLabels.push(country.name);
          country.cities = response.data.cities;
          country.numCities = response.data.cities_count;
          this.chartData[0].data.push(response.data.cities_count);

          country.properties = response.data.properties;
          country.numProperties = response.data.properties_count;
          this.chartData[1].data.push(response.data.properties_count);
        }
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    }
  }

  // private setColorsOfChart(): void {
  //   const colors = [HelpersService.randomColor(), HelpersService.randomColor()];
  //   this.chartColors[0].backgroundColor = colors;
  //   this.chartData[0].backgroundColor[0].push(colors[0]);
  //   this.chartData[1].backgroundColor[0].push(colors[1]);
  // }
}
