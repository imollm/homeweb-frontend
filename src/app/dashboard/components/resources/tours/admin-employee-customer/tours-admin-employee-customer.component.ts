import {Component, Input, OnInit} from '@angular/core';
import {ITour} from '../../../../../models/tour';
import {ToursService} from '../../../../../services/_tour/tours.service';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {ResponseStatus} from '../../../../../api/response-status';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';

@Component({
  selector: 'app-dashboard-tours-admin-employee-customer',
  templateUrl: './tours-admin-employee-customer.component.html',
  styleUrls: ['./tours-admin-employee-customer.component.css']
})
export class ToursAdminEmployeeCustomerComponent implements OnInit {

  @Input() role: string;

  title: string;
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
    this.title = HelpersService.capitalize(this.role) + ' Dashboard';
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
    if (this.role === 'admin') { this.lastToursTable.title = 'Darreres visites agefides'; }
    else if (this.role === 'employee' || this.role === 'customer') { this.lastToursTable.title = 'Les teves visites'; }

    this.lastToursTable.inverse = false;
    this.lastToursTable.colsName = [
      {colName: 'reference', text: 'Ref. propietat'},
      {colName: 'date', text: 'Dia visita'},
      {colName: 'time', text: 'Hora visita'}
    ];
    if (this.role === 'admin') {
      this.lastToursTable.colsName.push(
        {colName: 'employee', text: 'Empleat'},
        {colName: 'customer', text: 'Client'}
      );
    } else if (this.role === 'employee') {
      this.lastToursTable.colsName.push({colName: 'customer', text: 'Client'});
    } else if (this.role === 'customer') {
      this.lastToursTable.colsName.push({colName: 'employee', text: 'Empleat'});
    }
    this.lastToursTable.data = this.prepareToursDataTable();
  }

  private prepareToursDataTable(): any[] {
    const data = [];
    if (this.role === 'admin') {
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
    } else if (this.role === 'employee') {
      for (const tour of this.lastTours) {
        data.push({
          id: tour.hash_id,
          reference: tour.property.reference,
          customer: tour.customer.name,
          date: tour.date,
          time: tour.time
        });
      }
    } else if (this.role === 'customer') {
      for (const tour of this.lastTours) {
        data.push({
          id: tour.hash_id,
          reference: tour.property.reference,
          employee: tour.employee.name,
          date: tour.date,
          time: tour.time
        });
      }
    }
    return data;
  }

  limitTours(evt: EventTarget): void {
    this.limit = (evt as HTMLInputElement).value;
    this.ngOnInit();
  }

}
