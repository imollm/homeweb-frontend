import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ISale} from '../../../../../../models/sale';
import {AlertService} from '../../../../../../services/_alert/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IUser} from '../../../../../../models/user';
import {IProperty} from '../../../../../../models/property';
import {UsersService} from '../../../../../../services/_user/users.service';
import {PropertiesService} from '../../../../../../services/_property/properties.service';
import {ResponseStatus} from '../../../../../../api/response-status';
import {SalesService} from '../../../../../../services/_sale/sales.service';
import {NgbDate, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {HelpersService} from '../../../../../../services/_helpers/helpers.service';
import {IAuthUser} from '../../../../../../models/auth-user';
import {AuthService} from '../../../../../../services/_auth/auth.service';

@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.css']
})
export class SalesCreateComponent implements OnInit {

  @ViewChild('dp') dp: NgbDatepicker;
  @ViewChild('sellerSelect') sellerSelect: ElementRef;

  modeTitle = 'Crear';
  form: FormGroup;
  mode: string;
  authUser: IAuthUser = {} as IAuthUser;
  sale: ISale = {
    property: {} as IProperty,
    seller: {} as IUser,
    buyer: {} as IUser
  } as ISale;
  saleId: string;
  buyers: IUser[] = [];
  sellers: IUser[] = [];
  properties: IProperty[] = [];
  sellDate: NgbDate;
  propertySelected = false;
  propertySelectedPrice: string;

  constructor(
    private fb: FormBuilder,
    private salesService: SalesService,
    private usersService: UsersService,
    private propertiesService: PropertiesService,
    private alertService: AlertService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      hash_id: new FormControl({value: null, readonly: true}),
      buyer_id: new FormControl('', Validators.required),
      seller_id: new FormControl('', Validators.required),
      property_id: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.mode = this.activateRoute.snapshot.url[1].path;
    if (this.mode === 'edit') {
      this.saleId = this.activateRoute.snapshot.params.id;
      this.editMode();
      this.modeTitle = 'Actualitza';
    }
    this.getCustomersEmployeesAndForSaleProperties();
  }

  private getCustomersEmployeesAndForSaleProperties(): void {
    this.usersService.getCustomers().then((response) => {
      if (response.success && response.data.length > 0) {
        this.buyers = response.data[0].users;
      } else {
        this.alertService.warn('There aren\'t customers, create one');
      }
    }).then(() => {
      this.usersService.getEmployees().then((response) => {
        if (response.success && response.data.length > 0) {
          this.sellers = response.data[0].users;
        } else {
          this.alertService.warn('There aren\'t employees, create one');
        }
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    }).then(() => {
      this.propertiesService.getForSaleProperties().then((response) => {
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
    }).finally(() => {
      this.setDayOfCalendar();
      this.getAuthUser();
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formatDate();
      if (this.mode === 'create') {
        this.salesService.createSale(this.form.value).then((response) => {
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
        this.salesService.updateSale(this.form.value).then((response) => {
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
      this.router.navigate(['/dashboard/sales']);
    }
  }

  onPropertySelect(evt: EventTarget): void {
    this.propertySelected = true;
    const propertyId = Number((evt as HTMLInputElement).value);
    for (const property of this.properties) {
      if (property.id === propertyId) {
        this.propertySelectedPrice = HelpersService.formatPrice(property.price);
        break;
      }
    }
  }

  onDateSelect(evt: NgbDate): void {
    this.sellDate = evt;
  }

  private formatDate(): void {
    this.date.setValue(HelpersService.dateFromJsonToDate(this.sellDate));
  }

  private getAuthUser(): void {
    this.authService.getAuthUser().then((response) => {
      if (response.success) {
        this.authUser = response.data[0];
      }
    }).then(() => {
      if (this.authUser.role.name === 'employee') {
        this.seller.setValue(this.authUser.id);
        this.sellerSelect.nativeElement.style.display = 'none';
      }
    }).catch((error) => {
      ResponseStatus.displayErrorMessage(error);
      console.error(error);
    });
  }

  private editMode(): void {
    this.salesService.getSaleByHashId(this.saleId).then((response) => {
      if (response.success) {
        this.sale = response.data;
        this.prepareSaleValuesToEditForm();
        this.setDayOfCalendar();
      }
    }).catch((error) => {
      ResponseStatus.displayErrorMessage(error);
      console.error(error);
    });
  }

  private prepareSaleValuesToEditForm(): void {
    const date = new Date(this.sale.date);
    this.form.setValue({
      hash_id: this.sale.hash_id,
      buyer_id: this.sale.buyer_id,
      seller_id: this.sale.seller_id,
      property_id: this.sale.property_id,
      amount: this.sale.amount,
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    });
    this.propertySelectedPrice = HelpersService.formatPrice(this.sale.property.price);
  }

  private setDayOfCalendar(): void {
    let date: Date;
    if (this.mode === 'create') {
      date = new Date();
    } else {
      date = new Date(this.sale.date);
    }
    this.dp.navigateTo({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    });
  }

  get buyer(): AbstractControl { return this.form.get('buyer_id'); }

  get seller(): AbstractControl { return this.form.get('seller_id'); }

  get property(): AbstractControl { return this.form.get('property_id'); }

  get date(): AbstractControl { return this.form.get('date'); }

  get amount(): AbstractControl { return this.form.get('amount'); }

}
