import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
    private citiesService: CitiesService,
    private categoriesService: CategoriesService,
    private usersService: UsersService,
    private alertService: AlertService
  ) {
    this.form = this.fb.group({
      user_id: new FormControl(3),
      category_id: new FormControl(1, Validators.required),
      city_id: new FormControl(1, Validators.required),
      title: new FormControl('asdfasdf', Validators.required),
      reference: new FormControl('asdfasdf', Validators.required),
      image: new FormControl('image.jpg'),
      plot_meters: new FormControl(222, Validators.required),
      built_meters: new FormControl(222, Validators.required),
      rooms: new FormControl(2, Validators.required),
      baths: new FormControl(3, Validators.required),
      address: new FormControl('asdfasdfasdf', Validators.required),
      longitude: new FormControl(0),
      latitude: new FormControl(0),
      description: new FormControl('salkjdflaskhjdf', Validators.required),
      energetic_certification: new FormControl('obtingut', Validators.required),
      sold: new FormControl(0),
      active: new FormControl(true, Validators.required),
      price: new FormControl(234234, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getValues();
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.propertiesService.createProperty(this.form.value).then((response) => {
      if (response.success) {
        this.alertService.success(response.message);
      } else {
        this.alertService.error(response.message);
      }
    });
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
}
