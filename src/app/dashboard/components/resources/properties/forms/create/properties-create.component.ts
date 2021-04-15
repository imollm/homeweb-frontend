import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PropertiesService} from '../../../../../../services/_property/properties.service';
import {AlertService} from '../../../../../../_alert/alert.service';
import {CategoriesService} from '../../../../../../services/_category/categories.service';
import {ICity} from '../../../../../../models/city';
import {IEnergeticCertificate} from '../../../../../../models/energetic-certificate';
import {ICategory} from '../../../../../../models/category';
import {UsersService} from '../../../../../../services/_user/users.service';
import {IUser} from '../../../../../../models/user';
import {CitiesService} from '../../../../../../services/_city/cities.service';

@Component({
  selector: 'app-properties-create-form',
  templateUrl: './properties-create.component.html',
  styleUrls: ['./properties-create.component.css']
})
export class PropertiesCreateComponent implements OnInit {

  pageTitle = 'Crear propietat';

  form: FormGroup;
  isSubmitted = false;
  cities: ICity[] = [];
  categories: ICategory[] = [];
  owners: IUser[] = [];
  isCountrySelected = false;
  certificates: any = IEnergeticCertificate;

  constructor(
    private fb: FormBuilder,
    private propertiesService: PropertiesService,
    private citiesService: CitiesService,
    private categoriesService: CategoriesService,
    private usersService: UsersService,
    private alertService: AlertService
  ) {
    this.form = this.fb.group({
      user_id: new FormControl(''),
      category_id: new FormControl('', Validators.required),
      city_id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      reference: new FormControl('', Validators.required),
      image: new FormControl(''),
      plot_meters: new FormControl(0),
      built_meters: new FormControl(0),
      rooms: new FormControl(0),
      baths: new FormControl(0),
      address: new FormControl(''),
      longitude: new FormControl(0),
      latitude: new FormControl(0),
      description: new FormControl(''),
      energetic_certification: new FormControl('obtingut'),
      sold: new FormControl(0),
      active: new FormControl(true),
      price: new FormControl(0),
    });
  }

  ngOnInit(): void {
    this.getValues();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.propertiesService.createProperty(this.form.value).then((response) => {
        if (response.success) {
          this.alertService.success(response.message);
          this.resetForm();
        } else {
          this.alertService.warn(response.message);
        }
      }).catch((error) => {
        console.log(error);
        if (error.status === 500) { this.alertService.error(error.statusText); }
        this.alertService.error(error.error.errors.reference[0]);
      });
    }
  }

  private getValues(): void {
    this.categoriesService.getAllCategories().then((response) => {
      if (response.success) {
        this.categories = response.data;
      }
    }).then(() => {
      this.citiesService.getAllCities().then((response) => {
        if (response.success) {
          this.cities = response.data;
        }
      });
    }).then(() => {
      this.usersService.getOwners().then((response) => {
        if (response.success) {
          this.owners = response.data[0].users;
        }
      });
    });
  }

  private resetForm(): void {
    this.form.reset();
    this.isSubmitted = false;
    this.form.get('plot_meters').setValue(0);
    this.form.get('built_meters').setValue(0);
    this.form.get('rooms').setValue(0);
    this.form.get('baths').setValue(0);
    this.form.get('longitude').setValue(0);
    this.form.get('latitude').setValue(0);
    this.form.get('sold').setValue(0);
    this.form.get('active').setValue(true);
    this.form.get('price').setValue(0);
  }

  get categoryId(): AbstractControl { return this.form.get('category_id'); }

  get cityId(): AbstractControl { return this.form.get('city_id'); }

  get title(): AbstractControl { return this.form.get('title'); }

  get reference(): AbstractControl { return this.form.get('reference'); }
}
