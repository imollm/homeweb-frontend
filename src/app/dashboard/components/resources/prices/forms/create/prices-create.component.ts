import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PricesService} from '../../../../../../services/_price/prices.service';
import {AlertService} from '../../../../../../services/_alert/alert.service';
import {PropertiesService} from '../../../../../../services/_property/properties.service';
import {IProperty} from '../../../../../../models/property';
import {ResponseStatus} from '../../../../../../api/response-status';
import {IPriceChange} from '../../../../../../models/price-change';
import {HelpersService} from '../../../../../../services/_helpers/helpers.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../../services/_auth/auth.service';
import {IAuthUser} from '../../../../../../models/auth-user';

@Component({
  selector: 'app-prices-create',
  templateUrl: './prices-create.component.html',
  styleUrls: ['./prices-create.component.css']
})
export class PricesCreateComponent implements OnInit, AfterViewInit {

  authUser: IAuthUser = {} as IAuthUser;
  form: FormGroup;
  properties: IProperty[] = [];
  propertyToMakePriceChange: IProperty;
  lastPriceChangesOfSelectedProperty: IPriceChange[] = [];
  @ViewChild('propertyInfo') propertyInfo: ElementRef;
  @ViewChild('newChangePrice') newChangePrice: ElementRef;
  @ViewChild('acceptChange') acceptChange: ElementRef;

  constructor(
    private fb: FormBuilder,
    private pricesService: PricesService,
    private alertService: AlertService,
    private propertiesService: PropertiesService,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      property_id: new FormControl(''),
      start: new FormControl(''),
      amount: new FormControl(0, [Validators.required, Validators.min(0)]),
      end: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getAuthUserRole();
  }

  private getAuthUserRole(): void {
    this.authService.getAuthUser().then((response) => {
      if (response.success) {
        this.authUser = response.data[0];
      }
    }).then(() => this.getProperties())
      .catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  ngAfterViewInit(): void {
    this.propertyInfo.nativeElement.style.display = 'none';
    this.newChangePrice.nativeElement.style.display = 'none';
  }

  onSubmit(): void {
    if (this.form.valid && this.acceptChange.nativeElement.checked) {
      this.pricesService.createPriceChange(this.form.value).then((response) => {
        if (response.success) {
          this.alertService.success(response.message);
        } else {
          this.alertService.warn(response.message);
        }
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
      this.router.navigate(['/dashboard/prices']);
    }
  }

  private getProperties(): void {
    if (this.authUser.role.name === 'owner') {
      this.propertiesService.getMyProperties().then((response) => {
        if (response.success) {
          this.properties = response.data.properties;
        } else {
          this.alertService.warn(response.message);
        }
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    } else {
      this.propertiesService.getProperties().then((response) => {
        if (response.success) {
          this.properties = response.data;
        } else {
          this.alertService.warn(response.message);
        }
      }).catch((error) => {
        this.alertService.error(ResponseStatus.displayErrorMessage(error));
        console.error(error);
      });
    }
  }

  onPropertySelect(evt: EventTarget): void {
    this.propertyInfo.nativeElement.style.display = 'block';
    this.newChangePrice.nativeElement.style.display = 'block';
    const propertySelectedId = ((evt as HTMLInputElement).value).charAt(0);
    this.property.patchValue(propertySelectedId);
    this.startDate.patchValue(this.today());
    this.getSelectedProperty(propertySelectedId);
    this.getLastPriceChangeOfSelectedProperty(propertySelectedId);
  }

  private getSelectedProperty(propertyId: string): void {
    this.properties.map((p) => {
      if (propertyId === String(p.id)) {
        this.propertyToMakePriceChange = p;
      }
    });
  }

  private getLastPriceChangeOfSelectedProperty(propertyId: string): void {
    this.pricesService.getPriceChangesByPropertyId(propertyId).then((response) => {
      if (response.success) {
        this.lastPriceChangesOfSelectedProperty = response.data;
      } else {
        this.alertService.warn(response.message);
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  formatPrice(price: number): string {
    return HelpersService.formatPrice(price);
  }

  today(): string {
    const today = new Date();
    const jsonDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };
    return HelpersService.dateFromJsonToDate(jsonDate);
  }

  get property(): AbstractControl { return this.form.get('property_id'); }

  get startDate(): AbstractControl { return this.form.get('start'); }

  get amount(): AbstractControl { return this.form.get('amount'); }
}
