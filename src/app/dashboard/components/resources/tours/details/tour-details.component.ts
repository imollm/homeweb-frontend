import { Component, OnInit } from '@angular/core';
import {ITour} from '../../../../../models/tour';
import {ToursService} from '../../../../../services/_tour/tours.service';
import {ActivatedRoute} from '@angular/router';
import {IDashboardCard} from '../../../../../models/dashboard-card';
import {ResponseStatus} from '../../../../../api/response-status';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {ILocation, IMaps} from "../../../../../models/maps";

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {

  tourId: string;
  tour: ITour = {} as ITour;
  dateCard: IDashboardCard = {} as IDashboardCard;
  timeCard: IDashboardCard = {} as IDashboardCard;
  tourDetailsTable: IDashboardTable = {} as IDashboardTable;
  customerDetailsTable: IDashboardTable = {} as IDashboardTable;
  employeeDetailsTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {} as IActionButtons;
  mapData: IMaps = {
    location: {} as ILocation,
    markers: [],
    zoom: 6,
    mapType: 'ROADMAP',
    getLocation: false
  } as IMaps;

  constructor(
    private toursService: ToursService,
    private activateRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.tourId = this.activateRoute.snapshot.params.id;
    this.getTour();
  }

  private getTour(): void {
    this.toursService.getByHashId(this.tourId).then((response) => {
      if (response.success) {
        this.tour = response.data;
      }
    }).then(() => {
      this.setCards();
      this.setTables();
      this.setMapData();
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
    });
  }

  private setCards(): void {
    this.dateCard.title = 'Data visita';
    this.timeCard.title = 'Hora visita';
    this.dateCard.value = this.tour.date;
    this.timeCard.value = this.tour.time;
  }

  private setTables(): void {
    this.setActionButtons();
    this.setTourTable();
    this.setCustomerTable();
    this.setEmployeeTable();
  }

  private setTourTable(): void {
    this.tourDetailsTable.title = 'Detalls de la visita';
    this.tourDetailsTable.inverse = true;
    this.tourDetailsTable.colsName = [
      {colName: 'hash_id', text: 'ID'},
      {colName: 'date', text: 'Data'},
      {colName: 'time', text: 'Hora'}
    ];
    this.tourDetailsTable.data = this.tour;
  }

  private setCustomerTable(): void {
    this.customerDetailsTable.title = 'Detalls client';
    this.customerDetailsTable.inverse = true;
    this.customerDetailsTable.colsName = [
      {colName: 'fiscal_id', text: 'NIF'},
      {colName: 'name', text: 'Nom'},
      {colName: 'phone', text: 'Tlf.'}
    ];
    this.customerDetailsTable.data = this.tour.customer;
  }

  private setEmployeeTable(): void {
    this.employeeDetailsTable.title = 'Detalls empleat';
    this.employeeDetailsTable.inverse = true;
    this.employeeDetailsTable.colsName = [
      {colName: 'fiscal_id', text: 'NIF'},
      {colName: 'name', text: 'Nom'},
      {colName: 'email', text: 'Email'}
    ];
    this.employeeDetailsTable.data = this.tour.employee;
  }

  private setActionButtons(): void {
    this.actionButtons.active = false;
  }

  private setMapData(): void {
    this.mapData.location.lat = Number(this.tour.property.latitude);
    this.mapData.location.lng = Number(this.tour.property.longitude);
    this.mapData.mapType = 'ROADMAP';
    this.mapData.markers.push({
      lat: Number(this.tour.property.latitude),
      lng: Number(this.tour.property.longitude)
    } as ILocation);
    this.mapData.zoom = 8;
    this.mapData.getLocation = false;
  }
}
