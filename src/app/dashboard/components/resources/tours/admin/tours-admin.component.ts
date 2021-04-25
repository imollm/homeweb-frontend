import { Component, OnInit } from '@angular/core';
import {ITour} from '../../../../../models/tour';
import {ToursService} from '../../../../../services/_tour/tours.service';
import {AlertService} from '../../../../../_alert/alert.service';
import {ResponseStatus} from '../../../../../api/response-status';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';

@Component({
  selector: 'app-dashboard-tours-admin',
  templateUrl: './tours-admin.component.html',
  styleUrls: ['./tours-admin.component.css']
})
export class ToursAdminComponent implements OnInit {

  title = 'Admin Dashboard';
  subTitle = 'Visites';

  lastTours: ITour[] = [];
  lastToursTable: IDashboardTable = {} as IDashboardTable;
  lastToursTableActions: IActionButtons = {
    active: true,
    resource: 'tours',
    actions: {
      view: true,
      edit: true,
      delete: true
    }
  } as IActionButtons;

  limit: string;

  constructor(
    private toursService: ToursService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getLastTours();
  }

  private getLastTours(): void {
    this.toursService.getLastTours(this.limit).then((response) => {
      if (response.success) {
        this.lastTours = response.data;
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => {
      if (this.lastTours.length > 0) {
        this.prepareToursTable();
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private prepareToursTable(): void {
    this.lastToursTable.title = 'Darreres visites afegides';
    this.lastToursTable.inverse = false;
    this.lastToursTable.colsName = [
      {colName: 'reference', text: 'Ref. propietat'},
      {colName: 'employee', text: 'Empleat'},
      {colName: 'customer', text: 'Client'},
      {colName: 'date', text: 'Dia visita'},
      {colName: 'time', text: 'Hora visita'}
    ];
    this.lastToursTable.data = this.prepareToursDataTable();
  }

  private prepareToursDataTable(): any[] {
    const data = [];
    for (const tour of this.lastTours) {
      data.push({
        id: tour.hash_id,
        reference: tour.property.reference,
        employee: tour.employee.name,
        customer: tour.customer.name,
        date: tour.date,
        time: tour.time
      });
    }
    return data;
  }

  limitTours(evt: EventTarget): void {
    this.limit = (evt as HTMLInputElement).value;
    this.ngOnInit();
  }

}
