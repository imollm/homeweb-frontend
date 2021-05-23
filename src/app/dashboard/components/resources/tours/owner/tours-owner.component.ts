import { Component, OnInit } from '@angular/core';
import {ToursService} from '../../../../../services/_tour/tours.service';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {ITour} from '../../../../../models/tour';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {ResponseStatus} from '../../../../../api/response-status';

@Component({
  selector: 'app-dashboard-tours-owner',
  templateUrl: './tours-owner.component.html',
  styleUrls: ['./tours-owner.component.css']
})
export class ToursOwnerComponent implements OnInit {

  title = 'Owner Dashboard';
  subTitle = 'Visites';

  tours: ITour[] = [];
  toursTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: true,
    resource: 'tours',
    actions: {view: true, edit: false, delete: false}
  } as IActionButtons;

  limit: string;

  constructor(
    private toursService: ToursService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getToursOfMyProperties();
  }

  private getToursOfMyProperties(): void {
    this.toursService.getLastTours(this.limit).then((response) => {
      if (response.success) {
        this.tours = response.data;
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => {
      if (this.tours && this.tours.length > 0) {
        this.setToursTable();
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setToursTable(): void {
    const data = [];
    this.toursTable.title = 'Visites a les teves propietats';
    this.toursTable.inverse = false;
    this.toursTable.colsName = [
      {colName: 'reference', text: 'Ref. propietat'},
      {colName: 'employee', text: 'Empleat'},
      {colName: 'customer', text: 'Client'},
      {colName: 'date', text: 'Dia'},
      {colName: 'hour', text: 'Hora'}
    ];
    this.tours.map((tour) => {
      data.push({
        id: tour.hash_id,
        reference: tour.property.reference,
        employee: tour.employee.name,
        customer: tour.customer.name,
        date: tour.date,
        hour: tour.time
      });
    });
    this.toursTable.data = data;
  }

  limitTours(evt: EventTarget): void {
    this.limit = (evt as HTMLInputElement).value;
    this.ngOnInit();
  }
}
