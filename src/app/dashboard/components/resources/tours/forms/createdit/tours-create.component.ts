import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {AuthService} from '../../../../../../services/_auth/auth.service';
import {IAuthUser} from '../../../../../../models/auth-user';
import {ModalResultService} from '../../../../../../services/_modal/modal.service';

@Component({
  selector: 'app-tours-create-form',
  templateUrl: './tours-create.component.html',
  styleUrls: ['./tours-create.component.css']
})
export class ToursCreateComponent implements OnInit {

  @ViewChild('dp') dp: NgbDatepicker;
  @ViewChild('customerSelect') customerSelect: ElementRef;
  @ViewChild('employeeSelect') employeeSelect: ElementRef;

  modeTitle = 'Crear';
  form: FormGroup;
  mode: string;
  authUser: IAuthUser = {} as IAuthUser;
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
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private modalResultService: ModalResultService
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
      console.log(this.form.value);
      this.formatDateAndTime();
      if (this.mode === 'create') {
        this.toursService.createTour(this.form.value).then((response) => {
          this.router.navigate(['dashboard/tours']).then(() => {
            this.modalResultService.createResultModal(response);
          });
        }).catch((error) => {
          this.alertService.error(ResponseStatus.displayErrorMessage(error));
          console.error(error);
          this.date.setValue('');
          this.time.setValue('');
        });
      } else if (this.mode === 'edit') {
        this.toursService.updateTour(this.form.value).then((response) => {
          this.router.navigate(['dashboard/tours']).then(() => {
            this.modalResultService.editResultModal(response);
          });
        }).catch((error) => {
          this.alertService.error(ResponseStatus.displayErrorMessage(error));
          console.error(error);
          this.resetDateAndTime();
        });
      }
    }
  }

  private resetDateAndTime(): void {
    const date = new Date(this.tour.date + 'T' + this.tour.time);
    this.date.setValue({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    });
    this.time.setValue({
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    });
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
    }).then(() => this.getUserRole())
      .catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private getUserRole(): void {
    this.authService.getAuthUser().then((response) => {
      if (response.success) {
        this.authUser = response.data[0];
        if (this.authUser.role.name === 'customer') {
          this.customerMode();
        } else if (this.authUser.role.name === 'employee') {
          this.employeeMode();
        }
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private customerMode(): void {
    this.customer.setValue(this.authUser.id);
    this.customerSelect.nativeElement.style.display = 'none';
  }

  private employeeMode(): void {
    this.employee.setValue(this.authUser.id);
    this.employeeSelect.nativeElement.style.display = 'none';
  }

  onDateSelect(evt: NgbDate): void {
    this.date.setValue(evt);
  }

  private formatDateAndTime(): void {
    this.time.setValue(HelpersService.timeFromJsonToTime(this.time.value));
    this.date.setValue(HelpersService.dateFromJsonToDate(this.date.value));
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
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  get customer(): AbstractControl { return this.form.get('customer_id'); }

  get employee(): AbstractControl { return this.form.get('employee_id'); }

  get property(): AbstractControl { return this.form.get('property_id'); }

  get date(): AbstractControl { return this.form.get('date'); }

  get time(): AbstractControl { return this.form.get('time'); }
}
