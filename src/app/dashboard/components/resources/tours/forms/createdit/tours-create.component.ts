import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ITour} from '../../../../../../models/tour';
import {ToursService} from '../../../../../../services/_tour/tours.service';
import {AlertService} from '../../../../../../services/_alert/alert.service';
import {UsersService} from '../../../../../../services/_user/users.service';
import {IUser} from '../../../../../../models/user';
import {ResponseStatus} from '../../../../../../api/response-status';
import {NgbDate, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {PropertiesService} from '../../../../../../services/_property/properties.service';
import {IProperty} from '../../../../../../models/property';
import {ActivatedRoute, Router} from '@angular/router';
import {HelpersService} from '../../../../../../services/_helpers/helpers.service';

@Component({
  selector: 'app-tours-create-form',
  templateUrl: './tours-create.component.html',
  styleUrls: ['./tours-create.component.css']
})
export class ToursCreateComponent implements OnInit {

  @ViewChild('dp') dp: NgbDatepicker;

  modeTitle = 'Crear';
  form: FormGroup;
  mode: string;
  tour: ITour;
  tourId: string;
  customers: IUser[] = [];
  employees: IUser[] = [];
  properties: IProperty[] = [];
  day: NgbDate;

  constructor(
    private fb: FormBuilder,
    private toursService: ToursService,
    private usersService: UsersService,
    private propertiesService: PropertiesService,
    private alertService: AlertService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      hash_id: new FormControl({value: null, readonly: true}),
      customer_id: new FormControl('', Validators.required),
      employee_id: new FormControl('', Validators.required),
      property_id: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.mode = this.activateRoute.snapshot.url[1].path;
    if (this.mode === 'edit') {
      this.tourId = this.activateRoute.snapshot.params.id;
      this.modeTitle = 'Actualitza';
      this.editMode();
    }
    this.getCustomersEmployeesAndProperties();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formatDateAndTime();
      if (this.mode === 'create') {
        this.toursService.createTour(this.form.value).then((response) => {
          if (response.success) {
            this.alertService.success(response.message);
          } else {
            this.alertService.warn(response.message);
          }
        }).catch((error) => {
          this.alertService.error(ResponseStatus.displayErrorMessage(error));
          console.error(error);
        });
      } else if (this.mode === 'edit') {
        this.toursService.updateTour(this.form.value).then((response) => {
          if (response.success) {
            this.alertService.success(response.message);
          } else {
            this.alertService.warn(response.message);
          }
        }).catch((error) => {
          this.alertService.error(ResponseStatus.displayErrorMessage(error));
          console.error(error);
        });
      }
      this.router.navigate(['dashboard/tours']);
    }
  }

  private getCustomersEmployeesAndProperties(): void {
    this.usersService.getCustomers().then((response) => {
      if (response.success && response.data.length > 0) {
       this.customers = response.data[0].users;
      } else {
        this.alertService.warn('There aren\'t customers, create one');
      }
    }).then(() => {
      this.usersService.getEmployees().then((response) => {
        if (response.success && response.data.length > 0) {
          this.employees = response.data[0].users;
        } else {
          this.alertService.warn('There aren\'t employees, create one');
        }
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    }).then(() => {
      this.propertiesService.getProperties().then((response) => {
        if (response.success && response.data.length > 0) {
          this.properties = response.data;
        }
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  onDateSelect(evt: NgbDate): void {
    this.day = evt;
  }

  private formatDateAndTime(): void {
    this.time.setValue(HelpersService.timeFromJsonToTime(this.time.value));
    this.date.setValue(HelpersService.dateFromJsonToDate(this.day));
  }

  private editMode(): void {
    this.toursService.getByHashId(this.tourId).then((response) => {
      if (response.success) {
        this.tour = response.data;
        const date = new Date(this.tour.date + 'T' + this.tour.time);
        this.form.setValue({
          hash_id: this.tour.hash_id,
          customer_id: this.tour.customer_id,
          employee_id: this.tour.employee_id,
          property_id: this.tour.property_id,
          date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
          },
          time: {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
          }
        });
        this.day = new NgbDate(date.getFullYear(), date.getMonth(), date.getDay());
      }
    }).catch((error) => {
      ResponseStatus.displayErrorMessage(error);
      console.error(error);
    }).finally(() => {
      this.setDayOfCalendar();
    });
  }

  private setDayOfCalendar(): void {
    let date: Date;
    if (this.mode === 'create') {
      date = new Date();
    } else {
      date = new Date(this.tour.date);
    }
    this.dp.navigateTo({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    });
  }

  get customer(): AbstractControl { return this.form.get('customer_id'); }

  get employee(): AbstractControl { return this.form.get('employee_id'); }

  get property(): AbstractControl { return this.form.get('property_id'); }

  get date(): AbstractControl { return this.form.get('date'); }

  get time(): AbstractControl { return this.form.get('time'); }
}
