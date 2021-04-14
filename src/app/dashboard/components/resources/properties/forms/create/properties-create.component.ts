import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PropertiesService} from '../../../../../../services/_property/properties.service';
import {AlertService} from '../../../../../../_alert/alert.service';
import {ICountry} from '../../../../../../models/country';
import {CategoriesService} from '../../../../../../services/_category/categories.service';
import {CountriesService} from '../../../../../../services/_country/countries.service';
import {ICity} from '../../../../../../models/city';
import {IEnergeticCertificate} from '../../../../../../models/energetic-certificate';
import {ICategory} from '../../../../../../models/category';
import {UsersService} from '../../../../../../services/_user/users.service';
import {IUser} from '../../../../../../models/user';

@Component({
  selector: 'app-properties-create-form',
  templateUrl: './properties-create.component.html',
  styleUrls: ['./properties-create.component.css']
})
export class PropertiesCreateComponent implements OnInit {

  title = 'Crear propietat';

  form: FormGroup;
  cities: ICity[] = [];
  categories: ICategory[] = [];
  owners: IUser[] = [];
  isCountrySelected = false;
  certificates: any = IEnergeticCertificate;

  constructor(
    private fb: FormBuilder,
    private propertiesService: PropertiesService,
    private categoriesService: CategoriesService,
    private usersService: UsersService,
    private alertService: AlertService
  ) {
    this.form = this.fb.group({
      reference: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      plotMeters: new FormControl('', Validators.required),
      builtMeters: new FormControl('', Validators.required),
      rooms: new FormControl('', Validators.required),
      baths: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      energeticCertificate: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      active: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      owner: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getValues();
  }

  onSubmit(): void {
  }

  private getValues(): void {
    this.categoriesService.getAllCategories().then((response) => {
      if (response.success) {
        this.categories = response.data;
      }
    }).then(() => {
      this.usersService.getOwners().then((response) => {
        if (response.success) {
          this.owners = response.data[0].users;
        }
      });
    });
  }

  onEnergeticCertificateChecked(evt: EventTarget): void {
    const event = (evt as HTMLElement);
    console.log(event.getAttribute('ng-reflect-value'));
  }
}
