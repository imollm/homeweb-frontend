import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../../../../_alert/alert.service';
import {CitiesService} from '../../../../../services/_city/cities.service';
import {ICity} from '../../../../../models/city';
import {IDashboardCard} from '../../../../../models/dashboard-card';
import {ResponseStatus} from '../../../../../api/response-status';
import {ILocation, IMaps} from '../../../../../models/maps';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent implements OnInit {

  city: ICity = {
    properties: [],
    properties_count: []
  } as ICity;
  cityId: string;

  countryCard: IDashboardCard = {} as IDashboardCard;
  propertiesCard: IDashboardCard = {} as IDashboardCard;

  propertiesLocations: IMaps = {
    location: {} as ILocation,
    markers: []
  } as IMaps;

  propertiesTable: IDashboardTable = {} as IDashboardTable;
  propertiesTableActionButtons: IActionButtons = {
    active: true,
    resource: 'properties',
    actions: { view: true, edit: true, delete: false }
  } as IActionButtons;

  constructor(
    private citiesService: CitiesService,
    private activateRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.cityId = this.activateRoute.snapshot.params.id;
    this.getData();
  }

  private getData(): void {
    this.citiesService.getCityById(this.cityId).then((response) => {
      if (response.success) {
        this.city = response.data[0];
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => {
      this.setCards();
      this.setMap();
      this.setPropertiesTable();
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setCards(): void {
    this.countryCard.title = 'Ubicació';
    this.countryCard.value = this.city.country.name;

    this.propertiesCard.title = 'Num. de propietats';
    if (this.city.properties_count && this.city.properties_count.length > 0) {
      this.propertiesCard.value = this.city.properties_count[0].aggregate;
    } else {
      this.propertiesCard.value = '0';
    }
  }

  private setMap(): void {
    if (this.city.properties.length > 0) {
      this.propertiesLocations.location = {
        lat: Number(this.city.latitude),
        lng: Number(this.city.longitude)
      } as ILocation;
      this.propertiesLocations.mapType = 'ROADMAP';
      this.propertiesLocations.getLocation = true;
      this.propertiesLocations.zoom = 10;

      for (const property of this.city.properties) {
        this.propertiesLocations.markers.push({
          lat: Number(property.latitude),
          lng: Number(property.longitude)
        } as ILocation);
      }
    }
  }

  private setPropertiesTable(): void {
    if (this.city.properties.length > 0) {
      this.propertiesTable.title = 'Propietats ubicades a ' + this.city.name;
      this.propertiesTable.data = this.city.properties;
      this.propertiesTable.colsName = [
        {colName: 'id', text: 'ID'},
        {colName: 'reference', text: 'Referència'},
        {colName: 'price', text: 'Preu'},
        {colName: 'sold', text: 'Venut?'}
      ];
    }
  }
}
