import { Component, OnInit } from '@angular/core';
import {ICountry} from '../../../../../models/country';
import {CountriesService} from '../../../../../services/_country/countries.service';
import {ActivatedRoute} from '@angular/router';
import {ResponseStatus} from '../../../../../api/response-status';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {IDashboardCard} from '../../../../../models/dashboard-card';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {ApiResponseI} from '../../../../../models/api-response';
import {IProperty} from '../../../../../models/property';
import {ICity} from '../../../../../models/city';
import {ILocation, IMaps} from '../../../../../models/maps';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  country: ICountry;
  countryId: string;
  properties: IProperty[] = [];
  cities: ICity[] = [];

  propertiesCard: IDashboardCard = {} as IDashboardCard;
  citiesCard: IDashboardCard = {} as IDashboardCard;

  propertiesTable: IDashboardTable = {} as IDashboardTable;
  citiesTable: IDashboardTable = {} as IDashboardTable;
  propertiesActionButtons: IActionButtons = {
    active: true,
    resource: 'properties',
    actions: { view: true, edit: false, delete: false }
  } as IActionButtons;
  citiesActionButtons: IActionButtons = {
    active: true,
    resource: 'cities',
    actions: { view: true, edit: false, delete: false }
  } as IActionButtons;

  propertiesLocations: IMaps = {
    location: {} as ILocation,
    markers: []
  } as IMaps;

  constructor(
    private countriesService: CountriesService,
    private activateRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.countryId = this.activateRoute.snapshot.params.id;
    this.getData();
  }

  getData(): void {
    this.countriesService.getCountryById(this.countryId).then((response) => {
      if (response.success) {
        this.country = response.data;
      }
    }).then(() => {
      this.countriesService.getCitiesAndProperties(this.countryId).then((response) => {
        if (response.success) {
          this.properties = response.data.properties;
          this.cities = response.data.cities;
          this.setPropertiesTable(response.data.properties_count);
          this.setCitiesTable(response.data.cities_count);
        } else {
          this.alertService.warn(response.message);
        }
      }).then(() => {
        this.setLocationsOfMap();
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setPropertiesTable(count: string): void {
    this.propertiesCard.title = 'Num. de propietats';
    this.propertiesCard.value = count;

    this.propertiesTable.title = 'Propietats ubicades a ' + this.country.name;
    this.propertiesTable.data = this.properties;
    this.propertiesTable.colsName = [
      {colName: 'id', text: 'ID'},
      {colName: 'reference', text: 'Referència'},
      {colName: 'price', text: 'Preu'},
      {colName: 'sold', text: 'Venut?'}
    ];
  }

  private setCitiesTable(count: string): void {
    this.citiesCard.title = 'Num. de ciutats';
    this.citiesCard.value = count;

    this.citiesTable.title = 'Ciutats del país ' + this.country.name;
    this.citiesTable.data = this.cities;
    this.citiesTable.colsName = [
      {colName: 'id', text: 'ID'},
      {colName: 'name', text: 'Nom'}
    ];
  }

  private setLocationsOfMap(): void {
    this.propertiesLocations.location.lat = Number(this.country.latitude);
    this.propertiesLocations.location.lng = Number(this.country.longitude);
    this.propertiesLocations.zoom = 6;
    this.propertiesLocations.mapType = 'ROADMAP';

    this.properties.map((property) => {
      this.propertiesLocations.markers.push({
        lat: Number(property.latitude),
        lng: Number(property.longitude)
      } as ILocation);
    });
  }
}
